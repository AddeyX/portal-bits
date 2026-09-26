# Deploy the gallery

Pushes to `main` publish the gallery to GitHub Pages. The workflow is `.github/workflows/deploy.yml`. Why that choice was made is in [ADR 0005](../decisions/0005-deploy-the-gallery-to-github-pages.md).

The site address is `https://addeyx.github.io/portal-bits/`. Pages serves a project site from `/portal-bits`, so the production build sets `paths.base` to that path. Local `npm run dev` and `npm run build` leave the base empty, and the gallery stays at `/`.

## 1. Select GitHub Actions as the Pages source

Open the repository Pages settings. Set the source to GitHub Actions.

The workflow cannot publish until that source is selected. This is a one-time setting.

## 2. Push `main`

```sh
git push origin main
```

GitHub reads the workflow from the default branch. The job checks out that push, installs dependencies, and runs `npm run build` with `BASE_PATH` set to `/` plus the repository name.

`@sveltejs/adapter-static` writes the site to `build/`, including a `404.html` fallback for addresses Pages does not already have as files. The deploy job uploads that directory.

A push to `main` does not publish the npm package. That stays on a GitHub Release. The package steps are in [Publish the package](publish-the-package.md).
