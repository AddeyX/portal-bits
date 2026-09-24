# Verify a change

Run `npm test`, `npm run check`, and `npm run format:check`.

Run `npm run build` when the gallery build is in play. Run `npm run package` when the library package is in play.

`npm run test:consumer` is not a passing check yet. It calls `scripts/check-consumer.mjs`, and that file is not in the repo.

For a library or gallery change, also confirm the acceptance checks that apply:

1. The type check and the production gallery build pass.
2. The library package builds. A consumer can import the built components and styles without gallery code, once the consumer check exists.
3. Keyboard behavior covers dialog focus, popover dismissal, tooltip focus, and toggle-group arrow keys.
4. Representative components match measured type, color, radius, spacing, and shadow at a controlled viewport.
5. The gallery works at 390px and 1440px without unintended page overflow. Check one width between them.
6. Native semantics, accessible names, visible focus, contrast, reduced motion, and image fallbacks hold. Record any departure from the measurements.
7. Fidelity claims separate measured values from adaptations. Unmeasured dark values stay adaptations.
8. Docs near the change cover imports, essential props, state, the font fallback, evidence, and open limits.
9. Expanded and collapsed desktop chrome, and the mobile shell, keep navigation, focus, content width, and overlay stacking.
10. Rapid repeats, closing during entry, reopening during exit, keyboard triggers, and reduced motion still reach the final state. No animation leaves an invisible focus target.
