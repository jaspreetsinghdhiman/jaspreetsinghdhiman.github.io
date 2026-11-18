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
4. Collection and object imagery now uses subject-matched documentary photographs sourced from Wikimedia Commons. The images are currently loaded from their original hosts (not stored locally in this repository); source and licence details are listed on `image-credits.html` for the object archive.
5. Object descriptions are introductory and require regional review, references and attribution before being marked as verified.
6. Four additional collections (Forts, Food, Folk Dance and Festivals) are included in this release. Their image subjects and page metadata have been reviewed; local image hosting remains a future improvement.

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
- Added `assets/images/IMAGE-STANDARD.md` defining exact subject matching, rights checks, asset metadata and image QA expectations.
- The website still loads many photos from external Wikimedia hosts; it is not yet a fully self-hosted image library. The `image-credits.html` page records source and licence details for the updated object archive.

## 2026-11-17 — Local image migration progress
- Added the Forts, Food, Folk Dance and Festivals collection pages, SEO metadata, structured data and sitemap entries.
- Added full-site motion polish: page transitions, card/image hover transitions, scroll reveals and reduced-motion support.
- Removed the obsolete brand-mark SVG reference; a source scan of the published HTML/CSS/JS files found no inline SVG illustrations or `.svg` image references.
- Replaced the mismatched object-card photographs with subject-specific photographs for the plough, yoke-in-use, sickle, chulha, madhani, manja, chakki, gaggar and animal-powered water lifting. Detail pages now use the same object-specific mapping.
- Added `image-credits.html` with source and licence details. Image files are still remotely hosted by their sources rather than copied into this repository; a local asset migration remains outstanding.
