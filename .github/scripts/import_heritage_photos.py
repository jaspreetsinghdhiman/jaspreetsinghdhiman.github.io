from io import BytesIO
from pathlib import Path
from urllib.parse import unquote
import hashlib
import time
import requests
from PIL import Image, ImageOps

ROOT = Path("punjab-heritage/assets/images/photos")
ORIGINALS = ROOT / "original"
WEBP = ROOT / "webp"
ORIGINALS.mkdir(parents=True, exist_ok=True)
WEBP.mkdir(parents=True, exist_ok=True)

# Direct Wikimedia Commons originals. Each file's description page was checked
# for the named subject, author and reuse status before inclusion.
ASSETS = [
    {
        "file": "punjabi-life-old-punjab-1899.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/63/Punjabi_life_in_old_Punjab.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Punjabi_life_in_old_Punjab.jpg",
        "subject": "Archival image from Panjabi Sketches (1899); image itself depicts Lady visitors to a zenana mission house",
        "creator": "Two Friends",
        "date": "1 August 1899",
        "rights": "Public Domain Mark 1.0",
        "license": "https://creativecommons.org/publicdomain/mark/1.0/",
    },
    {
        "file": "punjabi-lifestyle-old-punjab-1899.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Punjabi_lifestyle_in_old_Punjab.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Punjabi_lifestyle_in_old_Punjab.jpg",
        "subject": "Archival Punjabi lifestyle image from Panjabi Sketches",
        "creator": "Two Friends",
        "date": "1 August 1899",
        "rights": "Public Domain Mark 1.0",
        "license": "https://creativecommons.org/publicdomain/mark/1.0/",
    },
    {
        "file": "punjabi-potter-1899.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Punjabi_Potter_in_1899.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Punjabi_Potter_in_1899.jpg",
        "subject": "Punjabi potter in Punjab, India",
        "creator": "Two Friends",
        "date": "1 May 1899",
        "rights": "Public Domain Mark 1.0",
        "license": "https://creativecommons.org/publicdomain/mark/1.0/",
    },
    {
        "file": "bullock-cart-patiala-2016.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Bullock_cart_in_Punjab%2C_India.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Bullock_cart_in_Punjab,_India.jpg",
        "subject": "Bullock cart in Patiala, Punjab, India",
        "creator": "Satdeep Gill",
        "date": "7 May 2016",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "punjabi-woman-kitchen-2007.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Punjabi_woman_in_kitchen.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Punjabi_woman_in_kitchen.jpg",
        "subject": "Punjabi woman in a kitchen",
        "creator": "Sanyam Bahga",
        "date": "5 March 2007",
        "rights": "CC BY-SA 3.0 (as stated on the Commons file page)",
        "license": "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    {
        "file": "phulkari-embroidery-rajpura-2015.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Women_embroidering_Phulkari_in_Rajpura%2C_Punjab_%28India%29%2C_2015.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Women_embroidering_Phulkari_in_Rajpura,_Punjab_(India),_2015.jpg",
        "subject": "Women embroidering Phulkari in Rajpura, Punjab, India",
        "creator": "Sheebamadanloewinger",
        "date": "3 February 2020 (file metadata; depicts 2015)",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "mud-house-mannan-2022.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Mud_houses%2C_Mannan%2C_Punjab_%282022%29.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Mud_houses,_Mannan,_Punjab_(2022).jpg",
        "subject": "Old mud house structure in village Mannan, Punjab, India",
        "creator": "SAGANP20",
        "date": "16 December 2022",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "dholi-chandigarh-2020.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/00/Dholi.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Dholi.jpg",
        "subject": "Dhol player in Chandigarh, India",
        "creator": "Vikramarora1981",
        "date": "9 February 2020",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "kabaddi-dhandwar-2016.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/6c/KAbaddi.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:KAbaddi.jpg",
        "subject": "Circle-style village Kabaddi tournament in Dhandwar",
        "creator": "Happyim",
        "date": "21 February 2016",
        "rights": "CC BY-SA 4.0 (Commons structured licence metadata)",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },

    {
        "file": "old-plow-punjab.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/08/Old_Plow.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Old_Plow.jpg",
        "subject": "Traditional plough documented in the Punjab Objects Archive",
        "creator": "Harry sidhuz",
        "date": "Date not stated on source record",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "oxen-yoke-ploughing-loc.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/24/Peasant_types._Plowing._(With_yoke_of_cattle._Cows_and_oxen_are_both_used)_LOC_matpc.05921.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Peasant_types._Plowing._(With_yoke_of_cattle._Cows_and_oxen_are_both_used)_LOC_matpc.05921.jpg",
        "subject": "Historical photograph of oxen working with a traditional yoke; Matson Collection, Library of Congress",
        "creator": "Matson Collection, Library of Congress",
        "date": "Historical photograph; date not stated in current register",
        "rights": "No known restrictions on publication",
        "license": "https://www.loc.gov/rr/print/res/096_bib.html",
    },
    {
        "file": "sickle-daati.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Sickle_2.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Sickle_2.jpg",
        "subject": "Curved hand sickle used for cutting crops",
        "creator": "S. Jasmine jeno",
        "date": "Date not stated on source record",
        "rights": "CC0 1.0",
        "license": "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    {
        "file": "clay-stove-chulha.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Clay_stove_01.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Clay_stove_01.jpg",
        "subject": "Clay cooking stove from Ishanpur, Ludhiana, Punjab",
        "creator": "Gurnoor ghuman",
        "date": "Date not stated on source record",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "wooden-churn-madhaani.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/32/Churn_01.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Churn_01.jpg",
        "subject": "Traditional wooden churn from Ishanpur, Ludhiana, Punjab",
        "creator": "Gurnoor ghuman",
        "date": "Date not stated on source record",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "woven-cot-manja.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/48/A_Cot.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:A_Cot.jpg",
        "subject": "Woven cot documented in Punjab",
        "creator": "Mulkh Singh",
        "date": "Date not stated on source record",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "chakki-stone-grinder.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/b/be/Chakki.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Chakki.jpg",
        "subject": "Traditional stone hand grinder (chakki)",
        "creator": "Sixtybolts",
        "date": "Date not stated on source record",
        "rights": "CC BY-SA 2.0",
        "license": "https://creativecommons.org/licenses/by-sa/2.0/",
    },
    {
        "file": "brass-water-vessel-gaggar.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Brass_vessel_02.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Brass_vessel_02.jpg",
        "subject": "Brass vessel from Ishanpur, Ludhiana, Punjab",
        "creator": "Gurnoor ghuman",
        "date": "Date not stated on source record",
        "rights": "CC BY-SA 4.0",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    {
        "file": "saqiyah-water-wheel-lahore-1933.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/1/17/Photograph_of_a_Saqiyah_%28Persian_wheel%29_near_Lahore%2C_Punjab%2C_India%2C_ca.1933.jpg",
        "source": "https://commons.wikimedia.org/wiki/File:Photograph_of_a_Saqiyah_(Persian_wheel)_near_Lahore,_Punjab,_India,_ca.1933.jpg",
        "subject": "Historical Persian wheel water-lifting system near Lahore, Punjab, ca. 1933",
        "creator": "Photographer unknown",
        "date": "ca. 1933",
        "rights": "Public Domain Mark",
        "license": "https://creativecommons.org/publicdomain/mark/1.0/",
    },
]

session = requests.Session()
session.headers.update({"User-Agent": "PunjabHeritagePhotoArchive/1.0 (local asset import; contact via repository)"})
rows = [
    "# Punjab Heritage — locally stored photo asset register",
    "",
    "All source binaries and WebP derivatives in this directory were imported from the individual Wikimedia Commons file pages listed below.",
    "WebP derivatives are resized to a maximum 1800px long edge, quality 84; originals are retained unchanged.",
    "Where CC BY-SA applies, the derivative remains under the same or a compatible licence. Changes: resized and converted to WebP.",
    "",
    "| Local asset | Depicted subject | Creator | Date | Rights | Source |",
    "|---|---|---|---|---|---|",
]
for item in ASSETS:
    response = None
    original_name = unquote(item["url"].rsplit("/", 1)[-1])
    candidates = [
        item["url"],
        "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + requests.utils.quote(original_name, safe=""),
    ]
    errors = []
    # Commons rate-limits bursts from shared CI runners. Pace requests and
    # honour Retry-After with exponential backoff instead of failing the batch.
    time.sleep(12)
    for candidate in candidates:
        for attempt in range(5):
            try:
                candidate_response = session.get(candidate, timeout=90, allow_redirects=True)
                if candidate_response.status_code == 429 or candidate_response.status_code >= 500:
                    retry_after = candidate_response.headers.get("Retry-After")
                    delay = int(retry_after) if retry_after and retry_after.isdigit() else min(90, 15 * (attempt + 1))
                    print(f"Rate/server response {candidate_response.status_code}; retrying in {delay}s", flush=True)
                    time.sleep(delay)
                    continue
                candidate_response.raise_for_status()
                content_type = candidate_response.headers.get("Content-Type", "")
                if "image/" not in content_type or len(candidate_response.content) < 1000:
                    raise RuntimeError(f"unexpected response {candidate_response.status_code} {content_type} ({len(candidate_response.content)} bytes)")
                response = candidate_response
                break
            except Exception as exc:
                errors.append(f"{candidate}: {exc}")
                break
        if response is not None:
            break
    if response is None:
        raise RuntimeError("Unable to acquire " + item["file"] + ": " + " | ".join(errors))
    print(f"Downloaded {item['file']} ({len(response.content)} bytes) from {response.url}", flush=True)
    image = Image.open(BytesIO(response.content))
    image.verify()
    image = Image.open(BytesIO(response.content))
    image = ImageOps.exif_transpose(image).convert("RGB")
    original_path = ORIGINALS / item["file"]
    original_path.write_bytes(response.content)
    max_edge = 1800
    if max(image.size) > max_edge:
        image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    webp_name = Path(item["file"]).stem + ".webp"
    image.save(WEBP / webp_name, "WEBP", quality=84, method=6)
    digest = hashlib.sha256(response.content).hexdigest()
    rows.append(
        f"| `webp/{webp_name}` + `original/{item['file']}` | {item['subject']} | {item['creator']} | {item['date']} | [{item['rights']}]({item['license']}) | [Commons file page]({item['source']}) |"
    )
    rows.append("")
    rows.append(f"SHA-256 original: `{digest}`")
    rows.append("")
(ROOT / "PHOTO-ASSET-REGISTER.md").write_text("\n".join(rows) + "\n", encoding="utf-8")
print(f"Imported {len(ASSETS)} source photographs and WebP derivatives.")
