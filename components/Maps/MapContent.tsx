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

      let irvineRegion = new window.google.maps.Polygon({
        map,
        paths: irvineBorder,
        fillColor: "#FF0000",
        fillOpacity: 0,
        strokeColor: "#FFD700",
        strokeWeight: 8,
      });
      
      let icCommunities = irvineCommunities.map((community) => {
        return new window.google.maps.Marker({
          map,
          position: community,
        });
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
		
				// Create a new InfoWindow.
				infoWindow = new google.maps.InfoWindow({
					position: mapsMouseEvent.latLng,
				});
				infoWindow.setContent(
					JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
				);
				infoWindow.open(map);
			});
    });
      
    return (
        /* @ts-ignore */
        <div ref={ref} id="map" className="w-full h-full"/>
    );
  }