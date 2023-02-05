export const getCircleFill = (miles: number) : string => {
	if (0 < miles && miles < 0.8) {
        return "rgba(250,30,30)";
    } else if (miles < 1.3) {
        return "rgba(250,250,30)";
    }
    return "#eeeeee"
}	

export const calculateMinimumDistance = (loc : any, irvineCommunities : any) => {
	let r = 6371e3 
	let clickLat = loc.lat*Math.PI/180
	
	var minDistance = -1	

	irvineCommunities.forEach((element: any) => {
		let tempLat = element.lat*Math.PI/180

		let deltaLat = (loc.lat-element.lat) * Math.PI/180;
		let deltaLng = (loc.lng-element.lng) * Math.PI/180;

		let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(tempLat) * Math.cos(clickLat) * Math.sin(deltaLng/2) * Math.sin(deltaLng/2)

		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
		
		let result = r*c
		
		if(minDistance == -1 || minDistance > result){
			minDistance = result;
		}
	});
	return Math.round((minDistance * 0.000621371) * 100)/100
}

export const fetcher = (url: any) => fetch(url).then((res) => res.json());