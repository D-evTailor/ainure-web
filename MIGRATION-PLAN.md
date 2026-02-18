# Plan de migración: Rebranding a AINURE

**Contexto:** Cambio estético y de branding. Nombre: **AINURE**. Tono: *"2026 Senior Creative UX Developer"* — minimalismo con carácter, dark mode sofisticado, artesanía digital. La lógica de negocio (backend, mail-service, chatbot) se mantiene intacta.

**Fecha de auditoría:** Febrero 2026.

---

## 1. Auditoría de identidad (Find & Replace)

Archivos donde aparecen **Selference**, **DevTailor**, **selference.com** o **dev_tailor** y que deben actualizarse al nuevo nombre **Ainure** (o dominios/emails que se definan).

### 1.1 Archivos que requieren cambio de nombre / metadatos

| Archivo | Qué cambiar |
|---------|-------------|
| `app/layout.tsx` | `metadata.title`, `metadata.description` ("Selference" → "Ainure") |
| `app/page.tsx` | `alt="Selference hero image"` → "Ainure hero image" |
| `app/contacto/page.tsx` | Objeto de contacto: `value: "info@selference.com"` → email Ainure |
| `app/api/mail/send/route.ts` | `MAILERSEND_SENDER_NAME` fallback "DevTailor", texto "Contacto DevTailor" → "Ainure" / "Contacto Ainure" |
| `app/chatbot/page.tsx` | Mensaje de bienvenida: "asistente digital de Selference" → "Ainure"; título sidebar "Proceso Selference" → "Proceso Ainure" |
| `app/metodologia/page.tsx` | Texto "Filosofía **Selference**" (span con clase) → "Ainure" |
| `components/layout/header.tsx` | `alt="Selference Logo"` |
| `components/layout/footer.tsx` | `alt="Selference Logo"`, `href="mailto:info@selference.com"`, texto "info@selference.com", "© … Selference. Todos los derechos reservados." |
| `.env.local.example` | `MAILERSEND_SENDER_NAME=DevTailor`, `CONTACT_FORM_TO_EMAIL=info@selference.com` (valores de ejemplo a Ainure) |

### 1.2 Archivos opcionales (scripts y documentación interna)

- `scripts/automated-responsive-qa.mjs` — comentarios y títulos de reporte "DevTailor"
- `scripts/responsive-qa-test.mjs` — idem
- `docs/**` — múltiples referencias a "Selference" en roadmap, stack, estructura, chatbot, etc. Actualizar si se quiere coherencia en docs; no bloquea el rebrand público.

### 1.3 Resumen identidad

- **Total archivos críticos:** 9 (app, components, api, env example).
- **No existe** `site.config.ts` ni archivo central de copy: el nombre está repartido en layout, páginas y componentes. Conviene añadir un `lib/site.config.ts` o `constants/brand.ts` con `siteName: "Ainure"`, `contactEmail`, etc., y usarlo en todos estos archivos para futuros cambios.

---

## 2. Auditoría de Design System (Tailwind y globals.css)

### 2.1 Estado actual

**Colores**

