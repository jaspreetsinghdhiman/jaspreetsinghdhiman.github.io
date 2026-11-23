import os
import threading
import unittest
import xml.etree.ElementTree as ET
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
BASE = "http://127.0.0.1:8766"
SITE_HOST = "jaspreetsinghdhiman.github.io"
PRIMARY = ["index.html", "about.html", "work.html", "experience.html", "blog.html", "contact.html"]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


class PortfolioBrowserSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        os.chdir(ROOT)
        cls.server = ThreadingHTTPServer(("127.0.0.1", 8766), QuietHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()

    @staticmethod
    def sitemap_routes():
        sitemap = ET.parse(ROOT / "sitemap.xml")
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        routes = []
        for node in sitemap.findall(".//sm:loc", ns):
            if not node.text:
                continue
            parsed = urlparse(node.text.strip())
            if parsed.netloc != SITE_HOST:
                continue
            route = parsed.path.lstrip("/") or "index.html"
            if route.endswith(".html"):
                routes.append(route)
        return sorted(set(routes))

    def test_all_sitemap_pages_at_desktop_and_mobile(self):
        routes = self.sitemap_routes()
        self.assertGreater(len(routes), 0, "No HTML routes found in root sitemap")
        failures = []
        context = self.browser.new_context()
        page = context.new_page()
        for width, height in [(390, 844), (1440, 960)]:
            page.set_viewport_size({"width": width, "height": height})
            for route in routes:
                page_errors = []
                handler = lambda error: page_errors.append(str(error))
                page.on("pageerror", handler)
                try:
                    response = page.goto(f"{BASE}/{route}", wait_until="domcontentloaded", timeout=30000)
                    if response is None or response.status != 200:
                        failures.append(f"{width}px {route}: HTTP {response.status if response else 'no response'}")
                        continue
                    page.wait_for_timeout(100)
                    dimensions = page.evaluate(
                        "({client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})"
                    )
                    if dimensions["scroll"] > dimensions["client"] + 1:
                        failures.append(f"{width}px {route}: horizontal overflow {dimensions}")
                    if page.locator("h1").count() == 0:
                        failures.append(f"{width}px {route}: no visible-page H1")
                    if page_errors:
                        failures.append(f"{width}px {route}: JavaScript errors {page_errors}")
                except Exception as exc:
                    failures.append(f"{width}px {route}: browser error {exc}")
                finally:
                    page.remove_listener("pageerror", handler)
        context.close()
        self.assertEqual(failures, [], "Portfolio browser smoke failures:\\n" + "\\n".join(failures))

    def test_keyboard_skip_links_on_primary_pages(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        failures = []
        for route in PRIMARY:
            response = page.goto(f"{BASE}/{route}", wait_until="domcontentloaded")
            if response is None or response.status != 200:
                failures.append(f"{route}: page did not load")
                continue
            page.keyboard.press("Tab")
            focused = page.evaluate("document.activeElement?.classList?.contains('skip-link') === true")
            if not focused:
                failures.append(f"{route}: skip link is not the first keyboard focus target")
                continue
            page.keyboard.press("Enter")
            target = page.evaluate("document.activeElement?.id || ''")
            if target != "top":
                failures.append(f"{route}: skip link did not focus #top (focused {target!r})")
        context.close()
        self.assertEqual(failures, [], "Keyboard navigation failures:\\n" + "\\n".join(failures))


if __name__ == "__main__":
    unittest.main(verbosity=2)
