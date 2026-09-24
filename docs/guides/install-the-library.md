# Install the library

The package name is `@addeyx/portal-bits`. GitHub Packages hosts it at `npm.pkg.github.com`.

A consumer installs this package plus the peer dependencies `svelte` and `bits-ui`.

GitHub Packages requires a token to install, including for this public package. The token needs `read:packages`.

```ini
@addeyx:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN
```

```sh
npm install @addeyx/portal-bits svelte bits-ui
```

```svelte
<script>
  import { Button, PortalShell } from '@addeyx/portal-bits';
  import '@addeyx/portal-bits/styles.css';
  import '@addeyx/portal-bits/tokens.css';
</script>
```

`Button`, `PortalShell`, and the other components listed in `src/lib/index.ts` are the public components. `NavItem` is the shared type. Load `styles.css` and `tokens.css` once.

`npm run package` in this repository builds `dist/`. GitHub Packages ships that build. Installing with `npm install github:AddeyX/portal-bits` leaves the consumer without `dist/`.
