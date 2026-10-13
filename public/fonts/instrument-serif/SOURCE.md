# Instrument Serif

Approved on 13 October 2026 as the heading face for the V2.2 visual direction (see `docs/v2/decisions/2026-10-13-visual-direction.md`). Instrument Sans remains the body and interface face.

## Source and licence

- Author: The Instrument Serif Project Authors.
- Official source: <https://github.com/Instrument/instrument-serif>
- Source commit: `65c0ef225f386a3c7e87570a4aa9cc0262c2fd81`.
- Upstream file: `fonts/webfonts/InstrumentSerif-Regular.woff2`.
- Local file: `instrument-serif-regular.woff2` (27,440 bytes).
- SHA-256: `ca21b99b0d6b88a0dc34cebfe48104611e5c7f8f92746bed26c37aa470174322`.
- The font binary is unchanged; only its filename is simplified.
- SIL Open Font License 1.1, preserved alongside the font in `OFL.txt`.

## Delivery decision

Only the upright Regular (400) is used. No italic was added.

The official web font carries the family's full character set. It has not been cut down to a Latin subset, because that needs a font tool the project does not have, and the whole file is 27 KB.

CSS uses `font-display: swap` with a `Georgia, "Times New Roman", serif` fallback. The file is preloaded because every page heading uses it above the fold. It is served from this site only: there is no third-party font hosting.
