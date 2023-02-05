import { useEffect, useRef, useState } from "react";
import { styledMapType, irvineBorder, irvineCommunities } from "./MapStyles";
import { getCircleFill, calculateMinimumDistance, fetcher } from "@/helpers";

type Props = {
    center: google.maps.LatLngLiteral;
    zoom: number;
		setIsDrawerOpen: any;
}

export const MapContent = ({ center, zoom, setIsDrawerOpen }: Props) => {
    const ref = useRef();
		const [savedClicks, setSavedClicks] = useState<Array<any>>([]);

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
				setSavedClicks(savedClicks => [...savedClicks, locObj]);

				const minDistance = calculateMinimumDistance(locObj, irvineCommunities)

				const circleFill = getCircleFill(minDistance);

				let circle =  new window.google.maps.Circle({
					map,
					center: locObj,
					strokeColor: "#FF0000",
					strokeOpacity: 0,
					strokeWeight: 2,
					fillColor: circleFill,
					fillOpacity: 0.3,
					radius: 500
        });

				// Create a new InfoWindow.
				infoWindow = new google.maps.InfoWindow({
					position: mapsMouseEvent.latLng,
				});
				infoWindow.setContent(
					minDistance.toString() + "mi"
				);
				infoWindow.open(map);
			});

			irvineCommunities.map((community: any) => {
				console.log(community);

				let circle =  new window.google.maps.Circle({
					map,
					center: community,
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

					console.log('click right');
			
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