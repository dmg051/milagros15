'use client';

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface CheckInRecord {
  inviteCode: string;
  timestamp: string;
  name?: string;
}

export default function CheckInPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [recentCheckIns, setRecentCheckIns] = useState<CheckInRecord[]>([]);
  const [scannerActive, setScannerActive] = useState(false);

  useEffect(() => {
    // Obtener código de la URL si existe
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    if (codeParam) {
      setInviteCode(codeParam);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PIN simple para demo - en producción debería ser más seguro
    if (pin === '1234') {
      setIsAuthenticated(true);
      setMessage(null);
    } else {
      setMessage({ type: 'error', text: 'PIN incorrecto' });
    }
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteCode,
          pin: '1234', // PIN fijo para esta demo
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setMessage({ type: 'success', text: 'Check-in exitoso!' });
        setInviteCode('');
        
        // Agregar al historial
        const newRecord: CheckInRecord = {
          inviteCode,
          timestamp: new Date().toLocaleString(),
        };
        setRecentCheckIns(prev => [newRecord, ...prev.slice(0, 9)]);
      } else {
        setMessage({ type: 'error', text: result.error || 'Error en el check-in' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const startScanner = () => {
    setScannerActive(true);
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setInviteCode(decodedText);
        setScannerActive(false);
        scanner.clear();
      },
      (error) => {
        // Error silencioso para evitar spam en consola
      }
    );
  };

  const stopScanner = () => {
    setScannerActive(false);
    const scannerElement = document.getElementById('qr-reader');
    if (scannerElement) {
      scannerElement.innerHTML = '';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-serif text-sage mb-6 text-center">
            Acceso Check-in
          </h1>
          
          {message && (
            <div
              className={`mb-6 rounded-lg p-4 text-center ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handlePinSubmit}>
            <div className="mb-6">
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                PIN de Acceso
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage/50"
                placeholder="Ingresa el PIN"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full rounded-full bg-sage py-3 text-white font-medium transition-all duration-200 hover:bg-sage/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage/50"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-sage mb-8 text-center">
          Sistema de Check-in
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de Check-in */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-serif text-sage mb-6">
              Registrar Check-in
            </h2>

            {message && (
              <div
                className={`mb-6 rounded-lg p-4 text-center ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div>
                <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Invitación
                </label>
                <input
                  type="text"
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage/50"
                  placeholder="Ej: QS-ABC123"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-full bg-sage py-3 text-white font-medium transition-all duration-200 hover:bg-sage/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage/50 disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando...' : 'Registrar Check-in'}
                </button>
                
                <button
                  type="button"
                  onClick={scannerActive ? stopScanner : startScanner}
                  className="px-4 py-3 rounded-full bg-gray-200 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  {scannerActive ? 'Detener' : 'QR'}
                </button>
              </div>
            </form>

            {/* Scanner QR */}
            {scannerActive && (
              <div className="mt-6">
                <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
              </div>
            )}
          </div>

          {/* Historial de Check-ins */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-serif text-sage mb-6">
              Últimos Check-ins
            </h2>
            
            {recentCheckIns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No hay check-ins recientes
              </p>
            ) : (
              <div className="space-y-3">
                {recentCheckIns.map((record, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-700">
                        {record.inviteCode}
                      </span>
                      {record.name && (
                        <span className="text-gray-500 ml-2">
                          - {record.name}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {record.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botón de Logout */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}


