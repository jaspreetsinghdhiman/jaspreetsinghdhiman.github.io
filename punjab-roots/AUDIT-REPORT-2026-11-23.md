# Punjab Roots — Full Technical & SEO Audit

**Audit date:** 23 November 2026  
**Repository:** https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io  
**Website:** https://jaspreetsinghdhiman.github.io/punjab-roots/  
**Scope:** Repository inventory, all Punjab Roots HTML pages, sitemap coverage, SEO metadata, image delivery references, fonts, selected internal links, and representative editorial content.

## Executive summary

Punjab Roots has a substantial content structure and its technical SEO foundation is in good shape. The repository contains **142 HTML pages**. The sitemap now contains **139 unique URLs**, corresponding to the indexable page set after excluding the generic object template, the thank-you page, the review redirect, and the duplicate `index.html` path (the homepage is represented by the canonical directory URL).

The sitemap was reconciled during this audit: eight missing object-detail pages were added, and the noindex review redirect was removed. A repository-tree comparison confirms **zero sitemap URLs with missing file targets**, **zero duplicate sitemap URLs**, and **zero remaining indexable HTML pages omitted from the sitemap**.

This is a repository/static-code audit. It is **not** a browser-based visual test, an HTTP status crawl of all 139 live URLs, a Google Search Console inspection, or a Lighthouse run. The live GitHub Pages site could not be retrieved through the available browser inspection, so deployment and rendered behaviour remain unverified.

## 1. Site inventory and sitemap

| Check | Result |
|---|---:|
| HTML files under `punjab-roots/` | 142 |
| Sitemap URLs after updates | 139 |
| Object detail URLs in sitemap | 17 |
| Duplicate sitemap URLs | 0 |
| Sitemap URLs without a matching repository file | 0 |
| Indexable HTML files missing from sitemap | 0 |

### Correctly excluded pages

- `object.html` — generic query-driven object template; marked `noindex,follow`.
- `thank-you.html` — submission confirmation; marked `noindex,follow`.
- `contribute.html` — redirect to the homepage review form; newly marked `noindex,follow` and removed from the sitemap.
- `index.html` — duplicate file path for the homepage; the canonical homepage URL is the directory URL ending in `/,` which is the sitemap entry.

The root repository `robots.txt` advertises both the portfolio sitemap and the nested Punjab Roots sitemap.

## 2. SEO metadata and structured data

The 142 HTML files were checked for title, meta description, canonical link, robots directives, image alt attributes, and JSON-LD presence.

- Indexable pages have page-specific title, description and canonical metadata in the static scan.
- The homepage Open Graph description and WebSite JSON-LD description were aligned with its meta description.
- The Stories page Open Graph description was aligned with its page description.
- The homepage preloads the locally hosted Cormorant Garamond and DM Sans font files.
- Main collection and article pages commonly include CollectionPage or Article structured data.
- Utility pages such as the image-credit page do not all need their own structured-data block.
- The generic object template and confirmation/redirect pages are intentionally excluded from indexing.

**Important:** Presence of JSON-LD in source does not prove that Google accepts or displays a rich result. Use Search Console URL Inspection and Rich Results Test after deployment.

## 3. Image delivery and local assets

A static scan of all 142 HTML pages found no direct third-party image delivery in `img` or `source` `src`/`srcset` attributes. The shared stylesheet contains no external URL references; the homepage hero background points to a local WebP file. The main application JavaScript contains no external image URL. External links found in the data files are research/source references, not image-delivery URLs.

The repository contains **25 original photo files and 25 WebP derivatives** in the photo asset folders. The 11 local font files are also present.

All scanned `img` elements have alt attributes. Three regional hero images are not marked lazy-loaded; these are above-the-fold hero images and should not be lazy-loaded simply to satisfy a blanket rule. Below-the-fold images use lazy loading in the reviewed pages.

External Wikimedia links remain in captions and credit records as provenance/licence links. They are not the same as hotlinked image delivery. Keep the creator, source and licence records available wherever required.

**Limitations:** Static source scanning does not visually verify that every photograph accurately depicts its caption, region, date or community. A human visual and licence review is still required before treating every asset as fully verified. Explicit image dimensions/aspect ratios should also be checked to reduce cumulative layout shift.

