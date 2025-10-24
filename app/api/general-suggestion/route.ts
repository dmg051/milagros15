import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const generalSuggestionSchema = z.object({
  type: z.enum(['song', 'wish']),
  value: z.string().min(1),
  guestName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, value, guestName } = generalSuggestionSchema.parse(body);

    // Crear un registro temporal en Airtable para sugerencias generales
    const fields: any = {
      Name: guestName || 'Invitado General',
      'Tipo de invitación': 'General',
      'Cantidad de personas': 1,
      RSVP: 'No Answer',
    };

    if (type === 'song') {
      fields['Favorite song'] = value;
    } else {
      fields['Wish'] = value;
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_GUESTS}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return NextResponse.json(
        { ok: false, error: 'Error guardando en Airtable' },
        { status: 500 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ ok: true, data: result });

  } catch (error) {
    console.error('Error saving general suggestion:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
