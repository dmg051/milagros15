// app/api/invitation/[recordId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findGuestByRecordId, updateGuest, Guest } from '@/lib/airtable';

export async function GET(
  request: NextRequest,
  { params }: { params: { recordId: string } }
) {
  try {
    const { recordId } = params;

    if (!recordId) {
      return NextResponse.json(
        { error: 'Record ID requerido' },
        { status: 400 }
      );
    }

    // Buscar invitado por recordId
    const guest = await findGuestByRecordId(recordId);

    if (!guest) {
      return NextResponse.json(
        { error: 'Invitación no encontrada' },
        { status: 404 }
      );
    }

    // Retornar datos del invitado (sin información sensible)
    return NextResponse.json({
      ok: true,
      guest: {
        id: guest.id,
        name: guest.fields.Name,
        tipo: guest.fields['Tipo de invitado'],
        cantidad: guest.fields.Cantidad,
        rsvpStatus: guest.fields['RSVP'],
        checkin: guest.fields['Check-in'],
      },
    });

  } catch (error) {
    console.error('Invitation API Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { recordId: string } }
) {
  try {
    const { recordId } = params;
    const body = await request.json();

    console.log('POST request received:', { recordId, body });

    if (!recordId) {
      return NextResponse.json(
        { error: 'Record ID requerido' },
        { status: 400 }
      );
    }

    // Buscar invitado por recordId
    const guest = await findGuestByRecordId(recordId);

    if (!guest) {
      console.log('Guest not found:', recordId);
      return NextResponse.json(
        { error: 'Invitación no encontrada' },
        { status: 404 }
      );
    }

    console.log('Guest found:', guest);

    // Actualizar datos del invitado (usando valores que existen en Airtable)
    const updateData: Partial<Guest> = {
      Name: body.name,
      'Tipo de invitado': body.tipo,
      Cantidad: body.cantidad,
      'RSVP': 'Yes',
    };

    console.log('Update data:', updateData);

    const updatedGuest = await updateGuest(recordId, updateData);

    console.log('Guest updated successfully:', updatedGuest);

    return NextResponse.json({
      ok: true,
      guest: {
        id: updatedGuest.id,
        name: updatedGuest.fields.Name,
        tipo: updatedGuest.fields['Tipo de invitado'],
        cantidad: updatedGuest.fields.Cantidad,
        rsvpStatus: updatedGuest.fields['RSVP'],
      },
    });

  } catch (error) {
    console.error('Invitation Update API Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
