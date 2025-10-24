import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateFieldSchema = z.object({
  recordId: z.string(),
  field: z.enum(['Favorite song', 'Wish']),
  value: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recordId, field, value } = updateFieldSchema.parse(body);

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_GUESTS}/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            [field]: value,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return NextResponse.json(
        { ok: false, error: 'Error actualizando en Airtable' },
        { status: 500 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ ok: true, data: result });

  } catch (error) {
    console.error('Error updating field:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
