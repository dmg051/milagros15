'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src?: string;
  className?: string;
}

export default function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.log('AudioPlayer: No audio element found');
      return;
    }

    console.log('AudioPlayer: Setting up audio element');
    console.log('AudioPlayer: Audio src:', src);

    // Establecer volumen al 20% por defecto
    audio.volume = 0.2;

    const handleEnded = () => {
      console.log('AudioPlayer: Audio ended');
      setIsPlaying(false);
    };
    const handleLoadStart = () => {
      console.log('AudioPlayer: Loading started');
      setIsLoading(true);
    };
    const handleCanPlay = () => {
      console.log('AudioPlayer: Can play');
      setIsLoading(false);
    };
    const handleError = (e: Event) => {
      console.error('AudioPlayer: Audio error:', e);
      console.error('AudioPlayer: Error details:', {
        error: audio.error,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handleLoadedData = () => {
      console.log('AudioPlayer: Data loaded successfully');
      setIsLoading(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !src) {
      console.log('AudioPlayer: No audio element or src');
      return;
    }

    console.log('AudioPlayer: Toggling play, current state:', isPlaying);
    console.log('AudioPlayer: Audio src:', src);
    console.log('AudioPlayer: Audio readyState:', audio.readyState);
    console.log('AudioPlayer: Audio networkState:', audio.networkState);

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        console.log('AudioPlayer: Paused');
      } else {
        // Asegurar que el volumen esté configurado
        audio.volume = 0.2;
        
        // Verificar si el audio está listo para reproducir
        if (audio.readyState < 2) {
          console.log('AudioPlayer: Audio not ready, attempting to load...');
          audio.load();
          
          // Esperar un poco para que se cargue
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        
        // Verificar nuevamente el estado después de cargar
        console.log('AudioPlayer: After load - readyState:', audio.readyState);
        console.log('AudioPlayer: After load - networkState:', audio.networkState);
        
        if (audio.error) {
          console.error('AudioPlayer: Audio has error:', audio.error);
          throw new Error(`Audio error: ${audio.error.message}`);
        }
        
        await audio.play();
        setIsPlaying(true);
        console.log('AudioPlayer: Playing successfully');
      }
    } catch (error) {
      console.error('AudioPlayer: Error playing audio:', error);
      console.error('AudioPlayer: Error details:', {
        name: (error as Error).name,
        message: (error as Error).message,
        code: (error as any).code
      });
      setIsPlaying(false);
      setIsLoading(false);
      
      // Mostrar un mensaje de error al usuario
      alert('No se pudo reproducir el audio. Verifica que el archivo esté disponible.');
    }
  };

  const testAudioFile = async () => {
    if (!src) {
      console.log('AudioPlayer: No src provided for testing');
      return false;
    }
    
    console.log('AudioPlayer: Testing audio file accessibility...');
    try {
      const response = await fetch(src);
      console.log('AudioPlayer: Fetch response:', response.status, response.statusText);
      if (response.ok) {
        console.log('AudioPlayer: Audio file is accessible');
        return true;
      } else {
        console.error('AudioPlayer: Audio file not accessible:', response.status);
        return false;
      }
    } catch (error) {
      console.error('AudioPlayer: Error testing audio file:', error);
      return false;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className="flex flex-col gap-2">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-bordo border-t-transparent" />
          ) : (
            <svg
              className={`h-5 w-5 text-bordo transition-all duration-200 ${
                isPlaying ? 'scale-110' : 'group-hover:scale-110'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                // Icono de pausa
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              ) : (
                // Icono de play
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          )}
        </button>
        
        {/* Botón de prueba temporal */}
        <button
          onClick={testAudioFile}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Test
        </button>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" loop />
    </div>
  );
}

