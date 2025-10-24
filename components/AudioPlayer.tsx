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
    if (!audio) return;

    // Establecer volumen al 20% por defecto
    audio.volume = 0.2;

    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  if (!src) {
    return null;
  }

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
      <audio ref={audioRef} src={src} preload="none" loop />
    </div>
  );
}

