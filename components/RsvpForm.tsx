'use client';

import { useState } from 'react';
import { z } from 'zod';

interface RsvpFormProps {
  className?: string;
  onSuccess?: (data: { recordId: string; inviteCode: string }) => void;
  recordId?: string;
  initialData?: {
    name: string;
    tipo: 'Cena' | 'Después de cena';
    cantidad: number;
  };
}

const rsvpSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  tipo: z.enum(['Cena', 'Después de cena'], {
    errorMap: () => ({ message: 'Debe seleccionar una opción' })
  }),
  cantidad: z.number().min(1, 'La cantidad debe ser al menos 1').max(6, 'La cantidad no puede ser mayor a 6'),
  comentarios: z.string().optional(),
});

type RsvpFormData = z.infer<typeof rsvpSchema>;

export default function RsvpForm({ className = '', onSuccess, recordId, initialData }: RsvpFormProps) {
  const [formData, setFormData] = useState<RsvpFormData>({
    name: initialData?.name || '',
    tipo: initialData?.tipo || 'Cena',
    cantidad: initialData?.cantidad || 1,
    comentarios: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (field: keyof RsvpFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Validar datos
      const validatedData = rsvpSchema.parse(formData);
      
      // Enviar a API
      let response;
      if (recordId) {
        // Usar la nueva API de invitación personalizada
        response = await fetch(`/api/invitation/${recordId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });
      } else {
        // Usar la API original para invitaciones generales
        response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });
      }

      const result = await response.json();

      if (result.ok) {
        setSubmitMessage({
          type: 'success',
          text: recordId 
            ? '¡Confirmación exitosa! Tu asistencia ha sido registrada.'
            : `¡Confirmación exitosa! Tu código de invitación es: ${result.inviteCode}`,
        });
        onSuccess?.(result);
        // Limpiar formulario solo si no es una invitación personalizada
        if (!recordId) {
          setFormData({
            name: '',
            phone: '',
            tipo: 'Cena',
            cantidad: 1,
            comentarios: '',
          });
        }
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Error al confirmar asistencia',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof RsvpFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RsvpFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitMessage({
          type: 'error',
          text: 'Error al procesar la solicitud',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-sm ${className}`}>
      <h3 className="mb-6 text-center text-2xl font-serif text-bordo floral-decoration">
        Confirma tu asistencia
      </h3>

      {submitMessage && (
        <div
          className={`mb-6 rounded-lg p-4 text-center ${
            submitMessage.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bordo/50 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Tu nombre completo"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de invitación *
          </label>
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-700">
            {formData.tipo}
          </div>
          <p className="text-xs text-gray-500 mt-1">Este campo está predefinido</p>
        </div>

        <div>
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad de personas *
          </label>
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-700">
            {formData.cantidad} {formData.cantidad === 1 ? 'persona' : 'personas'}
          </div>
          <p className="text-xs text-gray-500 mt-1">Este campo está predefinido</p>
        </div>

        <div>
          <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-1">
            Comentarios (opcional)
          </label>
          <textarea
            id="comentarios"
            value={formData.comentarios}
            onChange={(e) => handleInputChange('comentarios', e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage/50"
            placeholder="Alergias alimentarias, mensaje especial, etc."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-bordo py-3 text-white font-medium transition-all duration-200 hover:bg-dark-bordo hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bordo/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Confirmar asistencia'}
        </button>
      </form>
    </div>
  );
}

