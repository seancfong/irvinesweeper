const fs = require('fs');
const https = require('https');

var postData = JSON.stringify({
    "index": "prod_ica_community",
    "query": "",
    "params": {
        "hitsPerPage": 1000,
        "attributesToHighlight": [],
        "filters": "cityIdAEM:\"7bee34c1-a645-45c2-ad68-b5e12a63f82e\"",
        "attributesToRetrieve": [
                                 "communityHeroSqImage",
                                 "communityName",
                                 "calc_minRent",
                                 "calc_maxRent",
                                 "communityStatus",
                                 "dispCommLocationPt",
                                 "commPromotion",
                                 "communityDescription",
                                 "communityPropertyAddress",
                                 "communityPropertyPostalCode"]
    }
});

var options = {
    hostname: 'search.irvinecompanyapartments.com',
    port: 443,
    path: '/search',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
}

var rawData = "";
var req = https.request(options, (res) => {
    res.on('data', (data) => {
	rawData += data;
    });
    
    res.on('end', () => {
	var jsonData = JSON.parse(rawData).hits;
	fixedData = jsonData.map(x => {
	    return {
		type: 'apartment',
		name: x.communityName,
		description: x.communityDescription,
		address: x.communityPropertyAddress,
		zipcode: x.communityPropertyPostalCode,
		status: x.communityStatus,
		image: x.communityHeroSqImage,
		minRent: x.calc_minRent,
		maxRent: x.calc_maxRent,
		coords: x.dispCommLocationPt,
		promo: x.commPromotion
	    }
	});

	fs.writeFileSync('apartmentdata.json', JSON.stringify(fixedData, null, 2));
    });
});

req.on('error', e => console.error(e));

req.write(postData);
req.end();
