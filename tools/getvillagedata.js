const fs = require('fs');
const https = require('https');

var options = {
    hostname: 'www.villagesofirvine.com',
    port: 443,
    path: '/Umbraco/Api/POI/GetJson',
    method: 'GET'
}

var generalData;

var rawData = "";
var jsonData;
var req = https.request(options, (res) => {
    res.on('data', (data) => rawData += data);

    res.on('end', () => {
	jsonData = JSON.parse(rawData);

	var orchardHills = {
	    type: "residential",
	    name: "Reserve at Orchard Hills",
	    image: "https://www.villagesofirvine.com/remote.axd/s3.amazonaws.com/villagesofirvine/media/395433/2.jpg?anchor=center&mode=crop&width=1440&height=600&quality=80&rnd=132167315610000000",
	    description: "Experience the prestige, natural tranquility and spectacular panoramas that distinguish this private village enclave. Stunning new home collections and a premier Irvine location heighten the extraordinary appeal of Reserve at Orchard Hills.",
	    minRent: 3500,
	    maxRent: 4000,
	    price: "Low $2 millions"
	};
	orchardHills.coords = jsonData.villages[0].coordinates[0].map(x => {return{lat: x[1], lng: x[0]}});
	//fs.writeFileSync('orchardHills.json', JSON.stringify(orchardHills, null, 2));
	var portolaSprings = {
	    type: "residential",
	    name: "Portola Springs Village",
	    image: "https://www.villagesofirvine.com/remote.axd/s3.amazonaws.com/villagesofirvine/media/398423/2222-04_pool-late-day_highlandpark_irvineco_ericfiggephotos.jpg?center=0.6404494382022472,0.4943820224719101&mode=crop&width=1440&height=600&quality=80&rnd=132957233880000000",
	    description: "Nestled within nature, life within the Village of Portola Springs is enhanced by its serene location, yet close to everyday conveniences. Experience a premium Irvine address including.",
	    minRent: 3500,
	    maxRent: 4000,
	    price: "Mid $1 millions"
	};
	portolaSprings.coords = jsonData.villages[2].coordinates[0].map(x => {return{lat: x[1], lng: x[0]}});
	var eastwood = {
	    type: "residential",
	    name: "Eastwood Village",
	    image: "https://www.villagesofirvine.com/remote.axd/s3.amazonaws.com/villagesofirvine/media/395468/9.jpg?anchor=center&mode=crop&width=1440&height=600&quality=80&rnd=132167315760000000",
	    description: "Experience a welcoming and social village lifestyle, where pathways invite connection from one neighborhood to the next, and robust recreation brings opportunities for fun and adventure. Brand new homes, trails, pools and the elementary school make Eastwood one of Irvine’s most popular villages.",
	    minRent: 3500,
	    maxRent: 4000,
	    price: "Low $2 millions"
	};
	eastwood.coords = jsonData.villages[3].coordinates[0].map(x => {return{lat: x[1], lng: x[0]}});
	generalData = [orchardHills, portolaSprings, eastwood];
	fs.writeFileSync('villagedata.json', JSON.stringify(generalData, null, 2));
    });
});

req.on('error', e => console.error(e));
req.end();
