# Huzefa Hussain portfolio

Static HTML, CSS and JavaScript, published by the existing GitHub Pages deployment from `master` at the repository root. No server required. Lenis is bundled locally for eased scrolling.

## Edit and build

- Profile, services and section copy: `src/index.html`.
- Project content: `content/projects.json`.
- Public showcases and application entry points: `content/live-systems.json`.
- Base styling: `assets/portfolio.css`. Motion edition: `assets/motion.css`, `assets/motion.js`.
- Run `npm ci` before the first build. The pinned Lenis module, CSS and MIT license are copied into `assets/` by the build; no remote script CDN is used.
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
- Motion defaults to the system's `prefers-reduced-motion` setting. The visible Motion button lets the visitor explicitly choose full or reduced motion and saves that preference locally. System preference changes reset the choice. Reduced motion cancels active animations and disables eased scrolling.
- The first-screen entrance, canvas wireframe, CSS orbit, floating layers, marquee and section reveals share this control. Canvas rendering pauses while the hero is offscreen or the tab is hidden. Mobile uses a smaller mesh and native touch scrolling.
- Project images have a small scroll-linked depth offset. Navigation and normal scrollbar and keyboard scrolling remain available, including a static no-JavaScript page.
