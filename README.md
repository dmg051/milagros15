# 🎉 Invitación Digital para los 15 Años de Milagros

Una invitación digital moderna y elegante para celebrar los 15 años de Milagros, con integración completa de Airtable para la gestión de invitados.

## ✨ Características

- 🎨 **Diseño elegante** con colores bordó, rojo y dorado
- 🌸 **Decoraciones florales** en toda la interfaz
- 📱 **Responsive** - Se adapta a todos los dispositivos
- 🎵 **Reproductor de música** integrado
- ⏰ **Cuenta regresiva** en tiempo real
- 📋 **Formulario RSVP** con validación
- 📱 **Integración con WhatsApp** para confirmaciones
- 🗺️ **Enlaces a mapas** y calendario
- 💳 **Información de transferencias** bancarias

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Airtable API** - Gestión de datos de invitados
- **Zod** - Validación de esquemas

## 📋 Prerrequisitos

- Node.js 20+
- npm o yarn
- Cuenta de Airtable con base de datos configurada

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/lacra051/milagros15.git
   cd milagros15
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env.local` con:
   ```env
   AIRTABLE_BASE_ID=tu_base_id_aqui
   AIRTABLE_TABLE_GUESTS=Guests
   AIRTABLE_PAT=tu_pat_token_aqui
   SITE_URL=http://localhost:3000
   EVENT_DATE=2025-11-14T22:30:00-03:00
   EVENT_TITLE=Mis 15 Años - Milagros
   EVENT_ADDRESS="Recepción y Eventos FVC, Av. Universitaria 5380 (3er Piso), Urb. San Eulogio, Lima 7, Comas"
   EVENT_MAP_URL="https://maps.google.com/?q=Av.+Universitaria+5380,+Lima"
   MUSIC_MP3_URL="https://drive.google.com/file/d/1pZpjdvVeuSY4Cme29tH3tKsqdb0uiFjm/view?usp=sharing"
   WHATSAPP_PHONE="+5492645240006"
   CHECKIN_PIN=1234

   # Variables públicas (accesibles desde el frontend)
   NEXT_PUBLIC_EVENT_DATE=2025-11-14T22:30:00-03:00
   NEXT_PUBLIC_EVENT_TITLE=Mis 15 Años - Milagros
   NEXT_PUBLIC_EVENT_ADDRESS="Recepción y Eventos FVC, Av. Universitaria 5380 (3er Piso), Urb. San Eulogio, Lima 7, Comas"
   NEXT_PUBLIC_EVENT_MAP_URL="https://maps.google.com/?q=Av.+Universitaria+5380,+Lima"
   NEXT_PUBLIC_MUSIC_MP3_URL="https://drive.google.com/file/d/1pZpjdvVeuSY4Cme29tH3tKsqdb0uiFjm/view?usp=sharing"
   NEXT_PUBLIC_WHATSAPP_PHONE="+5492645240006"
   ```

4. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador:**
   Visita [http://localhost:3000](http://localhost:3000)

## 📊 Configuración de Airtable

### Estructura de la tabla "Guests":

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Name | Single line text | Nombre del invitado |
| Phone number | Phone number | Número de teléfono |
| Cantidad | Number | Cantidad de personas |
| Tipo de invitado | Single select | "Cena" o "Después de cena" |
| RSVP | Single select | "Yes", "No", "No Answer" |
| Formula | Formula | `"https://tu-dominio.com/invitation/" & RECORD_ID()` |

### Permisos del Token PAT:

El token debe tener los siguientes permisos:
- `data.records: read` - Leer datos de registros
- `data.records: write` - Crear, editar y eliminar registros
- `schema.bases: read` - Ver estructura de la base

## 🌐 URLs de Invitación

Cada invitado tiene una URL única generada automáticamente:
```
https://tu-dominio.com/invitation/[RECORD_ID]
```

Ejemplo: `https://tu-dominio.com/invitation/recf3KKk9GJ0Qqyji`

