import packageJson from '../../../package.json';

export { installCommands } from './consumer-source.js';

export const packageFacts = {
  name: packageJson.name,
  version: packageJson.version,
  peers: {
    svelte: packageJson.peerDependencies.svelte,
    'bits-ui': packageJson.peerDependencies['bits-ui'],
  },
};
