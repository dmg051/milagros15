'use client';

import { useState } from 'react';

export default function PDFGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-pdf');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar el PDF');
      }

      // Crear blob y descargar
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invitacion-15-anos-milagros.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error generating PDF:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen invitation-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="invitation-card rounded-3xl p-8 text-center">
          <h1 className="text-3xl script-text text-bordo mb-6 font-bold">
            Generar PDF de Invitación
          </h1>
          
          <p className="text-bordo mb-6 script-text">
            Genera una versión PDF de la invitación en formato A4 
            para imprimir como recuerdo físico. Cada sección está en una página separada.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleGeneratePDF}
            disabled={loading}
            className="w-full rounded-full bg-bordo px-6 py-3 text-white font-medium transition-all duration-200 hover:bg-dark-bordo hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generando PDF...' : '📄 Descargar PDF'}
          </button>

          <p className="text-sm text-gray-600 mt-4">
            El PDF incluirá todos los detalles del evento en formato imprimible.
          </p>
        </div>
      </div>
    </div>
  );
}

