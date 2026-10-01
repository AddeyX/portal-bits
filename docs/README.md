# Documentation

## Rules

- One term, one meaning.
- One sentence, one idea.
- Explain a concept before the implementation.
- Put detailed knowledge near its subject.
- Link instead of duplicating.
- Record why an important decision was made.
- Delete stale documentation.
- The README is a map. Depth lives under `docs/`.

## Map

| Path                               | Job                                                   |
| ---------------------------------- | ----------------------------------------------------- |
| [architecture/](architecture/)     | System shape                                          |
| [concepts/](concepts/)             | What something means                                  |
| [guides/](guides/)                 | How to do a task                                      |
| [reference/](reference/)           | Exact facts                                           |
| [decisions/](decisions/)           | Why an important choice was made                      |
| [glossary.md](glossary.md)         | Canonical vocabulary                                  |
| [principles.md](principles.md)     | Product guardrails                                    |
| [dom-analysis.md](dom-analysis.md) | Measured values, reached from [reference](reference/) |
| [superpowers/](superpowers/)       | Design records and implementation plans               |

The [docs website implementation plan](superpowers/plans/2026-10-01-docs-website.md) maps the twelve reviewed documentation gaps to twelve commits, with acceptance checks and verification for each.
