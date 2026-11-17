# Punjab Heritage — The Living Legacy of Punjab

A static, GitHub Pages-compatible heritage platform nested safely inside the existing portfolio repository.

## Preview
After the GitHub Pages deployment completes, open:
https://jaspreetsinghdhiman.github.io/punjab-heritage/

## Structure
- `index.html` — homepage
- `explore.html` — searchable collection directory
- `objects.html` — searchable Punjabi object archive
- `object.html?id=hal` — data-driven bilingual object record template
- `stories.html` — community stories
- `gallery.html` — visual gallery
- `about.html` — mission and principles
- `contribute.html` — email-connected contribution form (FormSubmit; recipient verification required on first use)
- `thank-you.html` — contribution confirmation page
- `contact.html` — contact page
- `collections/` — collection detail pages
- `assets/css/style.css` — responsive design system
- `assets/js/app.js` — navigation, filtering and form-preview interactions
- `data/objects.json` — nine introductory object records with English and Gurmukhi descriptions

## Important launch notes
1. This release is static HTML/CSS/JS and works on GitHub Pages. PHP and MySQL are not available on GitHub Pages.
2. The contribution form posts to FormSubmit at jassp708737@gmail.com. The recipient must complete FormSubmit's first-use email verification before messages can be delivered. Do not collect sensitive personal information.
3. The object archive includes Punjabi names, summaries and bilingual detail fields. The language switch now persists the selected language and translates shared navigation/common UI labels; full page-by-page Punjabi translation is still outstanding.
4. Most photography remains illustrative stock imagery. The gallery now includes a Punjab-specific Phulkari photograph from Wikimedia Commons with creator and CC BY-SA 4.0 attribution. Continue replacing generic imagery with documented, licensed regional photographs and maintain credits.
5. Object descriptions are introductory and require regional review, references and attribution before being marked as verified.
6. Add the remaining collection pages using the established template and update the sitemap when they are published.

## Local preview
Open `index.html` in a browser, or run a local static server from this folder.

## Brand
Punjab Heritage — Preserving Our Roots. Celebrating Our Heritage.


## Recent content updates
- Added a bilingual Phulkari feature at `stories/phulkari.html`, with links to MFAH, Punjabi University and NCERT references.
- Added the Phulkari feature to the story collection and sitemap.
- Added a museum-catalogued 19th-century Phulkari textile to the gallery with attribution and MFAH use-term link. MFAH identifies the item image as Public Domain but limits use to non-commercial educational/personal contexts; verify current terms before any commercial use.
- Added Objects to the primary navigation across main and collection pages.
- Expanded the persistent Punjabi language switch dictionary. This is partial translation coverage, not a complete translation of every page or every paragraph.
- Added lazy loading and async decoding to below-the-fold content images on homepage, gallery and stories.

- Added canonical URLs to primary and collection pages, WebSite structured data to the homepage, Article structured data to the Phulkari story, and dynamic object-specific canonical/meta/Thing data for object detail URLs.
- Added individual object detail URLs to the sitemap. Dynamic pages and structured data should still be checked in Google Search Console after deployment.

- Added two more Punjab-specific gallery photographs: a bullock cart in Patiala (Satdeep Gill, CC BY-SA 4.0) and a Punjabi woman cooking (Sanyam Bahga, CC BY-SA 3.0), each with nearby attribution and license links.
- FormSubmit's current documentation states a 10 MB combined attachment limit and 30-day retention for text submissions; uploaded files are not retained in its submissions archive. The form now explains the attachment limit and retention caveat.


## 2026-11-17 — Original editorial content phase
- Added a long-form bilingual (English and Gurmukhi) feature on the Museum of Rural Life of Punjab at PAU, Ludhiana: `stories/museum-of-rural-life-punjab.html`.
- Linked the feature from the Stories page and added it to the XML sitemap.
- Added responsive long-form article typography.
- Added an internal research register at `data/editorial-research-register.md` to separate verified institutional facts from claims still requiring object-level confirmation.
- Added `assets/images/IMAGE-STANDARD.md` defining the local-only image rule, exact subject matching, rights checks, asset metadata and pre-release remote-image scan.
- Important: the image migration is not complete yet. Existing pages still contain remote image URLs and visible photo credits. The image folder currently has only the brand mark. This work must not be described as fully self-hosted until every published image has been replaced with a verified local asset and the site has passed an external-request scan.

## 2026-11-17 — Local image migration progress
- Added original, locally stored SVG illustrations for ploughed fields, chulha/kitchen, phulkari, chakki, pottery, dhol, mud houses, wedding traditions, bullock carts, kabaddi and Lahore mosque architecture.
- Replaced remote Wikimedia image URLs in the main page, explore, gallery, stories, objects, regional pages and collection pages with local assets.
- Removed visible image-credit/source labels and remote social preview image tags from the pages migrated in this phase.
- Scanned the migrated HTML/CSS/JSON files for Wikimedia/Unsplash/Pexels image URLs; no matching external image URLs were found in the scanned files.
- These are original illustrative SVG artworks, not documentary photographs of specific historic objects or sites. For named locations, people and historically specific objects, replace them later only with verified project-owned photographs or rights-cleared images whose subject has been confirmed.
- Remaining review: verify every local relative path in browser, inspect mobile layouts, scan JS/manifest and all remaining file types, and review the article's local image choices. External Google Fonts remain a non-image network dependency and should be self-hosted if the project goal is fully independent hosting.
