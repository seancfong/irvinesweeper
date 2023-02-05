import { useEffect, useRef } from "react";
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
	changeBalance: any;
	isActive: boolean;
	setPanControl: any;
}

export const MapContent = ({ setPanControl, isActive, changeBalance, center, zoom, setIsDrawerOpen, setDrawerData, savedClicks, setSavedClicks }: Props) => {
    const ref = useRef();

    const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
		minZoom: zoom,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
        },
    }


    useEffect(() => {
      		// Init map
	/* @ts-ignore */
	  const map = new window.google.maps.Map(ref.current, mapOptions);

	//  Init styles
      const styles = new google.maps.StyledMapType(styledMapType, { name: "Styled Map"})

      map.mapTypes.set("styled_map", styles);
      map.setMapTypeId("styled_map");

	  console.log('pan control')
	  setPanControl(() => () => {
		map.panTo(center)
		map.setZoom(zoom)
		})

		let irvineRegion = new window.google.maps.Polygon({
			map,
			paths: [irvineBorder],
			fillColor: "rgb(150,150,150)",
			fillOpacity: 0.3,
			strokeColor: "#EAB305",
			strokeWeight: 8,
		});

		// Click not Irvine Company listener
		irvineRegion.addListener("click", (mapsMouseEvent: any) => {
			changeBalance(100);
			console.log('not irvine company')
			
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
				fillOpacity: 0.6,
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

		});

		irvineData.map((community: any) => {
			const { coords } = community;
			var shape = null;
			
			if(community.type == "reszone"){
				shape = new window.google.maps.Polygon({
					// @ts-ignore
					map,
					paths: community.coords,
					fillColor: "rgb(0,0,0)",
					fillOpacity: 0,
					strokeOpacity: 0,
				})
			}
			else{
				shape = new window.google.maps.Circle({
					// @ts-ignore
					map,
					center: coords,
					strokeColor: "#FF0000",
					strokeOpacity: 0,
					strokeWeight: 2,
					fillColor: "#000000",
					fillOpacity: 0,
					radius: 450
				});
			}

			// Click on Irvine Company listener
			if (shape) {
				shape.addListener("click", (mapsMouseEvent: any) => {					
					setDrawerData(community);
					setIsDrawerOpen(true);
				});
			}

			
			return shape;
		});
	
			
			
    }, []);
     
	// useEffect(() => {
	// 	console.log(savedClicks);
	// }, [savedClicks])

    return (
        /* @ts-ignore */
        <div ref={ref} id="map" className={"w-full h-full transition duration-[2000ms] ease-in-out " + (isActive ? "scale-[100%]" : "scale-[110%]")}/>
    );
  }