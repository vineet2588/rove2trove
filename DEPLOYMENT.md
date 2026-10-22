# Website and installable web app

Rove2trove has two deployment modes from one source tree:

- `npm start`: the Node server, with optional server-side OpenAI explanations.
- `npm ci && npm run build`: a self-contained static website/PWA in `dist/`, suitable for GitHub Pages. No credentials, backend files or environment variables are copied into this build. Gift matching runs on the device using the sample collection.

## GitHub Pages

Repository: `vineet2588/rove2trove`. The `main` branch triggers `.github/workflows/pages.yml`, which installs build dependencies, runs server tests, builds the static app, then publishes through GitHub Pages. Pages must use GitHub Actions as its publishing source. The expected repository-site URL is `https://vineet2588.github.io/rove2trove/`.

All application and asset paths are relative, so the app also works under the repository subdirectory. `npm run preview:pages` serves that same path locally at `http://127.0.0.1:4173/rove2trove/`.

## Phones and tablets

The website adjusts to portrait/landscape phones, tablets and larger screens. The same URL serves both the website and installable app. In supported browsers use **Install app** or **Add to Home Screen**. In Safari on iPhone/iPad use **Share → Add to Home Screen**. Installation UI varies by browser; the normal website remains available without installation. No app-store account or separate download is required.

The manifest declares standalone display, the approved brand artwork as app icons, and an orientation-independent layout. A service worker saves the static app and optimized product photos after the first successful online load. Sample gift discovery and browser-local saved treasures can then work offline; vendor websites need internet. Service-worker/app installation requires HTTPS or localhost. Browser storage restrictions and private browsing may disable caching or saving.

## Compatibility and scope

Test the responsive app using `scripts/responsive-pwa-check.mjs` with Playwright browser engines installed. The QA matrix covers Chromium, Firefox and WebKit at 320, 390, 600, 768, 820, 1024 and 1366 pixel widths, with full questionnaire, gift filtering, photos, saved treasures, shopping dialogs and install-help checks. Automated tests represent those engines and viewport sizes, not every browser release or a physical-device certification. Installation and storage support depend on the browser/OS.

GitHub Pages has no Node/API runtime. The public version is explicitly a demo with illustrative gift prices, AI-generated illustrative photos and unverified stock/delivery. Keep OpenAI keys only in `.env` for the Node deployment. Live AI or retailer APIs require a separately deployed server and appropriate production controls.

## Updating

Edit source under `public/` and `server/`, run tests and `npm run build`, then push to `main`. The workflow rebuilds optimized WebP photos and publishes. `dist/` and `.env` are ignored. Service-worker cache versions are generated from the build content so a new build replaces old caches. Generated images remain attributed to the local prompt record in `public/assets/photos/PROMPTS.md`.
