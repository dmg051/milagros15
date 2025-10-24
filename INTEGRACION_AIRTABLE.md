# Sistema de Invitaciones con URLs Únicas

Este proyecto permite generar URLs únicas para cada invitado usando el `recordId` de Airtable, reemplazando la funcionalidad de Fillout. **Toda la administración se mantiene en Airtable**.

## 🚀 Características Implementadas

### ✅ URLs Únicas por Invitado
- Cada invitado tiene una URL única basada en su `recordId` de Airtable
- Formato: `https://tu-dominio.com/invitation/{recordId}`
- Reemplaza completamente la funcionalidad de Fillout
- **Administración 100% en Airtable** - No necesitas páginas adicionales

### ✅ Páginas Creadas
1. **Página de Invitación Personalizada** (`/invitation/[recordId]`)
   - Muestra datos específicos del invitado
   - Formulario RSVP pre-llenado
   - Mensaje personalizado con el nombre del invitado

### ✅ APIs Implementadas
1. **`/api/invitation/[recordId]`** - Maneja invitaciones específicas
2. **Formulario RSVP actualizado** - Funciona con invitaciones personalizadas

## 📋 Instrucciones Paso a Paso

### Paso 1: Configurar Variables de Entorno
Asegúrate de tener configurado tu archivo `.env.local` con:
```env
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_GUESTS=Guests
AIRTABLE_PAT=patXXXXXXXXXXXXXX
SITE_URL=https://tu-dominio.com
```

### Paso 2: Configurar la Fórmula en Airtable
1. Ve a tu base de Airtable "15 de Milagros"
2. Crea una nueva columna llamada "URL Invitación" (tipo: **Fórmula**)
3. En el editor de fórmulas, escribe exactamente esto:
   ```
   "https://tu-dominio.com/invitation/" & RECORD_ID()
   ```
4. **Reemplaza `https://tu-dominio.com`** con tu dominio real (ej: `https://cumpleanos-milagros.vercel.app`)
5. Guarda la fórmula

### Paso 3: ¡Listo! Las URLs se Generan Automáticamente
- **Cada vez que agregues un nuevo invitado** en Airtable, la fórmula automáticamente generará su URL única
- **No necesitas hacer nada más** - el sistema funciona completamente desde Airtable
- **Para enviar invitaciones**: simplemente copia la URL de la columna "URL Invitación" y envíala por WhatsApp

### Paso 4: Flujo de Trabajo Completo
1. **Agregar invitado**: Lo haces en Airtable normalmente
2. **URL generada**: La fórmula crea automáticamente la URL única
3. **Enviar invitación**: Copias la URL y la envías por WhatsApp
4. **Invitado confirma**: Al abrir la URL, ve su invitación personalizada y confirma asistencia
5. **Datos actualizados**: La confirmación se guarda directamente en Airtable

## 🔧 Cómo Funciona

### Flujo de Invitación Personalizada
1. **Agregas invitado en Airtable** → La fórmula genera automáticamente la URL
2. **Copias la URL** de la columna "URL Invitación" 
3. **Envías por WhatsApp** → El invitado recibe su URL personalizada
4. **Invitado abre la URL** → Ve su invitación personalizada con su nombre y datos
5. **Invitado confirma asistencia** → Los datos se actualizan directamente en Airtable

### Comparación con Fillout
| Aspecto | Fillout (Anterior) | Sistema Actual |
|--------|------------------|----------------|
| URLs | `https://forms.fillout.com/t/uWpsCN8VgYus?id=recXXX` | `https://tu-dominio.com/invitation/recXXX` |
| Administración | En Fillout | **100% en Airtable** |
| Control | Limitado por Fillout | Control total |
| Personalización | Básica | Completa |
| Costo | Depende de Fillout | Gratis |
| Datos | En Fillout | En tu Airtable |

## 📱 Ejemplo de URLs Generadas

### Fórmula en Airtable:
```
"https://tu-dominio.com/invitation/" & RECORD_ID()
```

### URLs resultantes:
```
https://tu-dominio.com/invitation/rectlwENuVAswjCpw  (Juan Carlos Ramo)
https://tu-dominio.com/invitation/rec7cND9P2F8dLgYP  (Emilia Guzmán)
https://tu-dominio.com/invitation/rec2M1WEAAVibeaeB  (Cristian Calvo)
```

## 🛠️ APIs Disponibles

### 1. Obtener Datos de Invitación
```http
GET /api/invitation/{recordId}
```
Retorna datos del invitado específico.

### 2. Actualizar RSVP
```http
POST /api/invitation/{recordId}
Content-Type: application/json

{
  "name": "Juan Carlos Ramo",
  "phone": "+5491123456789",
  "tipo": "Cena",
  "cantidad": 2
}
```

## 🎯 Configuración Final

1. **Configura tu dominio** en las variables de entorno (`SITE_URL`)
2. **Crea la fórmula en Airtable** con tu dominio real
3. **¡Listo!** - Cada nuevo invitado tendrá su URL automáticamente

## 🔍 Verificación

Para verificar que todo funciona:
1. **Agrega un invitado** en Airtable
2. **Verifica que se genere la URL** en la columna "URL Invitación"
3. **Abre la URL** - debería mostrar la invitación personalizada
4. **Completa el formulario RSVP** - debería actualizar Airtable

¡El sistema está listo! **Toda la administración se mantiene en Airtable** como querías. 🎉
