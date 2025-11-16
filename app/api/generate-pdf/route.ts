// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const pdfUrl = `${siteUrl}/invitation/pdf`;

    // Iniciar Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Navegar a la página del PDF
    await page.goto(pdfUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Esperar a que las fuentes se carguen
    await page.evaluateHandle(() => document.fonts.ready);

    // Generar PDF en formato A4
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
      preferCSSPageSize: true,
    });

    await browser.close();

    // Retornar el PDF - convertir buffer a formato compatible
    const pdfBuffer = Buffer.from(pdf);
    return new Response(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invitacion-15-anos-milagros.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Error al generar el PDF' 
      },
      { status: 500 }
    );
  }
}

