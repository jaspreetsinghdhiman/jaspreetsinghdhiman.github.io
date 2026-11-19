# Punjab Heritage — Image and reference audit

Audit date: 2026-11-17  
Audited ref: main at `13133c1e5626a57af28e829ffd7cda014ce1d2a9`  
Scope: 25 unique project HTML/CSS/JS/JSON files were inspected. Three HTML files (`about.html`, `charda-punjab.html`, and `contact.html`) were not included in this pass, so this is not a complete site-wide certification.

## Confirmed findings

### Broken source-reference links
The following HTML entries contain malformed source links. These are links, not the image file paths themselves.

| File | Location | Broken href |
|---|---:|---|
| `index.html` | line 28 | `#),_2015.jpg` |
| `gallery.html` | line 9 | `#),_2015.jpg` |
| `gallery.html` | line 10 | `#).jpg` |
| `contribute.html` | line 1 (single-line HTML) | `#),_2015.jpg` |
| `objects.html` | line 18 | `#).jpg` |

The intended documentary source pages have now been identified:
- Phulkari embroidery in Rajpura: https://commons.wikimedia.org/wiki/File:Women_embroidering_Phulkari_in_Rajpura,_Punjab_(India),_2015.jpg
- Mud houses in Mannan: https://commons.wikimedia.org/wiki/File:Mud_houses,_Mannan,_Punjab_(2022).jpg

Both source pages state CC BY-SA 4.0. Reuse requires appropriate attribution, a licence link, and share-alike compliance where applicable. These source URLs are references only; their binary image files have not been imported.

### Illustration / documentary-photo mismatch
The gallery and contribution page currently render local SVG illustrations while some alt text and captions describe them as documentary photographs and credit photographers. An SVG illustration is not the cited photograph. These entries must not be represented as documentary photo evidence. When the real files are acquired, replace the SVGs with the exact verified photographs and preserve required attribution. Until then, label the artwork as illustrative or remove the photo-specific credit/caption.

The homepage manifesto uses `plough-field.svg` as a CSS background while its caption credits a Phulkari photograph. That is also a subject/credit mismatch and must be corrected before the photo phase is called complete.

## Scan notes
- No Wikimedia/Unsplash/Pexels remote image URLs were found in the files checked by this pass.
- This scan used a targeted host/path pattern; it is not proof that every remote image dependency is absent.
- The three uninspected HTML files and any dynamically constructed image paths still require a complete pass.
- Local SVG illustrations are not real photographs and must not be counted toward the real-photo requirement.

## Release blockers
- Import the verified real photo binaries into `assets/images/`.
- Verify exact subject, geographic side of Punjab, creator, date, provenance and licence for every image.
- Correct the five malformed source links and all illustration/photo caption mismatches.
- Complete the remaining three HTML-file checks and run a full broken-image / remote-dependency scan.
- Test every affected page at desktop and mobile widths before publishing.

## Follow-up pass — 2026-11-19

A further pass checked the previously unreviewed image references and migrated matching, already-verified local photo assets into the pages below. Both page imagery and social-preview metadata were updated where present.

- `about.html` — archival Punjabi life photograph (1899).
- `sanjha-virsa.html` — archival Punjabi lifestyle photograph (1899).
- `collections/ghar-rasoi.html` — Punjabi woman in a kitchen (2007).
- `collections/arts-crafts.html` — Punjabi potter (1899).
- `collections/pind-life.html` — mud houses in Mannan (2022).
- `collections/clothing.html` — Phulkari embroidery in Rajpura (depicting 2015).
- `collections/music.html` — dhol player in Chandigarh (2020).

The local asset files were confirmed present in the repository. The remaining sampled pages with remote image references are:
- `lehnda-punjab.html` — Wazir Khan Mosque calligraphy, Lahore. No matching local asset was present, so the source image was not replaced with an unrelated photograph.
- `collections/dance.html` — regional Bhangra performance. No matching local Bhangra photograph was present, so the source image was not replaced with an unrelated photograph.

The agriculture collection already uses the locally stored Patiala bullock-cart image, although its URL is written as the site's absolute GitHub Pages URL. This is still first-party hosting, not a third-party image host.

This follow-up is a targeted pass, not a full site-wide external-image certification. Other pages and CSS background images still require a complete crawl and visual review.

## Full HTML reference scan — 2026-11-19

A repository-tree-based scan checked local `href`, `src`, and `poster` references across all 134 HTML files under `punjab-heritage/`.

- The first pass found 11 broken internal article links, all in three collection pages.
- Repaired all 11 references:
  - `collections/markets-trade.html`: six links now point to existing village-market, grain-mandi and thathera-craft articles.
  - `collections/rivers-ecology.html`: two links now point to the existing five-river landscape and canals/agricultural-change articles.
  - `collections/traditions.html`: three links now point to existing Teeyan, Boliyan and Vaisakhi articles.
