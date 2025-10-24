'use client';

import { useState } from 'react';

interface SongSuggestionProps {
  className?: string;
  recordId?: string;
}

export default function SongSuggestion({ className = '', recordId }: SongSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [songName, setSongName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (songName.trim() && recordId) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/update-field', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recordId,
            field: 'Favorite song',
            value: songName.trim(),
          }),
        });

        const result = await response.json();
        
        if (result.ok) {
          console.log('Canción sugerida guardada:', songName);
          setIsSubmitted(true);
          setTimeout(() => {
            setIsOpen(false);
            setSongName('');
            setIsSubmitted(false);
          }, 2000);
        } else {
          console.error('Error guardando sugerencia:', result.error);
          alert('Error guardando la sugerencia. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión. Inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isOpen) {
    return (
      <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${className}`}>
        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-serif text-bordo mb-4 text-center">
            Sugerir Canción
          </h3>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-lg mb-2">¡Gracias!</div>
              <p className="text-bordo script-text">
                Tu sugerencia ha sido enviada
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-bordo mb-2 script-text">
                  Nombre de la canción:
                </label>
                <input
                  type="text"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  placeholder="Ej: Perfect - Ed Sheeran"
                  className="w-full px-4 py-2 border border-bordo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-bordo/50 script-text"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-bordo text-bordo rounded-lg hover:bg-bordo/10 transition-colors script-text"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-bordo text-white rounded-lg hover:bg-dark-bordo transition-colors script-text disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="inline-block rounded-full bg-bordo px-6 py-3 text-white font-medium transition-all duration-200 hover:bg-dark-bordo hover:scale-105 script-text"
    >
      Sugerir canción
    </button>
  );
}
