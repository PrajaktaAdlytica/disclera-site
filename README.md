# Disclera

Premium demo website for Disclera, an EU-focused CSRD and ESG reporting workspace that turns company evidence into audit-ready sustainability disclosures.

## Experience

- Cinematic, video-led entry experience
- Scroll-based sustainability reporting story
- Product pages for Collect, Suppliers and Report
- Demo request and sign-in experiences
- Responsive desktop and mobile navigation
- Disclera logo, favicon, type system and visual assets

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` unless the terminal reports another port.

## Validation

```bash
npm run lint
npm run build
npm test
```

## Routes

- `/` - Main scroll-based story
- `/collect` - Evidence collection workspace
- `/suppliers` - Supplier collaboration workflow
- `/report` - Disclosure reporting workflow
- `/demo` - Tailored demo request
- `/sign-in` - Demo sign-in experience

## Demo status

This repository is currently a frontend demonstration. Forms and authentication use realistic interface states but are not connected to production services. See [`docs/demo-readiness.md`](docs/demo-readiness.md) for the current QA record and content caveats.
