'use client';

import { useState, useEffect } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import Countdown from '@/components/Countdown';
import CalendarButton from '@/components/CalendarButton';
import MapButton from '@/components/MapButton';
import RsvpForm from '@/components/RsvpForm';
import WhatsappConfirm from '@/components/WhatsappConfirm';
import SongSuggestion from '@/components/SongSuggestion';
import WishBox from '@/components/WishBox';
import GeneralSongSuggestion from '@/components/GeneralSongSuggestion';
import GeneralWishBox from '@/components/GeneralWishBox';
import Image from 'next/image';
import { formatDateTime } from '@/lib/format';

export default function HomePage() {
  const [pases, setPases] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    tipo: 'Cena',
    cantidad: 1,
  });

  useEffect(() => {
    // Obtener pases de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const pasesParam = urlParams.get('pases');
    if (pasesParam) {
      setPases(parseInt(pasesParam) || 1);
    }
  }, []);

  const handleRsvpSuccess = (data: { recordId: string; inviteCode: string }) => {
    setFormData({
      name: '',
      tipo: 'Cena',
      cantidad: 1,
    });
  };

  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || '2025-11-14T22:00:00-03:00';
  const eventTitle = process.env.NEXT_PUBLIC_EVENT_TITLE || 'Mis 15 Años - Milagros';
  const eventAddress = process.env.NEXT_PUBLIC_EVENT_ADDRESS || 'Recepción y Eventos FVC, Av. Universitaria 5380 (3er Piso), Urb. San Eulogio, Lima 7, Comas';
  const eventMapUrl = process.env.NEXT_PUBLIC_EVENT_MAP_URL || 'https://maps.google.com/?q=Av.+Universitaria+5380,+Lima';
  const musicUrl = process.env.NEXT_PUBLIC_MUSIC_MP3_URL || '/audio/Ed-Sheeran-Perfect.mp3';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+5492645240006';

  console.log('Main page - musicUrl:', musicUrl);

  return (
    <div className="min-h-screen invitation-bg">
      {/* Reproductor de música flotante */}
      <AudioPlayer src={musicUrl} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card rounded-3xl p-12 mb-8 doodle-border">
            <h1 className="script-title mb-6">
              Mis 15 Años
            </h1>
            
            <div className="doodle-line mb-8">
              <h2 className="script-subtitle">
                Milagros
              </h2>
            </div>
            
            <div className="text-lg md:text-xl text-bordo max-w-2xl mx-auto leading-relaxed">
              <p className="mb-4 script-text text-xl">
                Con inmensa alegría y emoción, quiero invitarte a ser parte de uno de los momentos más especiales de mi vida.
              </p>
              <p className="mb-4 script-text text-xl">
                Después de 15 años llenos de aprendizajes, risas, sueños y crecimiento, es hora de celebrar esta nueva etapa que comienza.
              </p>
              <p className="script-text text-xl">
                Tu presencia haría que este día sea aún más memorable y lleno de amor.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Event Details Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card rounded-3xl p-8 mb-8">
            <h3 className="text-3xl script-text text-bordo mb-8 text-center font-bold">
              Detalles del Evento
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-xl script-text text-bordo mb-4 font-bold">Fecha y Hora</h4>
                <p className="text-lg text-bordo mb-4">
                  {formatDateTime(eventDate)}
                </p>
                <CalendarButton
                  title={eventTitle}
                  start={eventDate}
                  location={eventAddress}
                />
              </div>
              
              <div className="text-center">
                <h4 className="text-xl script-text text-bordo mb-4 font-bold">Ubicación</h4>
                <p className="text-bordo mb-4">
                  {eventAddress}
                </p>
                <MapButton mapUrl={eventMapUrl} />
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center mb-8">
            <h3 className="text-2xl script-text text-bordo mb-6 font-bold">
              Cuenta Regresiva
            </h3>
            <Countdown eventDate={eventDate} />
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card rounded-3xl p-8 text-center">
            <h3 className="text-2xl script-text text-bordo mb-6 font-bold">
              Código de Vestimenta
            </h3>
            <div className="text-lg text-bordo mb-4">
              <p className="font-medium">Sport Elegante</p>
              <p className="text-sm text-bordo mt-2">
                Se reservan los colores dorado y bordó para la quinceañera
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regalos Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card rounded-3xl p-8 text-center">
            <h3 className="text-2xl script-text text-bordo mb-6 font-bold">
              Regalos
            </h3>
            <p className="text-bordo mb-6">
              Tu presencia es el mejor regalo que puedo recibir. Si deseas obsequiar algo, 
              será recibido con mucho amor y gratitud.
            </p>
            
            {/* Transferencia Bancaria */}
            <div className="bg-gradient-to-r from-gold/20 to-red/20 rounded-xl p-6 border-2 border-gold/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-bordo mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                </svg>
                <h4 className="text-lg font-serif text-bordo">Transferencia Bancaria</h4>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gold/50 text-center">
                <p className="text-sm text-bordo mb-2">Alias:</p>
                <p className="text-sm md:text-lg font-mono font-bold text-bordo bg-gray-50 px-1 md:px-4 py-2 rounded border break-all overflow-hidden">
                  milagros.91218mb
                </p>
                <button 
                  onClick={() => navigator.clipboard.writeText('milagros.91218mb')}
                  className="mt-3 text-sm text-red hover:text-bordo underline"
                >
                  Copiar alias
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="invitation-card rounded-3xl p-6 text-center">
              <h4 className="text-xl script-text text-bordo mb-4 font-bold">
                Buzón de Deseos
              </h4>
              <p className="text-bordo mb-4 script-text">
                Deja tu mensaje especial
              </p>
              <GeneralWishBox />
            </div>
            
            <div className="invitation-card rounded-3xl p-6 text-center">
              <h4 className="text-xl script-text text-bordo mb-4 font-bold">
                Sugerir Canciones
              </h4>
              <p className="text-bordo mb-4 script-text">
                Ayúdanos con la playlist
              </p>
              <GeneralSongSuggestion />
            </div>
          </div>
        </div>
      </section>

      {/* Pases Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card rounded-3xl p-8 text-center">
            <h3 className="text-2xl script-text text-bordo mb-6 font-bold">
              Tus Pases
            </h3>
            <p className="text-lg text-bordo">
              Hemos reservado <span className="font-bold text-bordo">{pases}</span> lugar{pases > 1 ? 'es' : ''} en tu honor
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <RsvpForm onSuccess={handleRsvpSuccess} />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">O confirma por WhatsApp:</p>
            <WhatsappConfirm
              name={formData.name}
              tipo={formData.tipo}
              cantidad={formData.cantidad}
              phone={whatsappPhone}
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card rounded-3xl p-8">
            <h3 className="text-3xl script-text text-bordo mb-6 font-bold">
              ¡Gracias!
            </h3>
            <p className="text-lg text-bordo mb-6">
              Tu presencia hará que este día sea aún más especial. 
              Esperamos celebrar contigo esta nueva etapa de mi vida.
            </p>
            <p className="text-lg text-bordo">
              Con mucho amor,<br />
              <span className="text-bordo text-xl script-text">Milagros</span>
            </p>
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="opacity-60 hover:opacity-80 transition-opacity duration-300">
            <Image 
              src="/images/poweredby.png" 
              alt="Powered by" 
              width={200}
              height={60}
              className="h-48 md:h-60 mx-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

