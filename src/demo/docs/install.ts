import packageJson from '../../../package.json';

const packages = 'portal-bits svelte bits-ui';

export const packageFacts = {
  name: packageJson.name,
  version: packageJson.version,
  peers: {
    svelte: packageJson.peerDependencies.svelte,
    'bits-ui': packageJson.peerDependencies['bits-ui'],
  },
};

export const installCommands: Record<'npm' | 'pnpm' | 'yarn' | 'bun', string> = {
  npm: `npm install ${packages}`,
  pnpm: `pnpm add ${packages}`,
  yarn: `yarn add ${packages}`,
  bun: `bun add ${packages}`,
};
