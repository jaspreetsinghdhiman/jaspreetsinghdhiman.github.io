# Portfolio Testing Report

Tested locally against the supplied ZIP after edits.

| Check | Result | Evidence / scope |
|---|---|---|
| ZIP extraction and root structure | PASS | Existing root-level GitHub Pages layout retained |
| HTML parsing | PASS | 26 HTML files parsed with Python's HTML parser |
| H1 count | PASS | One H1 on each of the 25 user-facing HTML pages; Google verification file is exempt |
| Title uniqueness | PASS | No duplicate titles among pages with titles |
| Meta description uniqueness | PASS | No duplicate descriptions among pages with descriptions |
| Canonical uniqueness | PASS | No duplicate canonical URLs detected |
| Open Graph / Twitter metadata | PASS | Present on all 25 user-facing pages |
| JSON-LD syntax | PASS | All extracted `application/ld+json` blocks parsed with Python JSON |
| Sitemap XML | PASS | Parsed successfully; 24 URLs, all map to files in project |
| Local HTML links and fragments | PASS | No missing local href/src references or unresolved in-page fragments detected by static scan |
| Local stylesheet links | PASS | No missing local stylesheet references detected |
| Image alt attributes | PASS | All 4 HTML `<img>` elements have alt attributes |
| Duplicate HTML IDs | PASS | No duplicate IDs detected by static scan |
| JavaScript syntax | PASS | All inline JavaScript blocks and local `.js` files passed `node --check` |
| New profile image formats | PASS | JPG and WebP decoded and written as their actual formats |
| Portrait fallback | PASS | Homepage picture uses WebP source and JPG fallback |
| Removed asset references | PASS | Deleted candidates had no references in project text/source; favicon PNG was byte-identical to retained icon-512 PNG |

## Not measured / not tested

- Lighthouse Performance, Accessibility, Best Practices, or SEO scores.
- Real browser rendering at desktop/tablet/mobile widths.
- Keyboard interaction and screen-reader behavior.
- Actual mobile menu, form submission, external APIs, or interactive project behavior in a browser.
- Deployed GitHub Pages behavior after upload.
- Live Google Search Console indexing, sitemap fetch, search queries, or ranking.
- Live Core Web Vitals / field data.

These checks require a browser or live deployment/account access. Static source checks are not substitutes for those tests.
