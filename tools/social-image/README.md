# Social image

`index.html` is the source for `public/images/og-default.jpg`, the one image every page uses for `og:image` and `twitter:image`.

It is 1200 x 630, in the V2.2 style: the page background, the TD mark, the serif headline, a short amber rule and "Teesside Digital, Hartlepool". It loads the site's own fonts and mark by relative path, so it must stay two folders below the repository root.

## Rebuilding the image

No project dependency is needed. Open `index.html` in a Chromium browser at a 1200 x 630 viewport and save a screenshot of the page as a JPEG, quality about 90, to `public/images/og-default.jpg`.

The current file was made on 13 October 2026 with a headless Microsoft Edge screenshot, driven by a script kept outside the repository.

This folder is not part of the built site.
