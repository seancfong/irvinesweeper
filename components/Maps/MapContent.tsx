import { useEffect, useRef, useState } from "react";
import { styledMapType, irvineBorder, irvineCommunities } from "./MapStyles";
import { getCircleFill, calculateMinimumDistance } from "@/helpers";
import irvineData from "@/pages/api/data.json"

type Props = {
    center: google.maps.LatLngLiteral;
    zoom: number;
		setIsDrawerOpen: any;
		setDrawerData: any;
		savedClicks: any;
		setSavedClicks: any;
}

export const MapContent = ({ center, zoom, setIsDrawerOpen, setDrawerData, savedClicks, setSavedClicks }: Props) => {
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
			
			let irvineRegion = new window.google.maps.Polygon({
				map,
				paths: [irvineBorder],
				fillColor: "rgb(150,150,150)",
				fillOpacity: 0.3,
				strokeColor: "#EAB305",
				strokeWeight: 8,
			});

			let infoWindow = new google.maps.InfoWindow({
				content: "Click the map to get Lat/Lng!",
				position: {
					lat: 33.64052,
					lng: -117.715126
				},
			});
		
			// infoWindow.open(map);

			// Click not Irvine Company listener
			irvineRegion.addListener("click", (mapsMouseEvent: any) => {
				// Close the current InfoWindow.
				infoWindow.close();
				
				const locObj = { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() }

				const minDistance = calculateMinimumDistance(locObj, irvineCommunities)

				const circleFill = getCircleFill(minDistance);

				const maxRadius = 500;
				let iRadius = 0;
				let dRadius = 50;

				let circle =  new window.google.maps.Circle({
					map,
					center: locObj,
					strokeColor: "#333333",
					strokeOpacity: 0,
					strokeWeight: 1.5,
					fillColor: circleFill,
					fillOpacity: 0.5,
					radius: iRadius
        });

				const circleInterval = setInterval(() => {
					if (iRadius < maxRadius) {
						iRadius += dRadius;
						circle.setRadius(iRadius);
					} else {
						clearInterval(circleInterval);
					}
				}, 20);
				// @ts-ignore
				setSavedClicks(savedClicks => [...savedClicks, circle]);

				// Create a new InfoWindow.
				// infoWindow = new google.maps.InfoWindow({
				// 	position: mapsMouseEvent.latLng,
				// });
				// infoWindow.setContent(
				// 	minDistance.toString() + "mi"
				// );
				// infoWindow.open(map);


			});

			irvineData.map((community: any) => {
				const { coords } = community;

				let circle =  new window.google.maps.Circle({
					map,
					center: coords,
					strokeColor: "#FF0000",
					strokeOpacity: 0,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.5,
					radius: 500
        });

				// Click on Irvine Company listener
				circle.addListener("click", (mapsMouseEvent: any) => {
					// Close the current InfoWindow.
					infoWindow.close();

					console.log('click irvine company');
					
					setDrawerData(community);
					setIsDrawerOpen(true);
				});

				return circle;
      });
			
    }, []);
     
		useEffect(() => {
			console.log(savedClicks);
		}, [savedClicks])

    return (
        /* @ts-ignore */
        <div ref={ref} id="map" className="w-full h-full"/>
    );
  }