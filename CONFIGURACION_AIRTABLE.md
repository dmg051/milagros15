# Configuración de la Fórmula en Airtable

## 📋 Instrucciones Detalladas

### Paso 1: Crear la Columna de Fórmula
1. Ve a tu base de Airtable "15 de Milagros"
2. Haz clic en el botón "+" para agregar una nueva columna
3. Selecciona **"Fórmula"** como tipo de campo
4. Nombra la columna: **"URL Invitación"**

### Paso 2: Configurar la Fórmula
En el editor de fórmulas, escribe exactamente esto:

```
"https://tu-dominio.com/invitation/" & RECORD_ID()
```

**⚠️ IMPORTANTE:** Reemplaza `https://tu-dominio.com` con tu dominio real:

#### Ejemplos según tu hosting:
- **Vercel**: `"https://cumpleanos-milagros.vercel.app/invitation/" & RECORD_ID()`
- **Netlify**: `"https://cumpleanos-milagros.netlify.app/invitation/" & RECORD_ID()`
- **Dominio personalizado**: `"https://mis15milagros.com/invitation/" & RECORD_ID()`

### Paso 3: Verificar la Fórmula
1. Haz clic en "Save" para guardar la fórmula
2. Verifica que aparezca una URL generada automáticamente en cada fila
3. La URL debería verse así: `https://tu-dominio.com/invitation/recXXXXXXXXXXXXXX`

## 🎯 Resultado Esperado

### Antes (con Fillout):
```
https://forms.fillout.com/t/uWpsCN8VgYus?id=rectlwENuVAswjCpw
```

### Después (con tu proyecto):
```
https://tu-dominio.com/invitation/rectlwENuVAswjCpw
```

## ✅ Verificación

1. **Agrega un nuevo invitado** en Airtable
2. **Verifica que se genere automáticamente** la URL en la columna "URL Invitación"
3. **Copia la URL** y ábrela en una nueva pestaña
4. **Deberías ver** la invitación personalizada con el nombre del invitado

## 🔧 Solución de Problemas

### Si la fórmula no funciona:
- Verifica que el dominio esté correcto (sin espacios extra)
- Asegúrate de usar comillas dobles `"` no simples `'`
- Verifica que el símbolo `&` esté presente para concatenar

### Si la URL no carga:
- Verifica que tu proyecto esté desplegado y funcionando
- Revisa las variables de entorno (`AIRTABLE_BASE_ID`, `AIRTABLE_PAT`)
- Verifica que el `recordId` sea válido

¡Listo! Ahora cada invitado tendrá su URL única generada automáticamente. 🎉
