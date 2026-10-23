# Rove2trove — Search to Treasure

A mobile-first, local gift-discovery prototype. All source stays in this project.

## Run

Requires Node.js 22 or newer. No runtime packages or install step needed.

```sh
npm start
```

Open http://127.0.0.1:3000. Run checks with `npm test`.

## Optional AI

Copy `.env.example` to `.env`, add your OpenAI API key, then restart. Never put a key in `public/` or commit `.env`. `OPENAI_MODEL` defaults to `gpt-4o-mini` and can be changed to a Responses API model supporting strict structured outputs. The server uses the [Responses API and structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs). It sends only the validated brief and selected sample gift names/interests, requests `store: false`, and validates returned IDs and text lengths. No personal names, contacts or browser shortlist are sent. Account-level OpenAI retention policies still apply.

Matching, age gates, gift type and budget constraints are deterministic. AI optionally personalizes explanations; it cannot create retailer offers or alter prices. Missing keys, timeouts, refusals, invalid output and upstream failures fall back to labeled demo explanations. Live authenticated API behavior requires your own key and has not been verified. No credentials are included.

## Experience

Three-step questionnaire covers age, optional gender, relationship, occasion, 18 interests, multiple personality traits, country and budget currency, budget, gift type and desired delivery date. Recommendations include reasons, price sorting, type filters and a persistent browser shortlist. Empty states, errors, keyboard focus, responsive layouts and reduced motion are supported. Age affects collection eligibility; gender is optional and is not used to stereotype choices. Sample prices use fixed illustrative currency factors, not current exchange rates. Desired delivery date is recorded, never a promise; every idea requires merchant verification.

## Boundaries and security

- No live inventory feeds, in-app retailer search results, checkout or verified shipping. All items and prices are sample ideas. Gift cards use locally stored AI-generated photorealistic images, labeled as illustrative; these are not photographs of verified merchant products. The hero remains an original SVG composition.
- The supplied approved logo is preserved at `public/brand/rove2trove-approved.png` and displayed without distortion in the header and footer. `public/assets/logo.svg` is an editable approximation used only as a small favicon, not the original master.
- Shortlist lives in localStorage on this browser; no account or cross-device synchronization. Questionnaire remains in memory. Clearing browser storage removes saves.
- Server serves only an explicit public file allowlist. Environment files and server source are inaccessible over HTTP. CSP, same-origin checks, bounded bodies, validated enums, input limits, fixed upstream URL, 12-second timeout and a per-IP hourly limit are included. No client-provided prompts or upstream URLs.
- Local binding is the default. Before public deployment add HTTPS, authenticated access, shared rate limiting/spend limits and appropriate privacy terms. The in-memory limiter is per process; no proxy headers are trusted.
- `server/retailers.js` defines the future retailer adapter contract. Add verified, authorized merchant feeds with freshness, currency and URL checks before showing offers. There are no affiliate links.

## Shopping destinations

Click a suggested gift, its title or “Explore places to buy” to open multiple shopping destinations. Saved treasures also support this after reload. The panel defaults to the country used for that recommendation and allows changing the shopping country independently. Fixed, category-aware search links cover Amazon regional storefronts, Flipkart, Myntra, Nykaa, eBay, Etsy and Noon; experience ideas link to GetYourGuide and Viator searches. Merchant destinations are generated from fixed queries and controlled HTTPS URLs in `public/shopping.js`, never AI output or saved URLs.

These are outbound search/category links for similar gifts, not fetched listings or verified offers for the pictured sample. No availability, exact match, pricing or delivery is promised. Some retailers restrict automated access, change routes, require sign-in or do not serve all destinations; verify details directly. Links open a new tab; app handoff depends on the retailer and device. No custom app deep links or automatic purchasing. Browser checks validate link construction and panel interactions, without opening external checkouts.

## Files

`public/` contains the app and editable SVG artwork. `server/` contains matching, input validation, optional OpenAI integration and retailer interfaces. `test/` covers API behavior and browser flows.

### Browser verification

`scripts/browser-check.mjs` exercises desktop and mobile flows with Playwright. It uses the bundled Codex runtime by default; set `PLAYWRIGHT_MODULE` to your installed Playwright module path elsewhere, and `PLAYWRIGHT_BROWSERS_PATH` if using a custom browser cache. Browser tooling is only needed for this optional verification, not to run the app.

## Global country selection and photos

Both destination selectors include all 249 ISO 3166-1 countries and territories, with English display names. Country codes follow the [ISO country code framework](https://www.iso.org/iso-3166-country-codes.html). Budget currency is a separate selection (INR, USD, GBP, AED, EUR); other destinations default to USD unless a supported local default exists. Conversion factors remain illustrative. Global country selection does not imply retailer shipping coverage. Existing regional storefronts remain available; other destinations use international marketplace searches with instructions to check shipping/import costs.

Photorealistic gift assets are saved in `public/assets/photos/`; `PROMPTS.md` records their ImageGen prompt template and subjects. No remote image service is required at runtime.

Recommendation filters operate on every eligible sample idea. Age, budget and explicit gift-type preferences still apply, so a category can correctly be empty when those constraints exclude its samples. Sort controls include best match, name A–Z/Z–A and price low-to-high/high-to-low. Shopping panels have a sticky top-right close button and a bottom return button; closing preserves the current suggestions, filter and sort order.

## Website and mobile/tablet app

A GitHub Pages build and installable Progressive Web App are included. Run `npm ci`, `npm run build`, then `npm run preview:pages` to preview the static version. It works under `/rove2trove/` as well as other directory-based hosts. The build uses compressed WebP photos, a web app manifest, brand icons and an offline service worker. The public version uses on-device sample matching; optional OpenAI calls remain in the separate server version. See [deployment and device instructions](DEPLOYMENT.md).

## Indian stores, designers and watch labels

Indian gift shopping now includes a curated category-matched directory of Swadesh, Kashmir Box, Taroob, Mortantra, Mora Taara, ellementry, Studio Coppre, Nurserylive, BINNI, Nicobar, Ogaan, Titan, Argos Watches and Jaipur Watch Company. Users can choose Indian brands/independent stores, designers or marketplaces; edit their shopping budget/currency; and optionally include higher-budget stores. The original brief budget is carried into new recommendations and saved treasures. Editorial browsing tiers are clearly distinguished from real prices. Validated collection filters receive a requested INR price cap where supported; homepage-only browsing links remain clearly labeled. See [official sources and matching policy](STORE_SOURCES.md).