## 4. Fonts and CSS

- The shared stylesheet contains **11 local `@font-face` declarations**.
- All 11 referenced font files were matched to existing repository paths.
- Font families include Cormorant Garamond, DM Sans, Noto Sans Gurmukhi, Noto Serif Gurmukhi and Noto Nastaliq Urdu.
- The shared stylesheet contains **39 media-query blocks**.
- No remote font-provider URL was found in the stylesheet.

The CSS structure supports responsive layouts, but media-query presence alone does not prove that every mobile screen renders correctly. Desktop and mobile visual checks remain outstanding.

## 5. Internal links

A focused repository-target check covered the six main navigation pages: Home, About, Explore, Objects, Stories and Gallery.

- 156 internal link references were inspected across those pages.
- No missing local target was found in that sample.

This is not a complete anchor-ID or browser navigation test across all 142 pages. It verifies repository file targets for the sampled pages only.

## 6. Editorial content sample

A representative sample shows that some feature articles have useful depth, while several object and topic pages remain short introductory records.

| Page | Approximate body words before/after this audit |
|---|---:|
| Gurdwara feature | 954 |
| Phulkari feature | 971 |
| Multan Blue Pottery feature | 1,326 |
| Museum of Rural Life story | 1,585 |
| Chakki object record | 312 |
| Partition memory article | Expanded from about 363 to about 1,163 |

### Partition memory article expanded

The article `articles/partition-memory.html` was rewritten and expanded with:

- A clearer explanation of the 1947 boundary process and its timing.
- Regional context that avoids treating all Punjabi communities as having one identical experience.
- Sections on displacement, rebuilding, family objects and memory.
- A distinction between oral testimony, remembered events and independently verified facts.
- Consent, anonymity, review and publication safeguards for oral-history work.
- Five institutional/research links: The Partition Museum, The National Archives (UK), The 1947 Partition Archive and the Oral History Association.

The page remains a source-led overview, not a substitute for district-specific research or consented survivor testimony. Historical estimates vary; the article avoids presenting a single disputed death or displacement figure as settled fact.

### Editorial priorities still open

- Expand short object records with materials, regional terminology, documented uses, variations, conservation notes and reliable references.
- Expand short topic articles with place-specific examples, timelines, primary/academic sources and clear editorial notes.
- Review Punjabi translations with fluent regional editors, especially Shahmukhi material.
- Avoid presenting a single custom, recipe, instrument or practice as universal to all of Punjab.
- Distinguish first-hand testimony, family recollection, archival evidence and editorial interpretation.

## 7. Changes committed during this audit

