# Despliegue en Vercel (monorepo)

Este proyecto es un **monorepo**: la app Next.js está en `packages/web`, no en la raíz.

## Configuración obligatoria en Vercel

1. En el proyecto de Vercel: **Settings → General**.
2. En **Root Directory** haz clic en **Edit**.
3. Escribe: **`packages/web`** y guarda.

Así Vercel usará el `package.json` de `packages/web` (donde está `next`) y dejará de mostrar *"No Next.js version detected"*.

## Comandos (por defecto)

Con Root Directory = `packages/web`, Vercel ejecutará desde esa carpeta:

- **Install:** `pnpm install` (pnpm detecta el workspace en la raíz del repo).
- **Build:** el definido en `packages/web/package.json` → `next build`.

## Build scripts de pnpm

Si en el log ves *"Ignored build scripts: sharp@..., unrs-resolver@..."*, ya están permitidos en el monorepo en `pnpm-workspace.yaml` (`onlyBuiltDependencies`). Si añades más paquetes que requieran scripts, ejecuta `pnpm approve-builds` y commitea los cambios que indique.
