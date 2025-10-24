'use client';

interface MapButtonProps {
  mapUrl?: string;
  className?: string;
}

export default function MapButton({ mapUrl, className = '' }: MapButtonProps) {
  const handleMapClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!mapUrl) {
    return null;
  }

  return (
    <button
      onClick={handleMapClick}
      className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sage transition-all duration-200 hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage/50 ${className}`}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span className="font-medium">Ver mapa</span>
    </button>
  );
}

