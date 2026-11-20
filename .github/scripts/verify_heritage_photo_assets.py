#!/usr/bin/env python3
"""Validate locally stored Punjab Heritage object photos and page references."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from PIL import Image, UnidentifiedImageError
import sys

ROOT = Path("punjab-heritage")
PHOTO_ROOT = ROOT / "assets/images/photos"
OBJECTS = [
    "hal", "panjali", "daati", "chulha", "madhaani",
    "manja", "chakki", "gaggar", "charsa",
]
PAGES = [ROOT / "objects.html", ROOT / "image-credits.html"] + [
    ROOT / "objects" / f"{slug}.html" for slug in OBJECTS
]

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
        self.resources = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img" and attrs.get("src"):
            self.images.append(attrs["src"])
        if tag == "script" and attrs.get("src"):
            self.resources.append(attrs["src"])
        if tag == "link" and attrs.get("href") and "stylesheet" in attrs.get("rel", "").split():
            self.resources.append(attrs["href"])

def fail(message):
    print(f"ERROR: {message}")
    return 1

errors = []
originals = sorted((PHOTO_ROOT / "original").glob("*"))
webps = sorted((PHOTO_ROOT / "webp").glob("*.webp"))
if not originals:
    errors.append("No original photo files found.")
if not webps:
    errors.append("No WebP derivatives found.")

for path in originals + webps:
    try:
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            if image.width < 1 or image.height < 1:
                errors.append(f"Invalid dimensions: {path}")
            image.load()
    except (OSError, UnidentifiedImageError, ValueError) as exc:
        errors.append(f"Image cannot be decoded: {path}: {exc}")

for page in PAGES:
    if not page.is_file():
        errors.append(f"Missing required page: {page}")
        continue
    parser = References()
    parser.feed(page.read_text(encoding="utf-8"))
    for raw in parser.images + parser.resources:
        parts = urlsplit(raw)
        if parts.scheme or parts.netloc or raw.startswith(("data:", "blob:", "javascript:", "#")):
            continue
        target = (page.parent / unquote(parts.path)).resolve()
        if not target.is_file():
            errors.append(f"{page}: broken local reference {raw}")
    if page.name != "image-credits.html":
        if page.parent.name == "objects":
            if not any("../assets/images/photos/webp/" in src for src in parser.images):
                errors.append(f"{page}: no local object reference WebP image found")
            if "../image-credits.html" not in page.read_text(encoding="utf-8"):
                errors.append(f"{page}: missing image credits link")

if len(webps) < len(OBJECTS):
    errors.append(f"Expected at least {len(OBJECTS)} WebP derivatives; found {len(webps)}")


# Audit every published HTML page for remotely hosted image elements.
class AllPageImages(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img":
            for key in ("src", "data-src", "poster"):
                if attrs.get(key):
                    self.references.append((key, attrs[key]))
            if attrs.get("srcset"):
                for candidate in attrs["srcset"].split(","):
                    value = candidate.strip().split()[0] if candidate.strip() else ""
                    if value:
                        self.references.append(("srcset", value))

html_pages = sorted(ROOT.rglob("*.html"))
remote_images = []
for page in html_pages:
    parser = AllPageImages()
    parser.feed(page.read_text(encoding="utf-8"))
    for attribute, raw in parser.references:
        parts = urlsplit(raw)
        if parts.scheme in ("http", "https") or parts.netloc:
            remote_images.append(f"{page}: remote {attribute} image: {raw}")

# Also catch image URLs held in JavaScript image maps and CSS backgrounds.
import re
remote_image_pattern = re.compile(
    r"""(?:https?:)?//[^\s"'()<>]+?\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#][^\s"'()<>]*)?""",
    re.IGNORECASE,
)
for page in list(ROOT.rglob("*.js")) + list(ROOT.rglob("*.css")):
    source = page.read_text(encoding="utf-8")
    for match in remote_image_pattern.finditer(source):
        remote_images.append(f"{page}: remote image URL: {match.group(0)}")
if remote_images:
    errors.extend(remote_images)

if errors:
    for error in errors:
        print(f"::error::{error}")
    sys.exit(1)

print(f"Validated {len(originals)} original images and {len(webps)} WebP derivatives.")
print(f"Checked local image/resource references across {len(PAGES)} archive and object pages.")
