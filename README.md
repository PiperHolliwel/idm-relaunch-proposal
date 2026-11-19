# idm.at Relaunch: proposal page

One static page for IDM's team: the offer, editor screens (slider), comparison tables and a PDF download.
No build step, no external scripts or fonts (nothing is loaded from Google or other third parties).

## Files
- `index.html`: the page (all text lives here)
- `styles.css`: layout, phone layout and the print/PDF layout
- `script.js`: the screen slider (arrows, dots, keyboard, swipe)
- `assets/`: editor screens (source mockups: `../docs/mockups/`)
- `idm-relaunch-proposal.pdf`: the downloadable PDF, generated from the page
- `_headers`: tells Cloudflare Pages to keep the page out of search engines

## After changing the text: regenerate the PDF
Run from this folder:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf="$PWD/idm-relaunch-proposal.pdf" "file://$PWD/index.html"
```

Keep the offer Claude Doc and this page in sync when prices change.

## Publish on Cloudflare Pages (free, about 10 minutes)
1. GitHub Desktop: create a new **private** repository (for example `idm-relaunch-proposal`) and put the contents of this folder in it. Publish it to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repository.
3. Build settings: framework preset **None**, build command empty, output directory `/`.
4. Project name decides the address: `idm-relaunch` → `https://idm-relaunch.pages.dev`.
5. Optional password: Cloudflare Zero Trust → Access → add an application for that address and allow the IDM team's emails (one-time code by email, free up to 50 users).
6. Every push from GitHub Desktop updates the page automatically.

## Or publish on Bunny.net (European, about €1/month)
1. Bunny dashboard → Storage → Add Storage Zone (region Falkenstein, Germany) → upload the files of this folder.
2. CDN → Add Pull Zone → origin type Storage Zone → pick the zone. You get `https://<name>.b-cdn.net`.
3. Add a custom hostname if you want your own subdomain.
4. Bunny does not read `_headers`; add an Edge Rule "Set response header X-Robots-Tag: noindex, nofollow".
