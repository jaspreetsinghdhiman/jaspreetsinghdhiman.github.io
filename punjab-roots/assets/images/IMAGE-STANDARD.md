# Punjab Heritage — Image Asset Standard

## Publishing rule
All production images must be stored inside this project under `assets/images/`. Do not hotlink image URLs or use remote CSS background images in published pages.

## Matching and accuracy
- Every image must depict the exact subject named by its page or card.
- Do not use a generic Punjab landscape to illustrate a specific village, monument, person, craft technique or historic event.
- Do not identify a tool, textile pattern or building from an image unless the match has been checked.
- If a suitable verified image is unavailable, keep the image unpublished until one is available. Never fill the gap with an unrelated image.
- Prefer original photographs commissioned or taken for Punjab Heritage, user-owned photographs with permission, public-domain works, and licences that permit the intended use.
- Retain an asset register with filename, depicted subject, region/date if known, rights basis, original source, creator if known, acquisition date, crop/derivative notes and verification status.
- Do not remove legally required attribution. If visible third-party credits are not wanted in the design, use assets that need no public attribution or obtain direct permission with agreed credit terms.

## Technical requirements
- Download and store each approved asset locally.
- Prefer optimized WebP/AVIF derivatives plus an accessible JPEG/PNG original where practical.
- Use descriptive lowercase filenames, responsive `srcset`, explicit dimensions, lazy loading below the fold and meaningful alt text.
- Keep decorative images on CSS backgrounds only when they are local files; meaningful images must use semantic `img` elements.
- Before release, scan HTML, CSS, JSON and JS for remote image URLs and confirm no image requests leave the site domain.

## Current state (2026-11-17)
- The image directory contains locally stored SVG illustrations and the Punjab Heritage brand mark. These are illustrations, not documentary photographs.
- A separate `PHOTO-RESEARCH-REGISTER.md` records candidate documentary and archival photographs. Candidates are not approved production assets until the individual file, exact subject, provenance and licence have been verified and the binary file has been imported.
- Do not describe the real-photo phase as complete until the approved photo files are committed, correctly mapped to pages, and tested on desktop and mobile.
- Some older image references may still need a page-by-page broken-path and remote-dependency audit. Do not assume that this audit has passed until it is run and its results recorded.
