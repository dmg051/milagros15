// lib/format.ts
// Utilidades para formateo de datos

export function normalizePhone(phone: string): string {
  // Remover todos los caracteres excepto dígitos y +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Si no empieza con +, agregarlo
  if (!cleaned.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return cleaned;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date: string | Date): string {
  // Parsear fecha como ISO pero forzar zona horaria local
  let dateObj: Date;
  if (typeof date === 'string') {
    // Extraer año, mes, día, hora y minuto de la string ISO
    const match = date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (match) {
      const [, year, month, day, hour, minute] = match;
      // Crear fecha local (sin ajuste de zona horaria)
      dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  return `${formatDate(dateObj)} a las ${formatTime(dateObj)}`;
}

export function getTimeUntilEvent(eventDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date().getTime();
  const event = new Date(eventDate).getTime();
  const difference = event - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: difference };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}


