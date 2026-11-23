#!/usr/bin/env python3
"""Dependency-free static SEO and local-link checks for the portfolio sitemap."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
SITE = "https://jaspreetsinghdhiman.github.io"
SITEMAP = ROOT / "sitemap.xml"
ROBOTS = ROOT / "robots.txt"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.in_title = False
        self.description = ""
        self.canonical = ""
        self.h1_count = 0
        self.ids: set[str] = set()
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "h1":
            self.h1_count += 1
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "meta" and values.get("name", "").lower() == "description":
            self.description = values.get("content", "").strip()
        if tag == "link" and "canonical" in values.get("rel", "").lower().split():
            self.canonical = values.get("href", "").strip()
        for key in ("href", "src"):
            value = values.get(key, "").strip()
            if value:
                self.references.append(value)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title += data


def local_target(reference: str, page: Path) -> Path | None:
    parsed = urlparse(reference)
    if parsed.scheme in {"mailto", "tel", "javascript", "data"}:
        return None
    if parsed.netloc and parsed.netloc not in {"jaspreetsinghdhiman.github.io", "www.jaspreetsinghdhiman.github.io"}:
        return None
    raw_path = unquote(parsed.path)
    if not raw_path:
        return None
    if parsed.netloc or raw_path.startswith("/"):
        target = ROOT / raw_path.lstrip("/")
    else:
        target = page.parent / raw_path
    return target


def main() -> int:
    errors: list[str] = []
    if not SITEMAP.exists():
        print("FAIL: sitemap.xml is missing")
        return 1
    try:
        tree = ET.parse(SITEMAP)
    except ET.ParseError as exc:
        print(f"FAIL: sitemap.xml is invalid XML: {exc}")
        return 1

    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = [node.text.strip() for node in tree.findall(".//sm:loc", ns) if node.text]
    if not locations:
        errors.append("Sitemap contains no URL locations.")
    if len(locations) != len(set(locations)):
        errors.append("Sitemap contains duplicate URLs.")

    if not ROBOTS.exists() or "sitemap.xml" not in ROBOTS.read_text(encoding="utf-8").lower():
        errors.append("robots.txt does not reference the root sitemap.xml.")

    checked = 0
    for url in locations:
        parsed_url = urlparse(url)
        if parsed_url.netloc != "jaspreetsinghdhiman.github.io":
            errors.append(f"Sitemap URL uses an unexpected host: {url}")
            continue
        relative = unquote(parsed_url.path).lstrip("/") or "index.html"
        page = ROOT / relative
        if page.is_dir():
            page = page / "index.html"
        if not page.is_file():
            errors.append(f"Sitemap URL has no matching file: {url} -> {relative}")
            continue
        if page.suffix.lower() != ".html":
            continue

        parser = PageParser()
        try:
            parser.feed(page.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError) as exc:
            errors.append(f"Could not read {relative}: {exc}")
            continue
        checked += 1
        if not parser.title.strip():
            errors.append(f"{relative}: missing title element.")
        if not parser.description:
            errors.append(f"{relative}: missing meta description.")
        if not parser.canonical:
            errors.append(f"{relative}: missing canonical URL.")
        elif parser.canonical.rstrip("/") != url.rstrip("/"):
            errors.append(f"{relative}: canonical does not match sitemap URL ({parser.canonical}).")
        if parser.h1_count == 0:
            errors.append(f"{relative}: missing H1.")
        for reference in parser.references:
            target = local_target(reference, page)
            if target is None:
                continue
            if not target.exists():
                errors.append(f"{relative}: broken local reference {reference}")

    if errors:
        print(f"FAIL: {len(errors)} issue(s) across {checked} sitemap HTML page(s)")
        for issue in errors:
            print(f" - {issue}")
        return 1

    print(f"PASS: {len(locations)} sitemap URLs; {checked} HTML pages have titles, descriptions, canonicals and H1s.")
    print("PASS: robots.txt references the sitemap and checked local href/src references resolve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
