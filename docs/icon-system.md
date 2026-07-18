# Disclera Icon System

Disclera uses Lucide for interface icons and official brand glyphs from
React Icons for social links. Icons inherit `currentColor` so they follow the
approved Espresso, Sage, Pistachio, and Paper palette.

## Sizing

| Context | Size | Stroke |
| --- | ---: | ---: |
| Compact dashboard UI | 12–14px | 1.8px |
| CTA and inline link | 16px | 1.8px |
| Navigation and controls | 18–20px | 1.8px |
| Feature or empty state | 24px | 1.8px |

Icon-only controls must provide at least a 44px interaction target in the full
website UI. The miniature dashboard preview intentionally uses smaller targets
because it is a non-interactive product illustration.

## Core Inventory

- CTA: Arrow Up Right, Arrow Right, Arrow Down
- Navigation: Menu, Close, Chevron Down, Chevron Right
- Workspace: Overview, Database, Users, File, Settings, Search
- Status: Check, Check Circle, Alert, Shield Check, Help
- Actions: Upload, Download, Send, More, Plus, Minus, Play
- Contact: Mail, Map Pin, External Link
- Social: LinkedIn, X, YouTube

## Usage Rules

- Use icons to clarify actions, not decorate headings.
- Pair unfamiliar icon-only controls with an accessible label and tooltip.
- Keep one stroke weight within the same interface surface.
- Use Sage for active and positive states, not for every icon.
- Do not mix text symbols, emoji, filled stock icons, and Lucide outlines.
- Social icons retain their official silhouettes but use Disclera colors.

The implementation lives in `app/components/icons.tsx`.
