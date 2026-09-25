# Install the library

The package name is `portal-bits`. The public npm registry hosts it.

A consumer installs this package plus the peer dependencies `svelte` and `bits-ui`.

```sh
npm install portal-bits svelte bits-ui
```

```svelte
<script>
  import { Button, PortalShell } from 'portal-bits';
  import 'portal-bits/styles.css';
  import 'portal-bits/tokens.css';
</script>
```

`Button`, `PortalShell`, and the other components listed in `src/lib/index.ts` are the public components. `NavItem` is the shared type. Load `styles.css` and `tokens.css` once.

`npm run package` in this repository builds `dist/`. npm ships that build. Installing with `npm install github:AddeyX/portal-bits` leaves the consumer without `dist/`.
