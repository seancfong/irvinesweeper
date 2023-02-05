#from googlemaps import Client
import json
import requests
import re
import html

htmlWithUrls = '''
AIRPORT AREA
<li><span><a href="/locations/orange-county/airport-area/17032-murphy.html" target="_blank">17032 Murphy</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/17221-von-karman.html" target="_blank">17221 Von Karman</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/17421-derian.html" target="_blank">17421 Derian</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/2552-mcgaw.html" target="_blank">2552 McGaw</a></span></li>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-4 col-md-3 layout-column-4 staticHeight">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/airport-area/2640-main.html" target="_blank">2640 Main</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/2652-mcgaw.html" target="_blank">2652 McGaw</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/2712-mcgaw.html" target="_blank">2712 McGaw</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/2802-kelvin.html" target="_blank">2802 Kelvin</a></span></li>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-4 col-md-3 layout-column-4 staticHeight">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/airport-area/irvine-towers.html" target="_blank">Irvine Towers</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/jamboree-center.html" target="_blank">Jamboree Center</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/macarthur-court.html" target="_blank">MacArthur Court</a></span></li>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-4 col-md-3 layout-column-4 staticHeight">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/airport-area/newport-gateway.html" target="_blank">Newport Gateway</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/the-launch.html" target="_blank">The Launch</a></span></li>
<li><span><a href="/locations/orange-county/airport-area/venture-park.html" target="_blank">Venture Park</a></span></li>
</ul>
</div>

SPECTRUM CENTER
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/irvine-spectrum/100-spectrum-center-drive">100 Spectrum Center Drive</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/140-142-technology-park.html">140 &amp; 142 Technology Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/152-technology.html">152 Technology</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/15800-alton.html">15800 Alton</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/19-21-technology-drive.html">19 &amp; 21 Technology Drive</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/2040-pacifica.html">20-40 Pacifica</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/200-spectrum-center.html">200 Spectrum Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/25-29-technology.html">25-29 Technology</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/3-morgan.html">3 Morgan</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/300-spectrum-center-drive">300 Spectrum Center Drive</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/400-spectrum-center.html">400 Spectrum Center Drive</a></span></li>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-4 col-md-3 layout-column-4 staticHeight">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/irvine-spectrum/5-9-pasteur.html">5 &amp; 9 Pasteur</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/7-morgan.html">7 Morgan</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/9601-jeronimo.html">9601 Jeronimo</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/9801-muirlands.html">9801 Muirlands</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/alton-corporate-center.html">Alton Corporate Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/alton-plaza.html">Alton Plaza</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/altonada.html">Alton-Ada</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/altonjeronimo-business-park.html">Alton-Jeronimo Business Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/altontechnology.html">Alton-Technology</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/bake-technology-park.html">Bake Technology Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/barranca.html">Barranca</a></span></li>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-4 col-md-3 layout-column-4 staticHeight">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/irvine-spectrum/corporate-business-center.html">Corporate Business Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/discovery-park.html">Discovery Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/discoverywaterworks.html">Discovery-Waterworks</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/fairbanks-industrial-park.html">Fairbanks Industrial Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/freeway-technology-park.html">Freeway Technology Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/hubble-industrial-park.html">Hubble Industrial Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/innovation-office-park.html">Innovation Office Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/irvine-business-center.html">Irvine Business Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/irvine-business-park.html">Irvine Business Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/jenner-business-park.html">Jenner Business Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/jeronimo-5-6.html">Jeronimo 5 &amp; 6</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/laguna-canyon.html">Laguna Canyon</a></span></li>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-4 col-md-3 layout-column-4 staticHeight">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/irvine-spectrum/lakeview-business-center.html">Lakeview Business Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/oak-canyon-business-center.html">Oak Canyon Business Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/oak-creek-business-center.html">Oak Creek Business Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/one-technology-park.html">One Technology Park</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/parker-technology-center.html">Parker Technology Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/sand-canyon-business-center.html">Sand Canyon Business Center</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/spectrum-court.html">Spectrum Court</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/spectrum-terrace.html">Spectrum Terrace</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/technology-link.html">Technology Link</a></span></li>
<li><span><a href="/locations/orange-county/irvine-spectrum/tripointe.html">Tripointe</a></span></li>
</ul>
</div>
</div>

WEST IRVINE
<ul class="shared-link-list no-bullet text-left">
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-md-6">
<div><div data-component-type="content" data-component="link-list" class="link-list component section" data-component-category="shared">
<ul class="shared-link-list no-bullet text-left">
<li><span><a href="/locations/orange-county/west-irvine/market-place-center.html">Market Place Center</a></span></li>
</ul>
</div>
'''

partialurls = re.findall('(?<=<li><span><a\ href=")(?P<url>.*\.html)".*>(?P<name>.*)<\/a>', htmlWithUrls)
urls = []
for url, name in partialurls:
    urls.append((name, 'https://www.irvinecompanyoffice.com' + url))

results = []
for name, url in urls:
    print(url)
    page = requests.get(url)
    lat = re.search('"latitude": "(?P<lat>-?[0-9]\d*(\.\d+)?)"', page.text).group('lat')
    lng = re.search('"longitude": "(?P<lng>-?[0-9]\d*(\.\d+)?)"', page.text).group('lng')
    img = re.search('<div\ class="data-sm"\ data-media="\(min-width:\ 1px\)"\ data-dm-src="(?P<url>.*)"><\/div>', page.text).group('url')
    description = html.unescape(re.search('<hero-community\ loop.*p>(?P<desc>.*)&lt;\/p>', page.text).group('desc'))
    
    result = {
        "type": "office",
        "name": name,
        "image": img,
        "description": description,
        "minRent": 2000,
        "maxRent": 2500,
        "coords": {"lat": float(lat), "lng": float(lng)},
    }
    results.append(result)

f = open("officedata.json", "w")
f.write(json.dumps(results, indent=4))
f.close()
