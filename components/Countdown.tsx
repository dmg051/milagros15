'use client';

import { useState, useEffect } from 'react';
import { getTimeUntilEvent } from '@/lib/format';

interface CountdownProps {
  eventDate: string;
  className?: string;
}

export default function Countdown({ eventDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilEvent(eventDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilEvent(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (timeLeft.total <= 0) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl font-serif text-bordo">
          ¡El evento ha comenzado!
        </div>
      </div>
    );
  }

  const timeUnits = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEG', value: timeLeft.seconds },
  ];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm"
          >
            <div className="text-3xl font-bold text-bordo md:text-4xl">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