- Rechecked all three modified pages against the repository tree: zero remaining missing local targets.

This is a repository-reference audit, not a browser crawl. It verifies that referenced local paths exist in the repository; it does not prove every link renders successfully in a browser, every anchor ID exists, or every remote URL responds.

## Remaining verified remote photo references

The two image subjects explicitly targeted in this pass still need binary files imported before they can be served locally:
- `lehnda-punjab.html`: Wazir Khan Mosque outer-wall calligraphy, Lahore. Source creator: Usmaan.khaled; 12 January 2013; CC BY-SA 4.0. Provenance and licence are now documented in `image-credits.html`.
- `collections/dance.html`: Bhangra performance photograph by Monisankar54; 18 January 2014; CC BY-SA 4.0. Provenance is documented in `image-credits.html`.

The GitHub integration exposes Git Data blob/tree/commit operations that can carry base64-encoded binary content. However, the source image binaries could not be retrieved in this execution environment, so no binary import was attempted. No placeholder, unrelated image, or generated image has been substituted for these documentary photographs. Other pages identified in the earlier audit still have remote image references and remain in the migration queue.


## Link-label accuracy follow-up — 2026-11-19

After the broken-target repair, a second editorial pass checked that visible link labels describe the destination article rather than merely pointing to an existing URL.

- `collections/markets-trade.html`: changed the urban-bazaar card label to “Village haats and weekly markets” because its repaired destination is the village-haat article, not a dedicated urban-bazaar feature.
- `collections/traditions.html`: clarified the Boliyan link as “Wedding songs and boliyan” and the Vaisakhi link as “Vaisakhi and harvest celebrations”, so the labels do not imply broader standalone articles than the destinations provide.

The two pages were updated in separate commits and should be checked in the browser at desktop and mobile widths. The remaining Wazir Khan Mosque and Bhangra documentary image binaries are still not locally hosted; their existing remote image references and credits have been retained rather than substituting unrelated artwork.


## Accessibility and local-image follow-up — 2026-11-19

A focused accessibility pass added a keyboard-visible “Skip to main content” link and a matching `id="main-content"` target to these 12 high-priority pages: `index.html`, `lehnda-punjab.html`, `collections/dance.html`, `objects.html`, `explore.html`, `contribute.html`, `gallery.html`, `about.html`, `sanjha-virsa.html`, `collections/traditions.html`, `collections/markets-trade.html` and `collections/rivers-ecology.html`. The shared stylesheet now includes focus-visible skip-link styling. This is a targeted improvement; the other HTML pages still need the same keyboard-navigation review.

The contribution page's Phulkari image now uses the verified local WebP asset `assets/images/photos/webp/phulkari-embroidery-rajpura-2015.webp` instead of its remote Wikimedia image URL. The original source/credit link remains documented. The local asset is already recorded in the photo asset register.

A targeted image inventory of the homepage, Explore, Objects, Gallery, Contribute, Lehnda Punjab and Dance pages confirmed that these sampled pages have no missing `alt` attributes on their `img` elements and each has one `h1`, a `main` landmark, a viewport declaration and a meta description. The homepage, Explore and Objects pages still contain remote documentary image references. The Wazir Khan Mosque and Bhangra photographs also remain remote because matching binaries are not available locally. No browser-based visual regression, mobile interaction, colour-contrast or screen-reader test has been completed; the live GitHub Pages URL could not be opened by the available browser retrieval, so deployment and rendering remain unverified.


## Keyboard navigation follow-up — 2026-11-19

Extended the shared skip-link pattern to 24 additional content pages. Together with the 12 pages listed in the earlier accessibility follow-up, 36 of the 134 HTML pages now have a keyboard-visible “Skip to main content” link and a matching `main#main-content` target.

Additional pages updated:
- Collections: `agriculture.html`, `arts-crafts.html`, `clothing.html`, `festivals.html`, `food.html`, `forts.html`, `games.html`, `ghar-rasoi.html`, `language-literature.html`, `migration-diaspora.html`, `music.html`, `pind-life.html`, `sacred-architecture.html`, `transport.html`.
- Regional/story indexes: `charda-punjab.html`, `stories.html`.
- Fort and story detail pages: `forts/anandgarh-fort-anandpur-sahib.html`, `forts/gobindgarh-fort-amritsar.html`, `forts/qila-mubarak-bathinda.html`, `forts/qila-mubarak-patiala.html`, `stories/museum-of-rural-life-punjab.html`, `stories/partition-memory-and-oral-history.html`, `stories/phulkari.html`, `stories/punjabi-folk-instruments.html`.

Repository re-fetch verification confirmed that the 24 updated pages contain the skip link, the target ID, exactly one main landmark and exactly one H1. The earlier 12-page group remains separately documented above. This brings the targeted keyboard-navigation coverage to 36/134 pages; the remaining 98 pages still need review. This does not replace browser keyboard testing or a full accessibility audit.
