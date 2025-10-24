'use client';

import { useState } from 'react';

interface CalendarButtonProps {
  title?: string;
  start?: string;
  duration?: number;
  location?: string;
  description?: string;
  className?: string;
}

export default function CalendarButton({
  title,
  start,
  duration = 240,
  location,
  description,
  className = '',
}: CalendarButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (title) params.append('title', title);
      if (start) params.append('start', start);
      if (duration) params.append('duration', duration.toString());
      if (location) params.append('location', location);
      if (description) params.append('description', description);

      const response = await fetch(`/api/ics?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Error generando archivo de calendario');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'evento.ics';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading calendar:', error);
      alert('Error al descargar el archivo de calendario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-white transition-all duration-200 hover:bg-sage/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage/50 disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      )}
      <span className="font-medium">
        {isLoading ? 'Generando...' : 'Agendar'}
      </span>
    </button>
  );
}

