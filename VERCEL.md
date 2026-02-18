# Despliegue en Vercel

Este proyecto ya no es monorepo. La app Next.js vive en la raíz del repositorio.

## Configuración en Vercel

1. En el proyecto de Vercel: **Settings -> General**.
2. En **Root Directory** deja el valor por defecto (raíz del repo).
3. Asegura que el framework detectado sea **Next.js**.

## Comandos

- **Install:** `pnpm install`
- **Build:** `pnpm build` (ejecuta `next build`)
- **Start:** `pnpm start`
