# Punjab Roots — Discover the Roots. Preserve the Legacy.

A static, GitHub Pages-compatible heritage platform nested safely inside the existing portfolio repository.

## Preview
After the GitHub Pages deployment completes, open:
https://jaspreetsinghdhiman.github.io/punjab-roots/

## Current image-hosting rule (2026-11-23)
- The repository contains original photo files and optimized WebP derivatives under `assets/images/photos/`; use these local files for all visible images, CSS backgrounds, social preview images and thumbnails.
- External Wikimedia URLs may appear as source/creator/licence links in captions and `image-credits.html`, but must not be used as `img src`, `srcset`, CSS `url()` or Open Graph/Twitter image URLs.
- Do not mark the migration complete until every HTML page, stylesheet, JSON data file and generated image URL has been scanned and tested for external image delivery and missing local assets.
- Fonts loaded from a font provider are not image assets; they are a separate external dependency and can be self-hosted in a later performance pass.

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
4. Documentary image files are stored in this repository under `assets/images/photos/original/` and optimized `assets/images/photos/webp/`. Pages should load images from these local relative paths; Wikimedia Commons links are source/credit records only and must never be used as the image delivery URL. Complete a repository-wide `src`, `srcset`, CSS background and Open Graph image audit before claiming every page is fully self-hosted.
5. Object descriptions are introductory and require regional review, references and attribution before being marked as verified.
6. Four additional collections (Forts, Food, Folk Dance and Festivals) are included. Use only a locally stored, subject-matched image for each page; if a verified local asset is unavailable, use a clearly labelled local illustration or omit the image rather than hotlinking or substituting an unrelated photo.

## Local preview
Open `index.html` in a browser, or run a local static server from this folder.

## Brand
Punjab Roots — Discover the Roots. Preserve the Legacy.


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


## 2026-11-18 — Expanded editorial collections
- Added five new research-led collections: Punjabi Language & Literature; Sacred Places & Architecture; Rivers, Canals & Ecology; Traditional Markets & Trade; Migration & Punjabi Diaspora.
- Added collection discovery links and updated the collection count to 18.
- Added canonical URLs, Open Graph metadata, CollectionPage structured data and sitemap entries for all five pages.
- Each page includes regional context, topic guides, Punjabi terminology, editorial safeguards and starting references. These are editorial foundations, not claims that every local practice is uniform or fully verified.
- New collection pages are text-led; no unrelated or mismatched stock photographs were added. Exact documentary photography should be added only after subject, location, rights and caption checks.


## 2026-11-18 — Bilingual heritage story expansion
- Added five bilingual (English and Gurmukhi) editorial stories: Punjabi across Gurmukhi and Shahmukhi; 1947 Partition and oral-history ethics; Punjab's river systems; Punjabi folk instruments and performance; village markets and agricultural exchange.
- Added story navigation links and XML sitemap entries.
- Each article includes Article structured data, canonical URL, meta description, English and Gurmukhi text, references and an editorial note distinguishing research from local testimony.
- New articles intentionally do not use generic or mismatched imagery. Add photographs only after exact subject, place, date, rights and caption are verified; host approved image files locally.

## 2026-11-19 — Homepage image dependency cleanup
- Updated the Agriculture collection's main image and Open Graph/Twitter image metadata to use the locally hosted Patiala bullock-cart WebP asset.
- Added complete Open Graph URL/image and Twitter large-image preview metadata to the homepage, using its locally hosted hero photograph.
- Added `noindex,follow` to the generic `object.html` loading template; individual object records remain the indexable destinations. The `thank-you.html` page was already marked `noindex,follow`.
- Replaced the homepage Agriculture card image with the locally hosted Patiala bullock-cart photograph and the Bhangra/performance card image with the locally hosted Chandigarh dhol-player photograph. Both are subject-related local assets; the remaining wedding, fort, food and Lohri card images still need verified local acquisitions.
- Replaced the homepage manifesto's externally hosted Phulkari background with the verified local WebP asset at `assets/images/photos/webp/phulkari-embroidery-rajpura-2015.webp`.
- The homepage hero already uses the locally hosted Patiala bullock-cart photograph.
- This is a partial migration only: several homepage collection cards still reference externally hosted photographs. Keep the local-image migration open until each image is acquired, rights-checked, optimized and mapped to its exact subject.


## GitHub-managed visitor reviews (2026-11-21)
- The homepage has the single visitor review form. It opens the visitor's configured email app using a `mailto:` link addressed to the archive owner; no third-party form service or external submission endpoint is used.
- Email apps do not send a copy of the message into GitHub automatically. The owner receives the email, checks it, and manually adds only approved public fields (display name, numeric rating, optional title, review text) to `data/reviews.json` with `published: true`. Never publish visitor email addresses or other private details.
- The public review cards are read from `data/reviews.json` and appear only when `published` is `true`. GitHub commit history is the moderation/publishing audit trail; unapproved entries should not be added to the public JSON file.
- Example entry: `{ "name": "Visitor", "rating": 5, "title": "A thoughtful archive", "review": "A useful look at Punjab's heritage.", "published": true }`.
- A `mailto:` handoff cannot verify that the visitor actually pressed Send; the page explains this clearly. Fully automatic email-to-GitHub publishing would require a separately authenticated mail-processing backend, which GitHub Pages alone does not provide.
