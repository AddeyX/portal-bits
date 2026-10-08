# Install the library

The package name is `portal-bits`. The public npm registry hosts it. This repository's version is 0.4.0.

A consumer installs this package plus the peer dependencies `svelte` and `bits-ui`. The supported ranges in this repository are `svelte@^5.33.0` and `bits-ui@^2.19.3`.

The install command includes `svelte` and `bits-ui`. A project that already uses Svelte should keep a `svelte` release inside the supported range, and add `bits-ui` in its supported range.

The command also installs `@lucide/svelte` for the icons imported by the copyable examples. Those imports need a direct dependency in your project.

```sh
npm install portal-bits svelte bits-ui @lucide/svelte
pnpm add portal-bits svelte bits-ui @lucide/svelte
yarn add portal-bits svelte bits-ui @lucide/svelte
bun add portal-bits svelte bits-ui @lucide/svelte
```

Load the styles once in the root layout. `styles.css` contains the component styling and already imports `tokens.css`. The layout also imports `tokens.css` so the token file stays visible. That second import is not a separate requirement.

```svelte
<script lang="ts">
  import 'portal-bits/styles.css';
  import 'portal-bits/tokens.css';
</script>
```

Render the first component in a page. The package ships no font files. `--portal-font` names Roobert, then Inter, then a system font. The gallery bundles Inter.

```svelte
<script lang="ts">
  import { Button } from 'portal-bits';
</script>

<Button variant="primary">Save changes</Button>
```

`Button`, `PortalShell`, and the other components listed in `src/lib/index.ts` are the public components. `NavItem` is the shared type.

`npm run package` in this repository builds `dist/`. npm ships that build. Installing with `npm install github:AddeyX/portal-bits` leaves the consumer without `dist/`.
