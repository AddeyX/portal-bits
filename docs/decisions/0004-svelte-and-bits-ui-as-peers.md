# Svelte and Bits UI as peers

## Status

Accepted

## Context

`npm run package` publishes the library's `.svelte` files. Those files import Bits UI. The consumer's Svelte compiler compiles them.

Svelte component libraries keep Svelte as a peer so the application and the library share one compiler and one runtime. Bits UI, Skeleton, Flowbite Svelte, and Melt do this. Compiling Svelte into `dist` would place a second runtime next to the application's copy.

Bits UI can be a normal dependency, the way Skeleton depends on Zag. The published files would still import `bits-ui`. Copying Bits UI source into this package would make this library own every Bits UI upgrade.

## Decision

Keep `svelte` and `bits-ui` as peer dependencies. The gallery installs both for local development.

A consumer installs `portal-bits`, `svelte`, and `bits-ui`.

## Consequences

The application and the library share one Svelte compiler and one Bits UI version. The consumer chooses those versions inside the peer ranges.

The install guide lists all three packages.
