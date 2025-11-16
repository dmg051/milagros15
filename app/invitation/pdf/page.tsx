import { formatDateTime } from '@/lib/format';

export default function InvitationPDF() {
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || '2025-11-14T21:30:00-03:00';
  const eventAddress = 'Ruta 40 y calle 9';
  
  // Formatear fecha para mostrar
  const displayDate = formatDateTime(eventDate);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @page {
          size: A4;
          margin: 0;
        }
        .page {
          width: 210mm;
          height: 297mm;
          page-break-after: always;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .page:last-child {
          page-break-after: auto;
        }
        .page-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          box-sizing: border-box;
        }
      `}} />

      {/* Página 1: Intro */}
      <div className="page" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 220, 0.8) 100%)',
        backgroundColor: '#F5F5DC'
      }}>
        <div className="page-content" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '64px',
            color: '#8B0000',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Mis 15 Años
          </h1>
          
          <div style={{
            borderBottom: '3px solid rgba(220, 20, 60, 0.4)',
            marginBottom: '40px',
            paddingBottom: '20px',
            width: '60%'
          }}>
            <h2 style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '48px',
              color: '#DC143C',
              margin: 0
            }}>
              Milagros
            </h2>
          </div>
          
          <div style={{
            fontSize: '22px',
            color: '#8B0000',
            fontFamily: 'Dancing Script, cursive',
            lineHeight: '2',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <p style={{ marginBottom: '25px' }}>
              Con inmensa alegría y emoción, quiero invitarte a ser parte de uno de los momentos más especiales de mi vida.
            </p>
            <p style={{ marginBottom: '25px' }}>
              Después de 15 años llenos de aprendizajes, risas, sueños y crecimiento, es hora de celebrar esta nueva etapa que comienza.
            </p>
            <p>
              Tu presencia haría que este día sea aún más memorable y lleno de amor.
            </p>
          </div>
        </div>
      </div>

      {/* Página 2: Detalles del Evento + Código de Vestimenta */}
      <div className="page" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 220, 0.8) 100%)',
        backgroundColor: '#F5F5DC'
      }}>
        <div className="page-content" style={{ textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '42px',
            color: '#8B0000',
            marginBottom: '40px',
            fontWeight: 'bold'
          }}>
            Detalles del Evento
          </h3>
          
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '28px',
              color: '#8B0000',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              Fecha y Hora
            </h4>
            <p style={{
              fontSize: '22px',
              color: '#8B0000',
              fontFamily: 'Dancing Script, cursive',
              marginBottom: '20px'
            }}>
              {displayDate}
            </p>
          </div>
          
          {/* Mensaje de hielera */}
          <div style={{
            background: 'linear-gradient(to right, rgba(255, 215, 0, 0.2), rgba(220, 20, 60, 0.2), rgba(255, 215, 0, 0.2))',
            borderRadius: '16px',
            padding: '25px',
            marginBottom: '30px',
            border: '4px solid rgba(255, 215, 0, 0.6)',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            <p style={{
              fontSize: '24px',
              fontFamily: 'Dancing Script, cursive',
              color: '#8B0000',
              fontWeight: 'bold',
              margin: 0
            }}>
              A partir de la 01:30hs.. Hielera en mano 🍹🥶!!
            </p>
          </div>
          
          <div style={{ marginBottom: '40px' }}>
            <h4 style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '28px',
              color: '#8B0000',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Ubicación
            </h4>
            
            {/* Alerta de cambio de ubicación */}
            <div style={{
              background: 'linear-gradient(to right, rgba(220, 20, 60, 0.25), rgba(139, 0, 0, 0.25), rgba(220, 20, 60, 0.25))',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '20px',
              border: '3px solid rgba(220, 20, 60, 0.6)',
              maxWidth: '600px',
              margin: '0 auto 20px'
            }}>
              <p style={{
                fontSize: '22px',
                fontFamily: 'Dancing Script, cursive',
                color: '#8B0000',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>
                ⚠️ ¡IMPORTANTE! Cambio de Ubicación ⚠️
              </p>
              <p style={{
                fontSize: '16px',
                color: '#8B0000',
                opacity: 0.8,
                marginBottom: '20px'
              }}>
                La dirección anterior ya no es válida
              </p>
              
              <div style={{
                background: 'linear-gradient(to right, rgba(255, 215, 0, 0.4), rgba(220, 20, 60, 0.4))',
                borderRadius: '8px',
                padding: '20px',
                border: '3px solid rgba(255, 215, 0, 0.7)'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#8B0000',
                  opacity: 0.7,
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  ✨ Nueva Ubicación ✨
                </p>
                <p style={{
                  fontSize: '28px',
                  fontFamily: 'Dancing Script, cursive',
                  color: '#8B0000',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {eventAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Código de Vestimenta */}
          <div style={{
            marginTop: '40px',
            paddingTop: '40px',
            borderTop: '3px solid rgba(139, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '36px',
              color: '#8B0000',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Código de Vestimenta
            </h3>
            <div style={{
              fontSize: '22px',
              color: '#8B0000',
              fontFamily: 'Dancing Script, cursive'
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '26px' }}>Sport Elegante</p>
              <p style={{ fontSize: '18px', opacity: 0.8 }}>
                Se reserva el color bordó para la quinceañera
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Página 3: Regalos + Gracias */}
      <div className="page" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 220, 0.8) 100%)',
        backgroundColor: '#F5F5DC'
      }}>
        <div className="page-content" style={{ textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '42px',
            color: '#8B0000',
            marginBottom: '30px',
            fontWeight: 'bold'
          }}>
            Regalos
          </h3>
          <p style={{
            fontSize: '20px',
            color: '#8B0000',
            fontFamily: 'Dancing Script, cursive',
            marginBottom: '30px',
            lineHeight: '1.8',
            maxWidth: '500px',
            margin: '0 auto 30px'
          }}>
            Tu presencia es el mejor regalo que puedo recibir. Si deseas obsequiar algo, 
            será recibido con mucho amor y gratitud.
          </p>
          
          <div style={{
            background: 'linear-gradient(to right, rgba(255, 215, 0, 0.25), rgba(220, 20, 60, 0.25))',
            borderRadius: '16px',
            padding: '30px',
            border: '3px solid rgba(255, 215, 0, 0.4)',
            maxWidth: '500px',
            margin: '0 auto 50px'
          }}>
            <h4 style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '28px',
              color: '#8B0000',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Transferencia Bancaria
            </h4>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              border: '2px solid rgba(255, 215, 0, 0.6)'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#8B0000',
                marginBottom: '10px'
              }}>
                Alias:
              </p>
              <p style={{
                fontSize: '24px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                color: '#8B0000',
                background: '#f5f5f5',
                padding: '15px',
                borderRadius: '4px',
                border: '2px solid #ddd',
                margin: 0
              }}>
                milagros.91218mb
              </p>
            </div>
          </div>

          {/* Sección Gracias */}
          <div style={{
            marginTop: '50px',
            paddingTop: '50px',
            borderTop: '3px solid rgba(139, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '42px',
              color: '#8B0000',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              ¡Gracias!
            </h3>
            <p style={{
              fontSize: '20px',
              color: '#8B0000',
              fontFamily: 'Dancing Script, cursive',
              marginBottom: '30px',
              lineHeight: '1.8',
              maxWidth: '500px',
              margin: '0 auto 30px'
            }}>
              Tu presencia hará que este día sea aún más especial. 
              Esperamos celebrar contigo esta nueva etapa de mi vida.
            </p>
            <p style={{
              fontSize: '22px',
              color: '#8B0000',
              fontFamily: 'Dancing Script, cursive',
              margin: 0
            }}>
              Con mucho amor,<br />
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>Milagros</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
