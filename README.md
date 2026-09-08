# CV — sitio web

CV personal bilingüe (español / inglés) publicado como sitio estático en GitHub Pages.
Genera el PDF descargable a partir de la propia web, así que la versión impresa nunca
se desincroniza de la versión en línea.

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

## Cómo se genera el PDF

[`scripts/generate-pdf.mjs`](scripts/generate-pdf.mjs) levanta un servidor estático sobre
`out/`, abre `/print/` y `/en/print/` en Chromium y las imprime a A4. Se ejecuta **después**
de `next build`, así que los PDFs aparecen en `out/` justo antes del despliegue; los botones
de descarga son enlaces a esos archivos, no imports, y por eso no importa que no existan
mientras Next construye.

Las páginas de impresión reutilizan exactamente los mismos componentes que la web. El
formato de papel, los márgenes y los saltos de página se controlan desde el bloque
`@media print` de [`src/app/globals.css`](src/app/globals.css).

## Añadir un tercer idioma

1. Nuevo archivo en `src/content/` que cumpla `ResumeData`.
2. Registrarlo en `src/lib/site.ts` (`resumes`, `localePath`).
3. Nuevo route group en `src/app/` con su propio layout raíz — cada idioma necesita el
   suyo porque `lang` va en `<html>` y solo un layout raíz puede renderizarlo.
4. Añadir la ruta a `TARGETS` en `scripts/generate-pdf.mjs`.
