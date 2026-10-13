# IBM Plex Mono

Approved on 13 October 2026 for small uppercase labels in the V2.2 visual direction (see `docs/v2/decisions/2026-10-13-visual-direction.md`).

## Source and licence

- Author: IBM Corp. "Plex" is a Reserved Font Name.
- Official source: <https://github.com/IBM/plex>
- Source commit: `39276912b05f700ee1dd491950c35d8697214208`.
- Upstream files, from `packages/plex-mono/fonts/split/woff2/`:
  - `IBMPlexMono-Regular-Latin1.woff2`, kept here as `ibm-plex-mono-400-latin1.woff2` (17,544 bytes; SHA-256 `e8993d946649b9d01abb1ed06d574b19d8ea3e66b5c3948602db335c44c18e56`);
  - `IBMPlexMono-Medium-Latin1.woff2`, kept here as `ibm-plex-mono-500-latin1.woff2` (17,868 bytes; SHA-256 `41201b658a328b9d00368215c2f1102770f80b15952ab82631e4006255e6365d`).
- The font binaries are unchanged; only their filenames are simplified.
- SIL Open Font License 1.1, preserved alongside the fonts in `LICENSE.txt`, copied from `packages/plex-mono/LICENSE.txt`.

## Delivery decision

These are IBM's own Latin 1 subset files, so no subsetting was done here. Weights 400 and 500 are the two the design uses. No italic was added.

CSS uses `font-display: swap` with a system monospace fallback. Neither file is preloaded: labels are small, and a late swap moves little. Both are served from this site only.
