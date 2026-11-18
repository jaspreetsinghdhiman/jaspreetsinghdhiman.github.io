from io import BytesIO
from pathlib import Path
import hashlib
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
    response = session.get(item["url"], timeout=60)
    response.raise_for_status()
    content_type = response.headers.get("Content-Type", "")
    if "image/" not in content_type:
        raise RuntimeError(f"Not an image for {item['file']}: {content_type}")
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
