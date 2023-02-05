import { log } from "console";
import { useEffect, useRef } from "react";
import { styledMapType, irvineBorder, irvineCommunities } from "./MapStyles";

type Props = {
    center: google.maps.LatLngLiteral;
    zoom: number;
}


export const MapContent = ({ center, zoom }: Props) => {
    const ref = useRef();
    
    const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
        },
    }
    
    useEffect(() => {
			// Init map
			/* @ts-ignore */
      const map = new window.google.maps.Map(ref.current, mapOptions);

	  // Init styles
      const styles = new google.maps.StyledMapType(styledMapType, { name: "Styled Map"})

      map.mapTypes.set("styled_map", styles);
      map.setMapTypeId("styled_map");

	  let ic
			
			// let everythingElse = [
			// 	{lat: 0, lng: -80},
			// 	{lat: 0, lng: 80},
			// 	{lat: 80, lng: -80},
			// 	{lat: 80, lng: 80},
			// ];
			
			let irvineRegion = new window.google.maps.Polygon({
				map,
				paths: [irvineBorder],
				fillColor: "rgb(150,150,150)",
				fillOpacity: 0.3,
				strokeColor: "#FFD700",
				strokeWeight: 8,
			});

			let infoWindow = new google.maps.InfoWindow({
				content: "Click the map to get Lat/Lng!",
				position: {
					lat: 33.64052,
					lng: -117.715126
			},
			});
		
			infoWindow.open(map);

			irvineRegion.addListener("click", (mapsMouseEvent: any) => {
				// Close the current InfoWindow.
				infoWindow.close();

				console.log('click wrong')
		
				// Create a new InfoWindow.
				infoWindow = new google.maps.InfoWindow({
					position: mapsMouseEvent.latLng,
				});
				infoWindow.setContent(
					"You clicked wrong!"
				);
				infoWindow.open(map);
			});

			let icCommunities = irvineCommunities.map((community) => {
				let circle =  new window.google.maps.Circle({
					map,
					center: community,
					strokeColor: "#FF0000",
					strokeOpacity: 0,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0,
					radius: 500
        });

				circle.addListener("click", (mapsMouseEvent: any) => {
					// Close the current InfoWindow.
					infoWindow.close();

					console.log('click right')
			
					// Create a new InfoWindow.
					infoWindow = new google.maps.InfoWindow({
						position: mapsMouseEvent.latLng,
					});
					infoWindow.setContent(
						"You clicked on Irvine Company!"
					);
					infoWindow.open(map);
				});

				return circle;

				// return new window.google.maps.Polygon({
				// 	map,
				// 	paths: [
				// 		{lat: community.lat + 0.003, lng: community.lng - 0.003},
				// 		{lat: community.lat + 0.003, lng: community.lng + 0.003},
				// 		{lat: community.lat - 0.003, lng: community.lng + 0.003},
				// 		{lat: community.lat - 0.003, lng: community.lng - 0.003},
				// 		{lat: community.lat + 0.003, lng: community.lng - 0.003},
				// 	]
        // });

				// return new window.google.maps.Marker({
				// 	map,
        //   position: community,
        // });
      });
			
    });
      
    return (
        /* @ts-ignore */
        <div ref={ref} id="map" className="w-full h-full"/>
    );
  }