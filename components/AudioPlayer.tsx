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

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
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
        
        // Intentar cargar el audio si no está cargado
        if (audio.readyState < 2) {
          console.log('AudioPlayer: Loading audio...');
          audio.load();
        }
        
        await audio.play();
        setIsPlaying(true);
        console.log('AudioPlayer: Playing successfully');
      }
    } catch (error) {
      console.error('AudioPlayer: Error playing audio:', error);
      console.error('AudioPlayer: Error details:', {
        name: error.name,
        message: error.message,
        code: error.code
      });
      setIsPlaying(false);
    }
  };

  if (!src) {
    console.log('AudioPlayer: No src provided, not rendering');
    return null;
  }

  console.log('AudioPlayer: Rendering with src:', src);

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

