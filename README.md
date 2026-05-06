# Base Canales — Nexsys

App para gestionar la base de canales, desplegada en Vercel con Postgres.

## Cómo subir a Vercel (paso a paso)

### 1. Subir el código a GitHub
1. Creá un repo nuevo en github.com (ej: `basecanales`)
2. Subí todos estos archivos al repo

### 2. Crear el proyecto en Vercel
1. Entrá a vercel.com → New Project
2. Importá el repo de GitHub
3. Click en Deploy (sin tocar nada más)

### 3. Agregar la base de datos Postgres
1. En tu proyecto de Vercel → pestaña **Storage**
2. Click en **Create Database** → elegí **Postgres**
3. Nombre: `basecanales-db` → Create
4. Vercel agrega las variables de entorno automáticamente

### 4. Agregar la variable SEED_SECRET
1. En Vercel → Settings → Environment Variables
2. Agregá: `SEED_SECRET` = `nexsys2026` (o la contraseña que quieras)
3. Redesplegá: Deployments → último deploy → Redeploy

### 5. Importar los datos del CSV
1. Abrí la app en el navegador
2. Click en **⬆ Importar datos del CSV**
3. Ingresá la clave: `nexsys2026`
4. ¡Listo! Los 77 canales quedan cargados en la base de datos

## Funcionalidades
- 🔍 Buscar por empresa, contacto o email
- 🔽 Filtrar por estado, tier y tipo
- ✏️ Editar cualquier canal
- ➕ Agregar nuevos canales
- 🗑️ Eliminar canales
- 💾 Todo guardado en Postgres (sincronizado entre dispositivos)
