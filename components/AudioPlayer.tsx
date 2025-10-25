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
  const hasUserInteractedRef = useRef(false);

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

    // Función para manejar la primera interacción del usuario
    const handleFirstUserInteraction = async () => {
      console.log('AudioPlayer: User interaction detected, hasUserInteracted:', hasUserInteractedRef.current);
      console.log('AudioPlayer: Audio readyState:', audio.readyState);
      
      if (!hasUserInteractedRef.current) {
        console.log('AudioPlayer: First interaction - marking as interacted');
        hasUserInteractedRef.current = true;
        
        // Intentar reproducir inmediatamente
        try {
          console.log('AudioPlayer: Attempting to play audio...');
          await audio.play();
          setIsPlaying(true);
          console.log('AudioPlayer: ✅ Playback started successfully!');
        } catch (error) {
          console.log('AudioPlayer: ❌ Failed to start playback:', error);
          // Si falla, intentar cargar primero
          try {
            console.log('AudioPlayer: Trying to load audio first...');
            audio.load();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await audio.play();
            setIsPlaying(true);
            console.log('AudioPlayer: ✅ Playback started after load!');
          } catch (secondError) {
            console.log('AudioPlayer: ❌ Still failed after load:', secondError);
          }
        }
      }
    };

    // Agregar event listeners para detectar cualquier interacción del usuario
    const events = ['click', 'touchstart', 'keydown', 'mousedown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstUserInteraction, { once: true, passive: true });
    });

    console.log('AudioPlayer: Event listeners added for:', events);

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

    // Autoplay cuando el audio esté listo
    const handleCanPlayThrough = () => {
      console.log('AudioPlayer: Can play through - starting autoplay');
      audio.play().then(() => {
        setIsPlaying(true);
        console.log('AudioPlayer: Autoplay started successfully');
      }).catch((error) => {
        console.log('AudioPlayer: Autoplay failed (user interaction required):', error);
      });
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      
      // Remover event listeners de interacción del usuario
      events.forEach(event => {
        document.removeEventListener(event, handleFirstUserInteraction);
      });
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !src) {
      console.log('AudioPlayer: No audio element or src');
      return;
    }

    // Si es la primera interacción, marcar como interactuado
    if (!hasUserInteractedRef.current) {
      hasUserInteractedRef.current = true;
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


  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
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
      <audio ref={audioRef} src={src} preload="metadata" loop />
    </div>
  );
}

