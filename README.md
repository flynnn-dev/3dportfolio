# John Lorens — 3D Developer Portfolio

A scroll-driven developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP ScrollTrigger, and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize content

Edit `data/portfolio.ts` to update:

- Technologies
- Projects
- Journey timeline
- Email / GitHub / LinkedIn links

The starter project buttons intentionally point to the contact section until real GitHub/demo URLs are added.

## Contact form

The form includes client and server validation. To enable live email delivery, create `.env.local` from `.env.example` and add Resend credentials:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL="Portfolio <your-verified-domain@example.com>"
```

Without these values, the API returns a clear configuration message instead of pretending a message was sent.

## Performance choices

- The 3D workspace is procedural, avoiding large model downloads by default.
- R3F is dynamically imported so WebGL code is client-only.
- Adaptive DPR uses Drei `PerformanceMonitor`.
- Mobile reduces particle count and antialiasing cost.
- `prefers-reduced-motion` disables major motion.
- Content remains normal semantic HTML over the fixed 3D scene.

## Replacing procedural objects with GLTF

For production art direction, replace individual procedural groups in `components/scene/SceneWorld.tsx` with compressed `.glb` models. Put them in `public/models/`, run Draco/Meshopt compression, and lazy-load them with `useGLTF` + `Suspense`.

## Stack compatibility

This project targets React 19 / React Three Fiber 9 and the Next.js 16 line. The Next.js config transpiles `three` for ecosystem compatibility.
