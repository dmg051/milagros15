// lib/airtable.ts
// Librería para interactuar con Airtable API

export interface Guest {
  id?: string;
  Name: string;
  'Phone number'?: string;
  Cantidad?: number;
  'Tipo de invitado'?: 'Cena' | 'Después de cena';
  'RSVP'?: 'Yes' | 'No' | 'No Answer';
  'RSVP Timestamp'?: string;
  'Invite Code'?: string;
  QR?: string;
  'Check-in'?: boolean;
  'Checkin Timestamp'?: string;
}

export interface AirtableRecord {
  id: string;
  fields: Guest;
  createdTime?: string;
}

export interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_GUESTS = process.env.AIRTABLE_TABLE_GUESTS || 'Guests';
const AIRTABLE_PAT = process.env.AIRTABLE_PAT;

if (!AIRTABLE_BASE_ID || !AIRTABLE_PAT) {
  throw new Error('Missing required Airtable environment variables');
}

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_GUESTS}`;

export async function airtableFetch(path: string, init: RequestInit = {}) {
  const url = `${AIRTABLE_API_URL}${path}`;
  
  const response = await fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${AIRTABLE_PAT}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    throw new Error(error.error?.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function findGuestByInviteCode(inviteCode: string): Promise<AirtableRecord | null> {
  try {
    const response: AirtableResponse = await airtableFetch(
      `?filterByFormula={Invite Code}='${inviteCode}'`
    );
    
    return response.records[0] || null;
  } catch (error) {
    console.error('Error finding guest by invite code:', error);
    return null;
  }
}

export async function findGuestByRecordId(recordId: string): Promise<AirtableRecord | null> {
  try {
    const response: AirtableResponse = await airtableFetch(
      `?filterByFormula=RECORD_ID()='${recordId}'`
    );
    
    return response.records[0] || null;
  } catch (error) {
    console.error('Error finding guest by record ID:', error);
    return null;
  }
}

export async function createGuest(fields: Guest): Promise<AirtableRecord> {
  const response = await airtableFetch('', {
    method: 'POST',
    body: JSON.stringify({
      fields: {
        ...fields,
        'RSVP': 'Yes',
        'RSVP Timestamp': new Date().toISOString(),
        'Invite Code': fields['Invite Code'] || generateInviteCode(),
      },
    }),
  });

  return response.records[0];
}

export async function updateGuest(id: string, fields: Partial<Guest>): Promise<AirtableRecord> {
  try {
    console.log('Updating guest:', id, fields);
    const response = await airtableFetch(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fields,
      }),
    });

    console.log('Update response:', response);
    return response;
  } catch (error) {
    console.error('Error updating guest:', error);
    throw error;
  }
}

export function generateInviteCode(): string {
  const prefix = 'QS-';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return prefix + result;
}

export function generateInvitationUrl(recordId: string): string {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  return `${siteUrl}/invitation/${recordId}`;
}

export async function checkInGuest(inviteCode: string): Promise<{ success: boolean; error?: string }> {
  try {
    const guest = await findGuestByInviteCode(inviteCode);
    
    if (!guest) {
      return { success: false, error: 'Código de invitación no encontrado' };
    }

    if (guest.fields['Check-in']) {
      return { success: false, error: 'Ya registrado' };
    }

    await updateGuest(guest.id, {
      'Check-in': true,
      'Checkin Timestamp': new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error checking in guest:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