## 📱 Funcionalidades

### Para Invitados:
- Ver invitación personalizada con su nombre
- Confirmar asistencia con formulario RSVP
- Escuchar música de fondo
- Ver cuenta regresiva del evento
- Acceder a mapas y calendario
- Enviar mensaje por WhatsApp

### Para Administradores:
- Gestión completa desde Airtable
- URLs automáticas para cada invitado
- Seguimiento de confirmaciones
- Control de asistencia

## 🎨 Personalización

### Colores:
- **Bordó**: `#8B0000`
- **Rojo**: `#DC143C`
- **Dorado**: `#FFD700`

### Fuentes:
- **Títulos**: Playfair Display (serif)
- **Texto**: Inter (sans-serif)

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Verificar código
```

## 🚀 Deploy en Vercel

### Opción 1: Deploy automático desde GitHub

1. **Conecta tu repositorio** a Vercel:
   - Ve a [vercel.com](https://vercel.com)
   - Importa el proyecto desde GitHub
   - Selecciona el repositorio `dmg051/milagros15`

2. **Configura las variables de entorno** en Vercel:
   - Ve a Settings → Environment Variables
   - Agrega todas las variables listadas abajo

### Opción 2: Deploy manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### 🔧 Variables de Entorno para Vercel

Configura estas variables en el dashboard de Vercel:

**Variables del servidor:**
- `AIRTABLE_BASE_ID` = `appdGZVJ0Nszp9K23`
- `AIRTABLE_TABLE_GUESTS` = `Guests`
- `AIRTABLE_PAT` = `tu_pat_token_aqui`
- `SITE_URL` = `https://tu-dominio.vercel.app` (se actualiza automáticamente)
- `EVENT_DATE` = `2025-11-14T22:30:00-03:00`
- `EVENT_TITLE` = `Mis 15 Años - Milagros`
- `EVENT_ADDRESS` = `Recepción y Eventos FVC, Av. Universitaria 5380 (3er Piso), Urb. San Eulogio, Lima 7, Comas`
- `EVENT_MAP_URL` = `https://maps.google.com/?q=Av.+Universitaria+5380,+Lima`
- `MUSIC_MP3_URL` = `https://drive.google.com/file/d/1pZpjdvVeuSY4Cme29tH3tKsqdb0uiFjm/view?usp=sharing`
- `WHATSAPP_PHONE` = `+5492645240006`
- `CHECKIN_PIN` = `1234`

**Variables públicas (NEXT_PUBLIC_):**
- `NEXT_PUBLIC_EVENT_DATE` = `2025-11-14T22:30:00-03:00`
- `NEXT_PUBLIC_EVENT_TITLE` = `Mis 15 Años - Milagros`
- `NEXT_PUBLIC_EVENT_ADDRESS` = `Recepción y Eventos FVC, Av. Universitaria 5380 (3er Piso), Urb. San Eulogio, Lima 7, Comas`
- `NEXT_PUBLIC_EVENT_MAP_URL` = `https://maps.google.com/?q=Av.+Universitaria+5380,+Lima`
- `NEXT_PUBLIC_MUSIC_MP3_URL` = `https://drive.google.com/file/d/1pZpjdvVeuSY4Cme29tH3tKsqdb0uiFjm/view?usp=sharing`
- `NEXT_PUBLIC_WHATSAPP_PHONE` = `+5492645240006`

### 📋 Checklist para Deploy

- [ ] Variables de entorno configuradas en Vercel
- [ ] Token PAT de Airtable con permisos correctos
- [ ] URL de música accesible públicamente
- [ ] Fórmula en Airtable actualizada con el dominio de Vercel
- [ ] Build exitoso (`npm run build`)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Contacto

- **Desarrollador**: [@lacra051](https://github.com/lacra051)
- **Proyecto**: [milagros15](https://github.com/lacra051/milagros15)

---

¡Que tengas una celebración increíble! 🎉✨