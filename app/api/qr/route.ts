// app/api/qr/route.ts
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'Código requerido' },
        { status: 400 }
      );
    }

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    const qrUrl = `${siteUrl}/checkin?code=${encodeURIComponent(code)}`;

    // Generar QR como PNG
    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      type: 'png',
      width: 300,
      margin: 2,
      color: {
        dark: '#8BAA79', // Color sage
        light: '#FFFFFF',
      },
    });

    return new NextResponse(qrBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="qr-${code}.png"`,
        'Cache-Control': 'public, max-age=31536000', // Cache por 1 año
      },
    });

  } catch (error) {
    console.error('QR API Error:', error);
    return NextResponse.json(
      { error: 'Error generando código QR' },
      { status: 500 }
    );
  }
}

