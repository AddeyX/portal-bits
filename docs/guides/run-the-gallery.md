# Run the gallery

Install dependencies with `npm install`.

Start the gallery with `npm run dev`. Vite binds to `127.0.0.1`. The dev server mounts a local annotation inspector. It is absent from production builds. Set `VITE_WORKSPACE_ROOT` when the copied paths should point somewhere other than the repo root.

`npm run build` builds the gallery. `npm run preview` serves that build on `127.0.0.1`. A local build leaves the site at `/`. The hosted gallery is [deployed from `main`](deploy-the-gallery.md).
