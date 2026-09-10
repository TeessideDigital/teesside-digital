# Instrument Sans

Approved as Teesside Digital V2's primary family after desktop and compact specimen review. The initial system uses one family. IBM Plex Sans and Source Sans 3 remain historical evaluation alternatives only.

## Source and licence

- Author: The Instrument Sans Project Authors.
- Official source: <https://github.com/Instrument/instrument-sans>
- Source commit: `7fa22308a3d0c94ee2b3cd537a1196b65db34a3e`.
- Upstream file: `fonts/webfonts/InstrumentSans[wdth,wght].woff2`.
- Local file: `instrument-sans-variable.woff2` (88,784 bytes).
- The font binary is unchanged; only its filename is simplified.
- SIL Open Font License 1.1, preserved alongside the font in `OFL.txt`.

## Delivery decision

The official upright variable WOFF2 covers weights 400-700 and width 75-100. The site uses normal width and weights 400, 500, 600 and 700. No italic or additional family was added.

The upstream static Regular, SemiBold and Bold WOFF2 files total 105,792 bytes. Including Medium, which existing UI also uses, totals 141,372 bytes. The single variable file is smaller than either set and needs only one request.

CSS uses `font-display: swap` with `system-ui, sans-serif` fallback. The single file is preloaded because the identity, main heading and reading text use it above the fold. There is no third-party font hosting or Google Fonts production connection.

Future SiteIndex typography may refine size, weight, tracking and line height. This font selection does not approve those metrics or start Implementation 2.