- **Tailwind `tailwind.config.ts`:**
  - `theme.extend.colors.brand`: escala 50–900 (teal/cyan: #E3F8FA → #0D1C1F). Valores hex fijos.
  - `theme.extend.colors.primary`: 400/500/600 (azul #5aa2ff, #3583ff, #2a6bdd).
  - Resto: shadcn vía variables CSS (`hsl(var(--background))`, `--foreground`, `--border`, etc.).
- **globals.css:**
  - `:root` y `.dark`: definen `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--radius`, etc. en HSL (sin canal alpha en la mayoría).
  - Uso mixto: shadcn usa vars; fondos de página usan **hex hardcodeados** (`#0d1117`, `#161b22`).

**Tipografía**

- **globals.css:** `body { font-family: Arial, Helvetica, sans-serif; }` — no se usa en práctica porque…
- **app/layout.tsx:** `Manrope` de `next/font/google` aplicado al `<body>` vía `className`. Solo una familia; no hay serif ni display.

**Otros**

- `--container-padding-x`, `--container-max-width`, `--section-space-y`, `--page-title-size`, `--page-subtitle-size` ya existen y son reutilizables.
- Focus visible: `ring-2 ring-brand-300` (depende de paleta actual).
- Clases de utilidad: `.app-container`, `.app-page` (esta con `bg-[#0d1117]` fijo), `.app-section`, `.app-page-header`, `.app-page-title`, `.app-page-subtitle`.
- Scrollbar y card-hover con colores fijos (slate/gris).

### 2.2 Estrategia propuesta: tokens "Ainure 2026"

1. **Centralizar superficie y fondo en variables CSS**
   - Introducir en `:root` / `.dark`:
     - `--surface-base`, `--surface-elevated`, `--surface-overlay` (fondos).
     - `--text-primary`, `--text-secondary`, `--text-muted`.
   - Sustituir todos los `#0d1117`, `#161b22`, `rgb(24,59,63)` por estas variables (o tokens Tailwind que las referencien).

2. **Nueva paleta en Tailwind**
   - Mantener estructura shadcn (background, foreground, border, etc.) pero alimentarla desde una paleta Ainure.
   - Propuesta de vibe "artesanía digital / 2026":
     - **Fondos:** tonos oscuros con sensación noise/grain (vía `background-image` o clase utilitaria `.bg-noise` con SVG o imagen sutil).
     - **Acentos:** neón sutil (ej. cyan/verde muy controlado) o metálicos (grises cálidos/fríos con toque de color) — reemplazar `brand-300`/`brand-400` por `accent` o nueva escala `ainure`.
   - Mapear `theme.extend.colors.brand` (o renombrar a `ainure`) a la nueva paleta y dejar de usar hex en componentes.

3. **Tipografía**
   - **Display / títulos:** serif editorial (ej. **Fraunces**, **Playfair Display** o **Instrument Serif** vía `next/font/google`) para h1/h2.
   - **Cuerpo:** sans grotesk (mantener **Manrope** o cambiar a **DM Sans**, **General Sans**, **Geist**).
   - Definir en `tailwind.config.ts`: `fontFamily: { sans: [...], display: [...] }` y aplicar en `globals.css` o layout.

4. **Implementación mínima**
   - Añadir en `globals.css` las nuevas variables y, si se desea, una clase `.bg-noise`.
   - En `tailwind.config.ts`: extender `colors` con la paleta Ainure y `fontFamily` con display/sans.
   - Sustituir en todo el proyecto las clases que usan `#0d1117`, `rgb(24,59,63)`, etc. por clases que usen `var(--…)` o tokens (ej. `bg-surface-base`, `bg-ainure-500`).

---

## 3. Auditoría de componentes UI y layout

### 3.1 Estilos hardcodeados que dificultan rediseño

Todos estos archivos usan **colores fijos** (hex o rgb) en lugar de tokens:

| Archivo | Uso |
|---------|-----|
| `app/globals.css` | `.app-page`: `bg-[#0d1117]`; scrollbar: `#f1f5f9`, `#cbd5e1`, `#94a3b8` |
| `app/page.tsx` | `bg-[#0d1117]`, secciones con mismo fondo; estilo inline JSX con gradiente mineral (hex) |
| `app/chatbot/page.tsx` | `from-[#0d1117] via-[#161b22] to-[#0d1117]`; burbujas y botón `rgb(24,59,63)` / `rgb(18,45,48)` |
| `components/layout/header.tsx` | `bg-[#0d1117]/90`, `bg-[#0d1117]/95`, botón CTA `rgb(24,59,63)` |
| `components/layout/footer.tsx` | `from-[#0d1117] via-gray-900 to-[#0d1117]`, `border-gray-800` |
| `components/chatbot/project-summary.tsx` | Botón `bg-[rgb(24,59,63)]` |

**Recomendación:** Tras definir tokens (sección 2), hacer un pase único de búsqueda/reemplazo por clases que usen variables/tokens (ej. `bg-surface-base`, `bg-ainure-600`, `text-ainure-300`).

### 3.2 Imágenes y assets a reemplazar

| Asset | Ubicación | Uso |
|-------|-----------|-----|
| `dev_tailor_logo.png` | `public/` | Header y Footer (logo principal). **Prioridad alta.** |
| `background.png` | `public/` | Hero en `app/page.tsx`. Sustituir por imagen/video/gradient + noise acorde a Ainure. |
| `placeholder.svg`, `placeholder-logo.svg` | `public/` | Revisar si se usan; si sí, sustituir por placeholders neutros o con marca Ainure. |
| `chip.png` | `@/assets/chip.png` | Icono de navegación "TALKS" en header. Decidir si se mantiene o se sustituye por icono/svg Ainure. |

No se han encontrado `favicon.ico`, `manifest.json` ni meta `apple-touch-icon` en la auditoría. Deben crearse para el rebrand.

### 3.3 Chatbot: acoplamiento UI vs lógica

- **Estructura actual:** Toda la pantalla del chatbot está en **un solo archivo** `app/chatbot/page.tsx`.
  - Estado: `useState` para `messages`, `inputValue`, `isTyping`, `isInitialLoad`.
  - Lógica: `generateResponse()`, `simulateTyping()`, `handleSendMessage()`, `handleKeyPress()` en el mismo componente.
  - UI: lista de mensajes, burbujas, sugerencias, input y sidebar (tipos de proyecto + “Proceso Selference”) inline; **no existe** un componente `ChatInterface` separado ni un hook `useChat` en el repo.

- **Conclusión:** La UI del chat (burbujas, layout del mensaje) está en el mismo archivo que la lógica, pero **la lógica es autónoma**: no depende de la forma de las burbujas. Se puede:
  1. Extraer un componente presentacional tipo `ChatBubbles` o `MessageBubble` que reciba `messages` y `onSendMessage` (o solo `messages` si el input se deja en la página).
  2. Rediseñar las burbujas (más orgánicas, nuevas clases, incluso Framer Motion) sin tocar `generateResponse` ni la estructura de datos.
  3. Opcional: extraer un hook `useChat(messages, setMessages, generateResponse)` para dejar la página más limpia. No es obligatorio para el cambio estético.

- **Componentes existentes** `components/chatbot/conversation-metrics.tsx` y `components/chatbot/project-summary.tsx` están **bien desacoplados**: reciben props y usan `brand-300` y algunos grises. Cambiando a tokens de color, se rediseñan sin tocar lógica.

---

## 4. Auditoría de animaciones (Framer Motion)

### 4.1 Uso actual

- **framer-motion** está en `package.json` (dependencia del proyecto) pero **no se importa en ningún componente de `app/` ni `components/`**.
- El único uso de nombres “motion”/“animate” en UI está en `components/ui/navigation-menu.tsx`: son utilidades de **Tailwind** / Radix (`animate-in`, `animate-out`, `fade-in`, `slide-in-from-*`), no Framer Motion.
- En `docs/chatbot/features.md` hay ejemplos de código con `<motion.div>` y `<AnimatePresence>`, pero son documentación, no código en uso.

**Conclusión:** No hay animaciones centralizadas ni variantes reutilizables; no hay AnimatePresence en la app. El rebrand puede introducir Framer Motion desde cero con criterio unificado.

### 4.2 Viabilidad de AnimatePresence y layout animations

- **Layout:** Un único `app/layout.tsx` con `<Header />`, `<main>{children}</main>`, `<Footer />`. Las rutas son páginas hijas (home, servicios, metodología, valores, contacto, chatbot, talks, etc.).
- **Envolver en AnimatePresence:** Es viable. Opciones:
  1. En el layout, envolver `{children}` en `<AnimatePresence mode="wait">` y usar un `key={pathname}` (leyendo `pathname` en un client component que envuelva `children`, o usando el segmento de ruta) para animar transiciones entre páginas.
  2. O bien usar un template/layout por ruta que envuelva solo el contenido de esa ruta en motion + AnimatePresence.
- **Requisito:** El componente que use `usePathname()` y envuelva `children` debe ser Client Component; el layout puede seguir siendo Server Component pasando ese wrapper como hijo.
- **Layout animations / shared element transitions:** La estructura actual (páginas independientes sin componentes compartidos de transición) no tiene shared elements entre rutas. Para “state-of-the-art” se podría:
  - Añadir transiciones de entrada/salida por página (fade, slide, scale) con AnimatePresence.
  - Más adelante, si se definen elementos compartidos (ej. un logo o card que se expande), diseñar variantes con `layoutId` en Framer Motion.

---

## 5. Lista de archivos a modificar (resumen)

### 5.1 Cambio de nombre / copy / metadatos

- `app/layout.tsx`
- `app/page.tsx`
- `app/contacto/page.tsx`
- `app/metodologia/page.tsx`
- `app/chatbot/page.tsx`
- `app/api/mail/send/route.ts`
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- `.env.local.example`

(Opcional: crear `lib/site.config.ts` o `constants/brand.ts` y usarlo en los anteriores.)

### 5.2 Design system (tokens, tipografía, fondos)

- `tailwind.config.ts` — paleta Ainure, fontFamily, opcionalmente keyframes.
- `app/globals.css` — variables CSS nuevas, `.app-page` y utilidades que usen tokens; scrollbar; opcional `.bg-noise`.

### 5.3 Sustitución de estilos hardcodeados

- `app/globals.css`
- `app/page.tsx`
- `app/chatbot/page.tsx`
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- `components/chatbot/project-summary.tsx`
- `components/chatbot/conversation-metrics.tsx` (si se cambian colores por tokens)

### 5.4 Animaciones (opcional)

- Crear `lib/motion-variants.ts` (o similar) con variantes reutilizables.
- Ajustar `app/layout.tsx` (o un wrapper client) para AnimatePresence + key por ruta.
- Páginas o componentes que se quieran animar: envolver en `<motion.*>` con variantes.

---

## 6. Assets gráficos a generar

| Asset | Descripción |
|-------|-------------|
| **Logo principal** | Logo Ainure para header y footer (sustituye `dev_tailor_logo.png`). Variantes: claro/fondo oscuro, posible versión compacta para móvil. |
| **Favicon** | `favicon.ico` (y opcionalmente `.svg`) para pestaña del navegador. |
| **Apple touch icon** | Para dispositivos Apple (ej. 180x180). |
| **Open Graph / social** | Imagen para redes (og:image, Twitter card). Título/descripción con marca Ainure. |
| **Hero / background** | Nueva imagen o composición para hero (sustituye `background.png`): coherente con dark mode y estilo “artesanía digital”. |
| **Placeholders** | Si se usan: `placeholder.svg`, `placeholder-logo.svg` con estilo Ainure o neutros. |
| **Icono TALKS (opcional)** | Sustitución de `chip.png` en nav por icono o SVG alineado con Ainure. |

---

## 7. Propuesta de tokens de diseño "Ainure"

Resumen ejecutivo para el vibe *"2026 Senior Creative UX Developer"*:

- **Superficies:** Fondos oscuros con sensación de profundidad (no flat). Opción: grano/noise sutil vía CSS o imagen.
- **Tipografía:** Serif display para títulos (editorial), sans grotesk para cuerpo. Ejemplo: Instrument Serif o Fraunces (display) + Manrope o Geist (sans).
- **Paleta:** Dark-first. Grises neutros cálidos o fríos para fondo y texto; un acento muy controlado (neón suave o metálico) para CTAs, enlaces y estados activos. Evitar azul corporativo; inclinar a cyan/verde apagado o tono metal.
- **Radios y densidad:** Mantener `--radius` y espaciado actual o ligeramente más amplio para sensación “premium”.
- **Motion:** Transiciones de página suaves (fade/slide); micro-interacciones en hover/focus; opcional layout animation en componentes clave.

*(Los valores hex/HSL concretos se pueden definir en una segunda fase en `tailwind.config.ts` y `globals.css` según aprobación de diseño.)*

---

## 8. Riesgos detectados

| Riesgo | Mitigación |
|--------|------------|
| **Chatbot: todo en un solo archivo** | Extraer al menos `MessageBubble` (y opcionalmente `ChatInput` + hook `useChat`) para poder cambiar la UI de las burbujas sin tocar la lógica. |
| **Colores y fondos hardcodeados en muchos archivos** | Primero introducir tokens en Tailwind y CSS; luego un único pase de búsqueda/reemplazo por clases tokenizadas. |
| **Sin archivo de configuración de marca** | Crear `lib/site.config.ts` (o similar) con nombre, email, urls sociales y usarlo en layout, footer, contacto y API de mail para evitar inconsistencias. |
| **Header/Footer con muchos valores fijos** | Refactorizar a componentes que lean de `site.config` y clases con tokens; reducir inline styles. |
| **Framer Motion no usado** | Si se añaden animaciones, definir variantes en un solo módulo y usarlas en layout/páginas para no dispersar duraciones y easing. |
| **Documentación desactualizada** | Tras el rebrand, actualizar al menos README y docs de estructura/stack con el nombre Ainure si se quiere coherencia interna. |
| **Env y API de mail** | Actualizar `.env.local.example` y variables de entorno de despliegue (sender name, email de contacto) para que correos y formularios muestren "Ainure". |

---

*Documento generado como resultado de la auditoría del codebase para el rebranding AINURE. No sustituye la definición final de identidad ni la guía de estilo; sirve como plan de ataque técnico para el refactor estético.*
