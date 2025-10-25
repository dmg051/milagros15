'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import Countdown from '@/components/Countdown';
import CalendarButton from '@/components/CalendarButton';
import MapButton from '@/components/MapButton';
import RsvpForm from '@/components/RsvpForm';
import WhatsappConfirm from '@/components/WhatsappConfirm';
import SongSuggestion from '@/components/SongSuggestion';
import WishBox from '@/components/WishBox';
import Image from 'next/image';
import { formatDateTime } from '@/lib/format';

interface GuestData {
  id: string;
  name: string;
  tipo: 'Cena' | 'Después de cena';
  cantidad: number;
  rsvpStatus: 'Confirmado' | 'Pendiente' | 'Rechazado';
  checkin: boolean;
}

export default function InvitationPage() {
  const params = useParams();
  const recordId = params.recordId as string;
  
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    tipo: 'Cena' as 'Cena' | 'Después de cena',
    cantidad: 1,
  });

  const fetchGuestData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/invitation/${recordId}`);
      const result = await response.json();

      if (result.ok) {
        setGuestData(result.guest);
        // Pre-llenar formulario con datos del invitado
        setFormData({
          name: result.guest.name || '',
          tipo: result.guest.tipo || 'Cena',
          cantidad: result.guest.cantidad || 1,
        });
      } else {
        setError(result.error || 'Error cargando invitación');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }, [recordId]);

  useEffect(() => {
    if (recordId) {
      fetchGuestData();
    }
  }, [recordId, fetchGuestData]);

  const handleRsvpSuccess = (data: { recordId: string; inviteCode: string }) => {
    // Recargar datos del invitado después del RSVP
    fetchGuestData();
  };

  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || '2025-07-19T20:00:00-03:00';
  const eventTitle = process.env.NEXT_PUBLIC_EVENT_TITLE || 'Mis 15 Años - Milagros';
  const eventAddress = process.env.NEXT_PUBLIC_EVENT_ADDRESS || 'Recepción y Eventos FVC, Av. Universitaria 5380 (3er Piso), Urb. San Eulogio, Lima 7, Comas';
  const eventMapUrl = process.env.NEXT_PUBLIC_EVENT_MAP_URL || 'https://maps.google.com/?q=Av.+Universitaria+5380,+Lima';
  const musicUrl = '/audio/Ed-Sheeran-Perfect.mp3';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+54911XXXXXXX';

  console.log('Invitation page - musicUrl:', musicUrl);

  if (loading) {
    return (
      <div className="min-h-screen floral-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bordo mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu invitación...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen floral-pattern flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
            <h1 className="text-2xl font-serif text-bordo mb-4">Invitación no encontrada</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block rounded-full bg-bordo px-6 py-3 text-white font-medium transition-all duration-200 hover:bg-dark-bordo hover:scale-105"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen invitation-bg">
      {/* Reproductor de música flotante */}
      <AudioPlayer src={musicUrl} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
                  <div className="invitation-card hero-card-bg rounded-3xl p-12 mb-8 doodle-border">
            <h1 className="script-title mb-6">
              Mis 15 Años
            </h1>
            
            <div className="doodle-line mb-8">
              <h2 className="script-subtitle">
                Milagros
              </h2>
            </div>
          
          {/* Mensaje personalizado para el invitado */}
          {guestData && (
            <div className="text-lg md:text-xl text-bordo max-w-2xl mx-auto leading-relaxed">
              <p className="mb-4 script-text text-xl">
                ¡Hola <span className="font-semibold text-bordo">{guestData.name.split(' ')[0]}</span>!
              </p>
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
          )}
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
                <p className="text-lg text-bordo mb-4 script-text">
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
                <p className="text-bordo mb-4 script-text">
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
                      <p className="font-medium script-text">Sport Elegante</p>
                      <p className="text-sm text-bordo mt-2 script-text">
                        Se reserva el color bordó para la quinceañera
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
            <p className="text-bordo mb-6 script-text">
              Tu presencia es el mejor regalo que puedo recibir. Si deseas obsequiar algo, 
              será recibido con mucho amor y gratitud.
            </p>
            
            {/* Transferencia Bancaria */}
            <div className="bg-gradient-to-r from-gold/20 to-red/20 rounded-xl p-6 border-2 border-gold/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-bordo mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                </svg>
                <h4 className="text-lg script-text text-bordo font-bold">Transferencia Bancaria</h4>
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
              <WishBox recordId={recordId} />
            </div>
            
            <div className="invitation-card rounded-3xl p-6 text-center">
              <h4 className="text-xl script-text text-bordo mb-4 font-bold">
                Sugerir Canciones
              </h4>
              <p className="text-bordo mb-4 script-text">
                Ayúdanos con la playlist
              </p>
              <SongSuggestion recordId={recordId} />
            </div>
          </div>
        </div>
      </section>

      {/* Pases Section - Mostrar información específica del invitado */}
      {guestData && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="invitation-card rounded-3xl p-8 text-center">
              <h3 className="text-2xl script-text text-bordo mb-6 font-bold">
                Tus Pases
              </h3>
              <p className="text-lg text-bordo mb-4">
                Hemos reservado <span className="font-bold text-bordo">{guestData.cantidad}</span> lugar{guestData.cantidad > 1 ? 'es' : ''} en tu honor
              </p>
              <p className="text-sm text-bordo">
                Tipo de invitación: <span className="font-medium">{guestData.tipo}</span>
              </p>
              {guestData.rsvpStatus === 'Confirmado' && (
                <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  ✓ Confirmado
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <RsvpForm 
            onSuccess={handleRsvpSuccess} 
            recordId={recordId}
            initialData={formData}
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">O confirma por WhatsApp:</p>
            <WhatsappConfirm
              name={guestData?.name || formData.name}
              tipo={guestData?.tipo || formData.tipo}
              cantidad={guestData?.cantidad || formData.cantidad}
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
            <p className="text-lg text-bordo mb-6 script-text">
              Tu presencia hará que este día sea aún más especial. 
              Esperamos celebrar contigo esta nueva etapa de mi vida.
            </p>
            <p className="text-bordo script-text">
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
