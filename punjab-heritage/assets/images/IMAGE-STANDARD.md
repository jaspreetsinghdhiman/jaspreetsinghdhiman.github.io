# Punjab Heritage — Image Asset Standard

## Publishing rule
All production images must be stored inside this project under `assets/images/`. No hotlinked image URLs, remote CSS background images, or externally hosted image dependencies are permitted in published pages.

## Matching and accuracy
- Every image must depict the exact subject named by its page or card.
- Do not use a generic Punjab landscape to illustrate a specific village, monument, person, craft technique or historic event.
- Do not identify a tool, textile pattern or building from an image unless the match has been checked.
- If a suitable verified image is unavailable, keep the image unpublished until one is available. Never fill the gap with an unrelated image.
- Prefer original photographs commissioned or taken for Punjab Heritage, user-owned photographs with permission, public-domain works, and licenses that permit the intended use.
- Retain a private asset register with file name, depicted subject, region/date if known, rights basis, original source, creator if known, acquisition date, crop/derivative notes and verification status.
- Do not remove legally required attribution. Where the site must not display third-party credits, select assets that do not require public attribution or obtain direct permission with agreed credit terms.

## Technical requirements
- Download and store each approved asset locally.
- Prefer WebP/AVIF derivatives plus an accessible JPEG/PNG original where practical.
- Use descriptive lowercase filenames, responsive `srcset`, explicit dimensions, lazy loading below the fold and meaningful alt text.
- Keep decorative images on CSS backgrounds only when they are local files; meaningful images must use semantic `img` elements.
- Before release, scan HTML, CSS, JSON and JS for remote image URLs and confirm no image requests leave the site domain.

## Current state (2026-11-17)
- The image directory currently contains only the brand mark SVG.
- Existing pages still contain externally hosted Wikimedia image URLs and visible creator/license credits. They have not yet been replaced.
- This phase establishes the standard; a full asset-by-asset replacement must be completed before the site can be described as fully self-hosted.
