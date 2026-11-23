# Portfolio quality pass — 23 November 2026

Repository: `jaspreetsinghdhiman/jaspreetsinghdhiman.github.io`
Target website: https://jaspreetsinghdhiman.github.io/
Working branch: `portfolio-quality-pass-nov-2026`

## Changes in this pass

- Added a visible-on-focus skip link to the homepage, About, Work, Experience, Blog and Contact pages.
- Made each page's primary content section programmatically focusable so keyboard users can use the skip link.
- Added a consistent high-contrast `:focus-visible` treatment for links, buttons, fields and other focusable controls.
- Added a site-wide reduced-motion override for CSS animations and transitions, complementing the existing motion script's reduced-motion check.
- Added a dependency-free Python static audit for sitemap URLs, canonical URLs, page titles, meta descriptions, H1 presence and local href/src references.
- Added a GitHub Actions workflow to run the static audit on relevant pull requests and main-branch changes.

## Findings retained for the next pass

- The contact form intentionally opens the visitor's email application; it does not submit to a server or store messages. Its confirmation must continue to say that the visitor still needs to press Send in their email app.
- External fonts, analytics, icon and animation libraries are still loaded from third-party CDNs on some pages. A local-asset migration needs a separate dependency and licence review before changing those imports.
- Project cards and case studies should only gain repository/demo URLs after the real destinations are confirmed. No placeholder links or invented performance results were added.
- Experience dates, employers, responsibilities and project outcomes should only be expanded using verified facts supplied by the portfolio owner.

## Verification status

- Confirmed by repository reads: all six primary pages contain one skip link and a focusable `#top` main section; the shared stylesheet contains focus-visible and reduced-motion rules.
- GitHub Actions static audit: PASS. It checked 29 sitemap URLs / HTML pages; titles, descriptions, canonicals and H1 presence passed, and all checked local href/src references resolved.
- Live mobile rendering, keyboard/screen-reader testing, Lighthouse scores, deployed Core Web Vitals and Search Console indexing have not yet been measured.

## Publishing

This is a review branch. The live GitHub Pages site is unchanged until the pull request is merged and the Pages deployment completes.
