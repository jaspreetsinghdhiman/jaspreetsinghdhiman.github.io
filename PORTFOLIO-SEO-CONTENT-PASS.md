# Portfolio SEO and case-study consistency pass — 23 November 2026

Repository: `jaspreetsinghdhiman/jaspreetsinghdhiman.github.io`
Website: https://jaspreetsinghdhiman.github.io/
Branch: `portfolio-seo-content-pass-nov-2026`

## Changes made

- Standardised navigation across all six project case studies to match the current portfolio structure: Home, Work, About, Experience, Blog and Contact.
- Removed the outdated “Skills” navigation label. The About page remains the destination for profile and skills information.
- Replaced the generic social-image alternative text on the four older case studies with descriptions that identify the actual project interface.
- Added complete Twitter/X card title, description and image metadata where it was missing.
- Added author, Open Graph article metadata, image dimensions and BreadcrumbList structured data to the MarkStudio and WeatherNow case studies.
- Added an About-page GitHub panel linking directly to the owner's verified GitHub profile and three pinned public repositories. The contribution calendar remains on GitHub itself, so the portfolio links to the authoritative live graph instead of embedding an unofficial third-party counter or fabricating activity.
- Marked the six interactive demo-only pages `noindex,follow` while keeping them linked from the Work page and their indexable case studies.
- Removed those six thin app-shell URLs from the XML sitemap and refreshed the six case-study `lastmod` dates. The case studies remain the search-facing project pages.
- Preserved the existing case-study content, project demos, limitations, and honest personal-project disclosures.

## Case-study content quality

The six case studies describe the project purpose, UX decisions, implementation, technologies, responsive behaviour, technical decisions, testable features, limitations and possible future improvements. They identify the work as independent portfolio demonstrations rather than commissioned client projects. No client outcomes, revenue, user counts, performance scores or business metrics have been invented.

## Findings to address in a later performance/content pass

- Main portfolio pages still request DM Sans, Instrument Serif and Unbounded from Google Fonts. Some pages also load icon and animation libraries from third-party CDNs. A local-hosting migration should preserve the existing visual identity and verify font licences, weights, and fallback behaviour before removing the CDN versions.
- The six case studies currently share the general portfolio Open Graph image.
- Demo pages remain accessible to visitors through the Work page and case studies; the noindex directive is intended to focus search visibility on their fuller explanatory case studies, not to hide the demos from users. Project-specific raster social cards could improve link previews; the existing SVG interface previews should not be assumed to work consistently as social images.
- Lighthouse/PageSpeed scores, field Core Web Vitals, Search Console indexing, and actual social-platform preview rendering have not been measured in this pass.
- Blog claims that depend on changing product or service details should be periodically rechecked against primary sources and given visible source links where appropriate.
- Do not add fabricated experience details, testimonials, project impact figures, or GitHub repositories. Add them only when the owner supplies verifiable information.

## GitHub profile review

Public profile checked at https://github.com/jaspreetsinghdhiman/. The profile has a profile README, four public repositories, three pinned repositories (the portfolio source, `ring-ai`, and `stack`), one follower, one following, three stars and two achievements at the time of review. The README lists only four of the six portfolio projects, so it is now out of sync with the website. An attempt to update that separate profile README through the connected GitHub integration was rejected with a permissions error; no profile repository content was changed. The portfolio itself links to the official profile and the three pinned repositories.

The contribution graph is GitHub's authoritative record and may include only eligible contributions. It is not recreated as a made-up graphic or third-party widget. GitHub explains that commits must use an email associated with the account and be pushed to the default or `gh-pages` branch, among other criteria.

## Verification

- GitHub Actions static SEO/local-reference audit and Chromium mobile/desktop smoke tests are configured to run on this pull request.
- This report records repository changes only. It does not claim a live deployment or improved Google rankings.
