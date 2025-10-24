// app/api/checkin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkInGuest } from '@/lib/airtable';

const checkinSchema = z.object({
  inviteCode: z.string().min(1, 'El código de invitación es requerido'),
  pin: z.string().min(1, 'El PIN es requerido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = checkinSchema.parse(body);

    // Verificar PIN
    const correctPin = process.env.CHECKIN_PIN;
    if (!correctPin) {
      return NextResponse.json(
        { ok: false, error: 'PIN no configurado' },
        { status: 500 }
      );
    }

    if (validatedData.pin !== correctPin) {
      return NextResponse.json(
        { ok: false, error: 'PIN incorrecto' },
        { status: 401 }
      );
    }

    // Procesar check-in
    const result = await checkInGuest(validatedData.inviteCode);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: result.error === 'Código de invitación no encontrado' ? 404 : 400 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Check-in API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

