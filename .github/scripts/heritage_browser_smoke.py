import os
import threading
import time
import unittest
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2] / "punjab-roots"
BASE = "http://127.0.0.1:8765"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


class HeritageBrowserSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        os.chdir(ROOT)
        cls.server = ThreadingHTTPServer(("127.0.0.1", 8765), QuietHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        time.sleep(0.3)
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        
    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def check_viewport(self, width, height, mobile=False):
        context = self.browser.new_context(viewport={"width": width, "height": height}, is_mobile=mobile)
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        response = page.goto(BASE + "/objects.html", wait_until="networkidle")
        self.assertEqual(response.status, 200)
        page.evaluate("document.fonts.ready")
        page.wait_for_selector(".archive-card")
        
        # The archive grid must not create horizontal page overflow.
        dimensions = page.evaluate("({client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})")
        self.assertLessEqual(dimensions["scroll"], dimensions["client"] + 1, f"Horizontal overflow at {width}px: {dimensions}")

        # Verify the search filters to one matching English result and then Punjabi.
        search = page.locator("#object-search")
        search.fill("chulha")
        self.assertEqual(page.locator(".archive-card:visible").count(), 1)
        self.assertIn("Chulha", page.locator(".archive-card:visible").inner_text())
        search.fill("ਚੱਕੀ")
        self.assertEqual(page.locator(".archive-card:visible").count(), 1)
        self.assertIn("Chakki", page.locator(".archive-card:visible").inner_text())
        search.fill("no-such-heritage-object")
        self.assertEqual(page.locator(".archive-card:visible").count(), 0)
        self.assertTrue(page.locator("#object-empty").is_visible())
        search.fill("")

        # Language switch should change the document language and toggle label.
        page.locator(".language-toggle").first.click()
        self.assertEqual(page.locator("html").get_attribute("lang"), "pa")
        self.assertEqual(page.locator(".language-toggle").first.inner_text(), "English")
        page.locator(".language-toggle").first.click()
        self.assertEqual(page.locator("html").get_attribute("lang"), "en")

        # Force lazy images to load and verify their decoded dimensions.
        images = page.locator(".archive-card img")
        for index in range(images.count()):
            image = images.nth(index)
            image.scroll_into_view_if_needed()
            image.evaluate("(img) => img.decode()")
            self.assertTrue(image.evaluate("(img) => img.naturalWidth > 0 && img.naturalHeight > 0"), f"Broken archive image #{index + 1}")

        # Verify a detail page and its reference image.
        page.locator('.archive-card[href="objects/hal.html"]').click()
        page.wait_for_load_state("networkidle")
        detail_image = page.locator(".object-reference-image img")
        detail_image.scroll_into_view_if_needed()
        detail_image.evaluate("(img) => img.decode()")
        self.assertTrue(detail_image.evaluate("(img) => img.naturalWidth > 0"))
        self.assertTrue(page.locator('.object-reference-image a[href="../image-credits.html"]').count() == 1)
        self.assertEqual(errors, [], f"Browser JavaScript errors: {errors}")
        context.close()

    def test_desktop_archive(self):
        self.check_viewport(1440, 1000)

    def test_mobile_archive_and_navigation(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        response = page.goto(BASE + "/objects.html", wait_until="networkidle")
        self.assertEqual(response.status, 200)
        dims = page.evaluate("({client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})")
        self.assertLessEqual(dims["scroll"], dims["client"] + 1, f"Mobile horizontal overflow: {dims}")
        menu = page.locator(".menu-toggle")
        nav = page.locator(".main-nav")
        menu.click()
        self.assertEqual(menu.get_attribute("aria-expanded"), "true")
        self.assertTrue(nav.evaluate("(el) => el.classList.contains('is-open')"))
        menu.click()
        self.assertEqual(menu.get_attribute("aria-expanded"), "false")
        self.assertEqual(errors, [], f"Browser JavaScript errors: {errors}")
        context.close()

    def test_every_published_page_mobile(self):
        html_pages = sorted(ROOT.rglob('*.html'))
        self.assertGreater(len(html_pages), 0, 'No published HTML pages found')
        context = self.browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
        page = context.new_page()
        failures = []
        for html_file in html_pages:
            route = html_file.relative_to(ROOT).as_posix()
            page_errors = []
            handler = lambda error: page_errors.append(str(error))
            page.on('pageerror', handler)
            response = page.goto(f'{BASE}/{route}', wait_until='domcontentloaded')
            if response is None or response.status != 200:
                failures.append(f"{route}: HTTP {response.status if response else 'no response'}")
                page.remove_listener('pageerror', handler)
                continue
            dims = page.evaluate("({client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})")
            if dims['scroll'] > dims['client'] + 1:
                failures.append(f'{route}: horizontal overflow {dims}')
            remote = page.locator('img').evaluate_all("(nodes) => nodes.map(n => n.getAttribute('src')).filter(s => /^(?:https?:)?\\/\\//i.test(s || ''))")
            if remote:
                failures.append(f'{route}: remotely hosted image(s): {remote}')
            if page_errors:
                failures.append(f'{route}: JavaScript errors: {page_errors}')
            page.remove_listener('pageerror', handler)
        context.close()
        self.assertEqual(failures, [], 'Full mobile page audit failures:\\n' + '\\n'.join(failures))


    def test_heritage_theme_pages_desktop_mobile_and_punjabi(self):
        theme_pages = {
            "stories/traditional-fairs-markets.html": "ਰਵਾਇਤੀ ਮੇਲੇ, ਬਾਜ਼ਾਰ ਅਤੇ ਮੰਡੀਆਂ",
            "stories/beliefs-customs-social-traditions.html": "ਵਿਸ਼ਵਾਸ, ਰਸਮਾਂ ਅਤੇ ਸਮਾਜਿਕ ਰਵਾਇਤਾਂ",
            "stories/historical-personalities-freedom-fighters.html": "ਇਤਿਹਾਸਕ ਸ਼ਖ਼ਸੀਅਤਾਂ ਅਤੇ ਆਜ਼ਾਦੀ ਘੁਲਾਟੀਏ",
            "stories/partition-history-memories.html": "ਵੰਡ ਦਾ ਇਤਿਹਾਸ ਅਤੇ ਯਾਦਾਂ",
            "stories/religious-spiritual-heritage.html": "ਧਾਰਮਿਕ ਅਤੇ ਅਧਿਆਤਮਿਕ ਵਿਰਾਸਤ",
        }
        for width, height, mobile in [(1440, 1000, False), (390, 844, True)]:
            context = self.browser.new_context(
                viewport={"width": width, "height": height},
                is_mobile=mobile,
                has_touch=mobile,
            )
            page = context.new_page()
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            for route, punjabi_title in theme_pages.items():
                response = page.goto(f"{BASE}/{route}", wait_until="networkidle")
                self.assertIsNotNone(response, f"No response for {route} at {width}px")
                self.assertEqual(response.status, 200, f"HTTP failure for {route} at {width}px")
                page.wait_for_selector(".theme-hero h1")
                dimensions = page.evaluate(
                    "({client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})"
                )
                self.assertLessEqual(
                    dimensions["scroll"], dimensions["client"] + 1,
                    f"Horizontal overflow on {route} at {width}px: {dimensions}",
                )
                self.assertGreater(
                    page.locator(".theme-source-list a").count(), 0,
                    f"Missing source references on {route}",
                )
                page.evaluate("document.fonts.ready")
                self.assertTrue(
                    page.evaluate("""document.fonts.check('500 20px "Cormorant Garamond"')"""),
                    f"Display font did not load on {route}",
                )
                if mobile:
                    page.locator(".menu-toggle").click()
                page.locator(".language-toggle").first.click()
                self.assertEqual(page.locator("html").get_attribute("lang"), "pa")
                self.assertIn(punjabi_title, page.locator(".theme-hero h1").inner_text())
                page.locator(".language-toggle").first.click()
                self.assertEqual(page.locator("html").get_attribute("lang"), "en")
            self.assertEqual(errors, [], f"Browser JavaScript errors at {width}px: {errors}")
            context.close()

    def test_homepage_loads(self):
        page = self.browser.new_page(viewport={"width": 390, "height": 844})
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        response = page.goto(BASE + "/", wait_until="networkidle")
        self.assertEqual(response.status, 200)
        self.assertTrue(page.locator("main").count())
        dims = page.evaluate("({client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})")
        self.assertLessEqual(dims["scroll"], dims["client"] + 1, f"Homepage horizontal overflow: {dims}")
        self.assertEqual(errors, [], f"Homepage JavaScript errors: {errors}")
        page.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
