// app/api/ics/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || process.env.EVENT_TITLE || 'Evento';
    const start = searchParams.get('start') || process.env.EVENT_DATE;
    const duration = parseInt(searchParams.get('duration') || '240'); // 4 horas por defecto
    const location = searchParams.get('location') || process.env.EVENT_ADDRESS || '';
    const description = searchParams.get('description') || process.env.SITE_URL || '';

    if (!start) {
      return NextResponse.json(
        { error: 'Fecha de inicio requerida' },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    // Formatear fechas para ICS (YYYYMMDDTHHMMSSZ)
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);
    const nowFormatted = formatDate(new Date());

    // Generar contenido ICS
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Cumpleaños 15//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${nowFormatted}@cumpleanos15.com`,
      `DTSTAMP:${nowFormatted}`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="evento.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('ICS API Error:', error);
    return NextResponse.json(
      { error: 'Error generando archivo de calendario' },
      { status: 500 }
    );
  }
}