| Change | Commit |
|---|---|
| Added eight missing object-detail URLs to sitemap | [4a83248](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/4a83248a309696f0c71516ad91f2897402859e05) |
| Marked review redirect noindex | [e2d18e0](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/e2d18e0ea878dcc1adce8e5a3e5faf5344f22855) |
| Removed noindex review redirect from sitemap | [9fdbd4f](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/9fdbd4fa4a1355b42cfb7fabafd4b784e3212d9d) |
| Expanded Partition memory article | [e791b0e](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/e791b0eef6a135c57574ab27bcdca20611f716a4) |
| Replaced an unverified Oral History Association link with the verified best-practice PDF | [5db4818](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/5db481814f69af020872bb71dae792c7515d1c06) |
| Aligned homepage social and structured-data description | [fbc19b7](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/fbc19b74b881c4f8bcf64b63278e3976f13c067e) |
| Added homepage local font preloads | [bdb30a1](https://github.com/jaspreetsinghdhiman/jaspreetsinghdhiman.github.io/commit/bdb30a115e2ca414cf936f3b98c1ade4df5d4865) |

## 8. Remaining work and release checklist

### Priority 1 — verify the live release
1. Confirm the latest GitHub Pages deployment completed successfully.
2. Open the homepage, all main navigation pages, representative articles, object detail pages and the sitemap on desktop and mobile.
3. Run an HTTP status crawl of all 139 sitemap URLs; repository file existence is not an HTTP 200 check.
4. Check the review form, language switch, mobile menu, object search/filtering and atlas interactions in a real browser.

### Priority 2 — performance and accessibility
1. Run Lighthouse on mobile and desktop.
2. Check image intrinsic dimensions, responsive sizing and cumulative layout shift.
3. Check keyboard focus, skip links, contrast, heading order and accessible names across all page templates.
4. Verify reduced-motion behaviour and touch targets on small screens.

### Priority 3 — content and trust
1. Expand the shortest object records and topic articles.
2. Verify each image's exact subject, location, date, creator and licence against its source record.
3. Review Gurmukhi and Shahmukhi content with fluent readers.
4. Add district-level specificity and primary/institutional references where available.

### Priority 4 — Google indexing
After deployment:
1. Open Google Search Console for the GitHub Pages property.
2. Submit or resubmit `https://jaspreetsinghdhiman.github.io/punjab-roots/sitemap.xml`.
3. Inspect the homepage and newly added object URLs.
4. Request indexing for priority URLs after the live page is confirmed accessible.
5. Review Page Indexing and Enhancements reports over the following days; submission does not guarantee indexing.

## Final assessment

**Technical foundation:** Good.  
**Sitemap coverage:** Reconciled against the repository tree.  
**SEO metadata:** Strong baseline on indexable pages.  
**Local image delivery:** No direct third-party image `src`/`srcset` found in the 142-page static scan; visual subject/licence review remains.  
**Fonts:** Self-hosted and path-verified.  
**Editorial depth:** Mixed; several feature stories are substantial, while many object/topic records need expansion.  
**Live/mobile verification:** Not yet completed.

Do not describe the website as fully browser-tested or Google-indexed until the remaining live checks are completed.


## 2026-11-23 — Bilingual content expansion batch

Expanded ten of the shortest object/article records with new English and Punjabi sections, while preserving the existing page layout, canonical URLs, image-credit links, collection navigation and explicit verification notes:

- `articles/madhaani.html` — household dairy work, churning context and object documentation.
- `objects/daati.html` — blade/handle context, maker knowledge and careful safety framing.
- `objects/hal.html` — place in the farming cycle and provenance requirements.
- `objects/panjali.html` — animal-powered cultivation context and local identification questions.
- `articles/sandook.html` — household storage, family memory, construction and provenance.
- `articles/peedhi.html` — everyday seating, construction and repair history.
- `articles/gulli-danda.html` — local rules, play spaces and inclusive oral-history recording.
- `articles/bante.html` — local terminology, materials and player-specific rules.
- `articles/manja.html` — weaving, maintenance and courtyard social life.
- `articles/suhaga.html` — field preparation context and documentation of farming knowledge.

Each page now contains two additional bilingual topic sections (English and Gurmukhi Punjabi). The ten files were re-fetched after the commits and verified to contain the new sections and Punjabi copy. These are carefully qualified editorial expansions, not claims that every regional practice is identical. Illustrative images remain explicitly labelled; no unverified provenance was added. Local interviews, dated object records, specialist review and source citations are still needed before treating region-specific details as fully verified.


## 2026-11-23 — Own-site content and outbound-link policy

- Created `research-notes.html`, a bilingual Punjab Roots editorial-method page describing original writing, evidence categories, regional variation, consent and image-rights handling. It is an internal page with no outbound anchor links.
- Replaced the five external further-reading links in `articles/partition-memory.html` with an original bilingual research note and an internal link to `research-notes.html`. The institutions and works consulted remain named transparently on the internal research page; the article no longer sends readers to outside reading pages.
- Replaced the homepage Phulkari photo's external Commons link with an internal link to the Punjab Roots image-credits page.
- Added the research-notes page to the sitemap and linked it from the homepage footer.
- Static check of the updated homepage, Partition article, research-notes page and sitemap found zero external anchor links. The image-credits page still contains 32 external source-record links for third-party photographs. These are provenance/licence references, not outbound editorial reading links. Removing them while those images remain in use could violate attribution or licence conditions. The long-term fully self-owned route is to replace each third-party image with original photography or assets with rights that permit the intended use, then retire the corresponding external credit links.
- This is a targeted check of the files above, not yet a complete 142-page outbound-link audit. Remaining pages and scripts still require a full sweep before claiming that every external link has been removed. Platform-required technical identifiers such as Schema.org vocabulary and the website's own canonical domain are not third-party content links.
