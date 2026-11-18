# Portfolio Testing Report

Repository: `jaspreetsinghdhiman/jaspreetsinghdhiman.github.io`
Branch: `seo-portfolio-content-fix-nov-2026`
Date: 18 November 2026

## Static checks on the feature branch

| Check | Result | Evidence / scope |
|---|---|---|
| Homepage title, description and canonical | PASS | Present on `index.html` |
| Work page SEO metadata | PASS | Unique title, description, canonical, Open Graph and Twitter metadata |
| Blog page SEO metadata | PASS | Unique title, description, canonical, Open Graph and Twitter metadata |
| H1 count | PASS | Exactly one H1 on each of the three modified HTML pages |
| Work project cards | PASS | Six cards: Budget Ledger, Habit Grid, PulseTrack, TaskFlow, MarkStudio and WeatherNow |
| Work category filters | PASS | Finance, Productivity and Tools controls match card category values |
| Homepage project cards | PASS | Same six projects and matching category values |
| Blog article links | PASS | Ten static links to existing individual article pages |
| Blog category filters | PASS | Frontend, Performance and AI categories match article data attributes |
| Structured data | PASS | CollectionPage / ItemList JSON-LD added to Work and Blog pages |
| Sitemap | PASS | 34 URLs; all 34 map to tracked root-level files |
| Local references | PASS | Relative href/src references on the three modified pages resolve to tracked files |
| Sitemap freshness | PASS | Work and Blog entries updated with 2026-11-18 lastmod |

## Not measured / not tested

- Lighthouse Performance, Accessibility, Best Practices or SEO scores.
- Browser rendering at desktop, tablet and mobile sizes.
- Keyboard and screen-reader interaction testing.
- Form delivery or interactive project behaviour in a live browser.
- Deployed GitHub Pages behaviour after merge.
- Google Search Console indexing, clicks, impressions, CTR or ranking changes.
- Field Core Web Vitals.

Static repository checks do not replace browser, deployment or Search Console testing.

## Publishing status

This report describes the feature branch only. The changes are not live until the pull request is merged and GitHub Pages finishes deploying.
