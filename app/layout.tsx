// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mis 15 Años - Milagros',
  description: 'Invitación especial para celebrar mis 15 años',
  keywords: 'quinceañera, cumpleaños, fiesta, celebración',
  authors: [{ name: 'Milagros' }],
  openGraph: {
    title: 'Mis 15 Años - Milagros',
    description: 'Invitación especial para celebrar mis 15 años',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-sage/10 via-cream to-soft-green/20">
        {children}
      </body>
    </html>
  );
}


