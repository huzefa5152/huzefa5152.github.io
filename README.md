# Huzefa Hussain portfolio

Static HTML, CSS and JavaScript, published by the existing GitHub Pages deployment from `master` at the repository root. No server or runtime dependencies.

## Edit and build

- Profile, services and section copy: `src/index.html`.
- Project content: `content/projects.json`.
- Visual styling and motion: `assets/portfolio.css`, `assets/portfolio.js`.
- Run `npm run build` to regenerate root `index.html` and the standalone production output in `dist/`.
- Run `npm run check` for asset, section and Developer Mode checks.
- Preview `dist/` with a static server, for example `python -m http.server 4173 --directory dist`.

Commit the generated root HTML along with source changes. GitHub Pages continues to publish the repository root, so no deployment settings or Actions workflow were replaced.

## Preserved portfolio

The original terminal lives at `/developer/`, using the original `/css/` and `/js/` assets. Resume and cover-letter routes remain at their original paths. A return link and absolute document links are the only intentional terminal changes. The local branch `checkpoint/original-portfolio` preserves the original Git state.

## Visuals and content

- Portraits are optimized copies of supplied photographs. CSS layers, perspective and subtle parallax provide **2.5D** treatment; no likeness model was generated.
- `architecture.webp` is an abstract asset generated through Higgsfield FLUX.2. It does not depict an application.
- MyApp and InvoicePro previews are explicitly labelled illustrations with fictional data. Ledger POS uses an actual screenshot captured from its browser-only demo, labelled as fictional PrimeMart data.
- MyApp case study is based on its public README, project file and invoice controller. Ledger POS and InvoicePro descriptions were checked against authorized private READMEs and representative FBR / ledger source. No private source, credentials or client identities are included.
- Personal email and LinkedIn come from the existing portfolio. Contact uses a working `mailto:` link.
- Motion responds to `prefers-reduced-motion`, including changes during the session. Native scrolling and a static no-JavaScript page remain available.
