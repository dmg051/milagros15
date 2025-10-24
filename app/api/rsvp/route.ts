// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findGuestByInviteCode, createGuest, updateGuest, generateInviteCode, Guest } from '@/lib/airtable';
import { normalizePhone } from '@/lib/format';

// Rate limiting simple en memoria
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

const rsvpSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  phone: z.string().min(1, 'El teléfono es requerido'),
  tipo: z.enum(['Cena', 'Después de cena'], {
    errorMap: () => ({ message: 'Debe seleccionar Cena o Después de cena' })
  }),
  cantidad: z.number().min(1, 'La cantidad debe ser al menos 1').max(6, 'La cantidad no puede ser mayor a 6'),
  comentarios: z.string().optional(),
  inviteCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Verificar rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Demasiadas solicitudes. Intenta más tarde.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = rsvpSchema.parse(body);

    const guestData: Guest = {
      Name: validatedData.name,
      'Phone number': normalizePhone(validatedData.phone),
      'Tipo de invitado': validatedData.tipo,
      Cantidad: validatedData.cantidad,
      'RSVP Status': 'Confirmado',
      'RSVP Timestamp': new Date().toISOString(),
    };

    let recordId: string;
    let inviteCode: string;

    if (validatedData.inviteCode) {
      // Buscar invitado existente por código
      const existingGuest = await findGuestByInviteCode(validatedData.inviteCode);
      
      if (existingGuest) {
        // Actualizar invitado existente
        const updatedGuest = await updateGuest(existingGuest.id, guestData);
        recordId = updatedGuest.id;
        inviteCode = existingGuest.fields['Invite Code'] || generateInviteCode();
      } else {
        // Crear nuevo invitado con código existente
        const newGuest = await createGuest({
          ...guestData,
          'Invite Code': validatedData.inviteCode,
        });
        recordId = newGuest.id;
        inviteCode = validatedData.inviteCode;
      }
    } else {
      // Crear nuevo invitado
      const newGuest = await createGuest(guestData);
      recordId = newGuest.id;
      inviteCode = newGuest.fields['Invite Code'] || generateInviteCode();
    }

    return NextResponse.json({
      ok: true,
      recordId,
      inviteCode,
    });

  } catch (error) {
    console.error('RSVP API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

