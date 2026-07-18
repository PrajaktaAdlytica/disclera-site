# Disclera Demo Readiness

Reviewed: 2026-07-18

## Scope

This review covers the demo homepage, Collect, Suppliers, Report, Request demo and Sign in routes. It is a demo-readiness check, not a production compliance certification.

## Content review

- Product positioning is consistent across the homepage and product routes: evidence collection, supplier collaboration and audit-ready disclosure reporting.
- Navigation labels, CTAs and route names are consistent.
- Internal page and section links resolve in the rendered website.
- Company names, customer quotations, performance metrics and pricing are illustrative demo content.
- ISO 27001, EU-hosting and encryption language must be verified before public use.
- `Disclera Sp. z o.o.`, Warsaw contact details, social profiles, support addresses, privacy text and legal links are provisional.
- Privacy and Terms currently route to the homepage security section rather than dedicated legal pages.

## UX and responsive review

- Desktop entry: healthy at 1440 x 900.
- Mobile entry: healthy at 390 x 844.
- Product hero and demo flow: healthy at desktop width.
- No unintended horizontal overflow was found on the six tested routes.
- Navigation, mobile menu, product workflow controls, pricing controls, form validation and route CTAs were exercised during the broader design QA.

## Accessibility review

- Document language and route titles are present.
- Every tested route has a descriptive primary heading.
- Images have alternative text or are intentionally decorative.
- Form controls are associated with visible labels.
- Buttons and links have accessible names.
- No duplicate element IDs were found.
- Keyboard focus styling is present in the brand system.
- The homepage contains two `h1` elements because the new entry and original story hero intentionally coexist. This is acceptable for the demo but should be reduced to one primary `h1` before production.
- Automated contrast and screen-reader testing remain production follow-ups. The desktop video hero description should receive particular contrast review across every video frame.

## Performance review

- Production build completes successfully.
- The application serves optimized WebP artwork in rendered pages.
- Original PNG artwork is retained as source material but is not referenced by the website.
- The supplied background video is hosted remotely and is the largest expected first-view dependency. Production work should add a poster, delivery fallback and measured Core Web Vitals budget.

## Browser coverage

- Verified in the available Chromium-based in-app browser at desktop and mobile viewports.
- Safari and Firefox engine testing was not available in the current QA environment and remains a production follow-up.

## Validation commands

```bash
npm run lint
npm run build
npm test
```

## Result

Passed for a private startup demo. Not approved for public production claims or legal compliance without replacing the provisional content listed above.
