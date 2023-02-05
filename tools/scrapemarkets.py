import html
import requests
import re
import json

URLS = [
    ("Alton Marketplace | Irvine Spectrum", "https://www.shopirvinecompany.com/centers/irvine/alton-marketplace-irvine-spectrum"),
    ("Alton Retail Center", "https://www.shopirvinecompany.com/centers/irvine/alton-retail-center"),
    ("Alton Square", "https://www.shopirvinecompany.com/centers/irvine/alton-square"),
    ("Campus Plaza", "https://www.shopirvinecompany.com/centers/irvine/campus-plaza"),
    ("Crossroads", "https://www.shopirvinecompany.com/centers/irvine/crossroads"),
    ("Culver Plaza", "https://www.shopirvinecompany.com/centers/irvine/culver-plaza"),
    ("Cypress Village Shopping Center", "https://www.shopirvinecompany.com/centers/irvine/cypress-village-shopping-center"),
    ("Harvard Place Auto Plaza", "https://www.shopirvinecompany.com/centers/irvine/harvard-place-auto-plaza"),
    ("Harvard Place Shopping Center", "https://www.shopirvinecompany.com/centers/irvine/harvard-place-shopping-center"),
    ("Lakeside Plaza", "https://www.shopirvinecompany.com/centers/irvine/lakeside-plaza"),
    ("Los Olivos Apartment Village", "https://www.shopirvinecompany.com/centers/irvine/los-olivos-apartment-village"),
    ("Los Olivos Marketplace | Irvine Spectrum", "https://www.shopirvinecompany.com/centers/irvine/los-olivos-marketplace-irvine-spectrum"),
    ("Northpark Plaza", "https://www.shopirvinecompany.com/centers/irvine/northpark-plaza"),
    ("Oak Creek Shopping Center", "https://www.shopirvinecompany.com/centers/irvine/oak-creek-shopping-center"),
    ("Orchard Hills Chopping Center", "https://www.shopirvinecompany.com/centers/irvine/orchard-hills-shopping-center"),
    ("Sand Canyon Plaza", "https://www.shopirvinecompany.com/centers/irvine/parkview-center"),
    ("Quail Hill Shopping Center", "https://www.shopirvinecompany.com/centers/irvine/quail-hill-shopping-center"),
    ("Sand Canyon Plaza", "https://www.shopirvinecompany.com/centers/irvine/sand-canyon-plaza"),
    ("The Park at Irvine Spectrum", "https://www.shopirvinecompany.com/centers/irvine/the-park-at-irvine-spectrum"),
    ("The Square", "https://www.shopirvinecompany.com/centers/irvine/the-square"),
    ("The Village at Irvine Spectrum", "https://www.shopirvinecompany.com/centers/irvine/the-village-at-irvine-spectrum"),
    ("University Center", "https://www.shopirvinecompany.com/centers/irvine/university-center"),
    ("University Park Center", "https://www.shopirvinecompany.com/centers/irvine/university-park-center"),
    ("Venture Park", "https://www.shopirvinecompany.com/centers/irvine/venture-park"),
    ("Walnut Village Center", "https://www.shopirvinecompany.com/centers/irvine/walnut-village-center"),
    ("Westpark Plaza", "https://www.shopirvinecompany.com/centers/irvine/westpark-plaza"),
    ("Woodbridge Village Center", "https://www.shopirvinecompany.com/centers/irvine/woodbridge-village-center"),
    ("Woodbury Town Center", "https://www.shopirvinecompany.com/centers/irvine/woodbury-town-center")
]

coords = []
needscomma = False

results = []
for name, url in URLS:
    page = requests.get(url).text
    img = re.search('noscript\ data-slimmage="true"\ data-img-src="\/cfasset\?url=(?P<url>.*)"\ data-img-alt=""\ data-img-class=""><im', page)
        
    coords = re.search('latitude: \'(?P<lat>-?[0-9]\d*(\.\d+)?)\', longitude: \'(?P<lng>-?[0-9]\d*(\.\d+)?)\'', page)
    item = {
        "type": "retail",
        "name": name,
        "image": img.group('url') if img else "",
        "minRent": 2500,
        "maxRent": 3000,
        "coords": {"lat": float(coords.group('lat')), "lng": float(coords.group('lng'))}
    }
    results.append(item)

f = open('marketplaces.json', 'w')
f.write(json.dumps(results, indent=4))
f.close()
