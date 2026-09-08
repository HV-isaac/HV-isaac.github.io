# CV — sitio web

Portafolio y CV personal bilingüe (español / inglés) publicado como sitio estático en
GitHub Pages. La web es una pieza con movimiento —índice lateral que sigue el scroll,
entradas escalonadas, filtros y tarjetas reactivas al puntero— y el PDF descargable es un
CV sobrio de dos páginas. Ambos leen exactamente los mismos datos.

**Stack:** Next.js 16 (App Router, `output: 'export'`) · TypeScript · Tailwind CSS 4 ·
Playwright para el PDF · GitHub Actions para el despliegue.

---

## Puesta en marcha

```bash
npm install
npx playwright install chromium   # solo para generar el PDF
cp .env.example .env.local        # y rellenar los valores
npm run dev
```

| Ruta | Qué es |
|---|---|
| `/` | CV en español |
| `/en/` | CV en inglés |
| `/print/`, `/en/print/` | Origen del PDF — sin navegación ni formulario, no indexadas |

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio estático en `out/` |
| `npm run pdf` | Imprime las rutas `/print/` a PDF dentro de `out/` (requiere un build previo) |
| `npm run build:full` | `build` + `pdf` — es lo que ejecuta el CI |
| `npm run serve` | Sirve `out/` tal como lo hará GitHub Pages, para detectar 404 antes de desplegar |
| `npm run check` | Recorre las cuatro rutas y los PDFs buscando 404 y errores de consola |

## Editar el contenido

Todo el texto del CV vive en dos archivos, separado de la maquetación:

- [`src/content/es.ts`](src/content/es.ts) — español
- [`src/content/en.ts`](src/content/en.ts) — inglés

Ambos cumplen el tipo `ResumeData` de [`src/content/types.ts`](src/content/types.ts), de modo
que TypeScript avisa si una traducción se queda atrás respecto a la otra. Los campos
`period` son opcionales a propósito: mientras estén vacíos no se muestra ninguna fecha.

Busca `TODO` en esos archivos para ver los datos que faltan por rellenar.

## Formulario de contacto

Usa [Web3Forms](https://web3forms.com): sin backend, gratis, sin cuenta de pago.

1. Introduce tu correo en web3forms.com y copia la access key que llega por email.
2. En local: ponla en `.env.local` como `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. En GitHub: **Settings → Secrets and variables → Actions → Secrets** → nuevo secreto
   `WEB3FORMS_KEY`.

Si la key no está definida, el formulario se sustituye por un enlace `mailto:` en lugar de
fallar al enviar.

## Despliegue en GitHub Pages

1. Sube el repositorio a GitHub.
2. **Settings → Pages → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions**:
   - Secreto `WEB3FORMS_KEY` — la access key del formulario.
   - Variable `BASE_PATH` — **déjala vacía** si el repo se llama `<usuario>.github.io`;
     ponla como `/cv` si el repo se llama `cv`.
   - Variable `SITE_URL` — la URL pública completa, p. ej. `https://<usuario>.github.io`.
     Solo se usa para los metadatos al compartir el enlace.
4. Cada push a `main` construye el sitio, genera los dos PDFs y despliega.

### Comprobar una subruta antes de desplegar

El fallo clásico de GitHub Pages es que los assets den 404 cuando el sitio no vive en la
raíz. Para reproducirlo en local:

```bash
NEXT_PUBLIC_BASE_PATH=/cv npm run build:full && NEXT_PUBLIC_BASE_PATH=/cv npm run serve
```

## Movimiento e interacción

| Pieza | Dónde | Qué hace |
|---|---|---|
| Entrada al hacer scroll | [`useReveal`](src/hooks/useReveal.ts) + [`Reveal`](src/components/Reveal.tsx) | Un único `IntersectionObserver` compartido revela cada bloque una sola vez. El retardo escalonado sale de [`stagger`](src/lib/stagger.ts) |
| Índice lateral | [`useScrollSpy`](src/hooks/useScrollSpy.ts) + [`SideNav`](src/components/SideNav.tsx) | Resalta la sección en pantalla; con varias a la vista gana la que ocupa más |
| Borde que sigue al puntero | [`useSpotlight`](src/hooks/useSpotlight.ts) | Escribe la posición en variables CSS, sin re-renderizar en cada `pointermove` |
| Rol que se teclea | [`RoleRotator`](src/components/RoleRotator.tsx) | Máquina de estados con una transición por tic |
| Filtro de proyectos | [`Projects`](src/components/sections/Projects.tsx) | Las etiquetas salen del propio contenido |

Dos modos degradados que hay que mantener funcionando:

- **`prefers-reduced-motion`** — un único bloque al final de
  [`globals.css`](src/app/globals.css) apaga toda animación CSS, y
  [`usePrefersReducedMotion`](src/hooks/usePrefersReducedMotion.ts) detiene además lo que se
  anima desde JavaScript, que el CSS no puede parar.
- **Sin JavaScript** — los bloques con entrada animada arrancan visibles gracias a la clase
  `no-js` en `<html>`, que el script en línea retira al cargar.

## Cómo se genera el PDF

[`scripts/generate-pdf.mjs`](scripts/generate-pdf.mjs) levanta un servidor estático sobre
`out/`, abre `/print/` y `/en/print/` en Chromium y las imprime a A4. Se ejecuta **después**
de `next build`, así que los PDFs aparecen en `out/` justo antes del despliegue; los botones
de descarga son enlaces a esos archivos, no imports, y por eso no importa que no existan
mientras Next construye.

Las rutas de impresión **no** reutilizan los componentes de la web: usan
[`src/components/print/`](src/components/print/PrintResume.tsx), una maquetación aparte de
una sola columna. Un portafolio con tarjetas, filtros y animación no es lo que se quiere en
un CV impreso. Lo que sí comparten —y es lo que de verdad no puede desincronizarse— son los
datos: ambos leen el mismo `ResumeData`.

El formato de papel, los márgenes y los saltos de página se controlan desde el bloque
`@media print` de [`src/app/globals.css`](src/app/globals.css).

## Añadir un tercer idioma

1. Nuevo archivo en `src/content/` que cumpla `ResumeData`.
2. Registrarlo en `src/lib/site.ts` (`resumes`, `localePath`).
3. Dos route groups nuevos en `src/app/` (web e impresión), cada uno con su layout raíz —
   cada idioma necesita el suyo porque `lang` va en `<html>` y solo un layout raíz puede
   renderizarlo.
4. Añadir la ruta a `TARGETS` en `scripts/generate-pdf.mjs`.
