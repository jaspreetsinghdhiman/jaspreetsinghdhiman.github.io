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
