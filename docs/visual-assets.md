# Disclera Visual Assets

Production assets for the approved Living Ledger website direction live in
`public/visuals`. Each illustration is exported as a transparent PNG master and
an optimized transparent WebP for the website.

| Asset | Intended use | Dimensions | Preferred file |
| --- | --- | ---: | --- |
| Living Ledger | Hero focal object | 1254 x 1254 | `/visuals/living-ledger-hero.webp` |
| Evidence collage | Problem and evidence intake sequence | 1448 x 1086 | `/visuals/evidence-collage.webp` |
| Supplier landscape | Supplier network panorama | 1774 x 887 | `/visuals/supplier-europe-landscape.webp` |
| Disclosure stack | Report and assurance section | 1448 x 1086 | `/visuals/disclosure-stack.webp` |
| Security aperture | Security and trust section | 1448 x 1086 | `/visuals/security-aperture.webp` |

## Implementation Notes

- Render the WebP files by default and retain the PNGs as lossless masters.
- Preserve each image's aspect ratio; do not stretch the assets.
- Add all product names, evidence labels, security claims, and status copy as
  accessible HTML rather than baking text into the artwork.
- Use empty alt text when an asset is decorative. Use a concise functional alt
  description only when the illustration carries information not present in the
  adjacent copy.
- Source generations are retained under `work/visual-assets/source`.
- The warm-background QA contact sheet is at
  `work/visual-assets/qa-contact-sheet.jpg`.
