import { useEffect, useRef, useState } from "react";
import { styledMapType, irvineBorder, irvineCommunities } from "./MapStyles";
import { getCircleFill, calculateMinimumDistance } from "@/helpers";
import irvineData from "@/pages/api/data.json";

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
};

export const MapContent = ({
  setPanControl,
  isActive,
  changeBalance,
  center,
  zoom,
  setIsDrawerOpen,
  setDrawerData,
  savedClicks,
  setSavedClicks,
}: Props) => {
  const _debugFillOpacity = 0;
  const ref = useRef();

  const mapOptions: google.maps.MapOptions = {
    center,
    zoom: zoom,
    minZoom: zoom - 1,
    disableDefaultUI: true,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
    },
    restriction: {
      latLngBounds: {
        north: 33.9,
        south: 33.45,
        west: -118.15,
        east: -117.25,
      },
      strictBounds: true,
    },
  };

  useEffect(() => {
    // Init map
    /* @ts-ignore */
    const map = new window.google.maps.Map(ref.current, mapOptions);

    //  Init styles
    const styles = new google.maps.StyledMapType(styledMapType, {
      name: "Styled Map",
    });

    map.mapTypes.set("styled_map", styles);
    map.setMapTypeId("styled_map");

    console.log("pan control");
    setPanControl(() => () => {
      map.panTo(center);
      map.setZoom(zoom);
    });

    let everythingElse = [
      new google.maps.LatLng(34.14392, -118.9755),
      new google.maps.LatLng(33.08752, -118.89791),
      new google.maps.LatLng(33.12404, -116.96191),
      new google.maps.LatLng(34.35733, -117.05959),
    ];

    // Create a separate display so users can click on the irvine region with z index above it
    let irvineRegionDisplay = new window.google.maps.Polygon({
      map,
      paths: [irvineBorder, everythingElse],
      fillColor: "rgb(220,220,220)",
      fillOpacity: 0.5,
      strokeColor: "#ffffff",
      strokeOpacity: 1,
      strokeWeight: 4,
    });

    let irvineRegion = new window.google.maps.Polygon({
      map,
      paths: [irvineBorder],
      fillOpacity: 0,
      strokeColor: "#ffffff",
    });

    // Click not Irvine Company listener
    irvineRegion.addListener("click", (mapsMouseEvent: any) => {
      changeBalance(100);
      console.log("not irvine company");

      const locObj = {
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      };

      const minDistance = calculateMinimumDistance(locObj, irvineCommunities);

      const circleFill = getCircleFill(minDistance);

      const maxRadius = 500;

      let circleAniIndex = 0;
      let circleKeyframes = [
        0.0625, 0.09, 0.1225, 0.16, 0.2025, 0.25, 0.3, 0.36, 0.4225, 0.49,
        0.5625, 0.64, 0.7225, 0.81, 0.9025, 1.0, 1.1025, 1.15, 1.18, 1.15,
        1.1025, 0.98, 1.0,
      ];

      let circle = new window.google.maps.Circle({
        map,
        center: locObj,
        strokeColor: "#333333",
        strokeOpacity: 0,
        strokeWeight: 1.5,
        fillColor: circleFill,
        fillOpacity: 0.6,
        radius: 0,
      });

      const circleInterval = setInterval(() => {
        if (circleAniIndex < circleKeyframes.length) {
          circle.setRadius(circleKeyframes[circleAniIndex] * maxRadius);
          circleAniIndex++;
        } else {
          clearInterval(circleInterval);
        }
      }, 1000 / 60);
      // @ts-ignore
      setSavedClicks((savedClicks) => [...savedClicks, circle]);
    });

    // var heatmapData: Array<any> = [];

    // irvineData.forEach((community: any) => {
    //   const { coords } = community;

    //   console.log("e", community.type);

    //   if (community.type == "residential") {
    //     coords.forEach((coord: any) => {
    //       heatmapData.push({
    //         location: new google.maps.LatLng(coord.lat, coord.lng),
    //         weight: 0.01,
    //       });
    //     });
    //   }
    //   if (!coords.lat || !coords.lng) return;

    //   if (community.type == "apartment") {
    //     heatmapData.push({
    //       location: new google.maps.LatLng(coords.lat, coords.lng),
    //       weight: 0.5,
    //     });
    //   } else if (community.type == "retail") {
    //     heatmapData.push({
    //       location: new google.maps.LatLng(coords.lat, coords.lng),
    //       weight: 0.3,
    //     });
    //   } else if (community.type == "office") {
    //     heatmapData.push({
    //       location: new google.maps.LatLng(coords.lat, coords.lng),
    //       weight: 0.3,
    //     });
    //   }
    // });

    // // console.log(heatmapData);

    // var heatMap = new google.maps.visualization.HeatmapLayer({
    //   data: heatmapData,
    //   radius: 80,
    //   opacity: 0.5,
    // });
    // heatMap.setMap(map);

    irvineData.map((community: any) => {
      const { coords } = community;
      let shape = null;
      let zInd = 0;
      if (community.type == "residential" || community.type == "special") {
        if (community.type == "special") {
          zInd = 5;
        } else {
          zInd = 3;
        }
        shape = new window.google.maps.Polygon({
          // @ts-ignore
          map,
          paths: community.coords,
          fillColor: "rgb(0,0,0)",
          fillOpacity: _debugFillOpacity,
          strokeOpacity: 0,
          zIndex: zInd,
        });
      } else if (community.type == "office") {
        zInd = 1;
        console.log("found office");

        //  i have no idea about this one man
        // if (community.name == "Oak Canyon Business Center")
        shape = new window.google.maps.Circle({
          // @ts-ignore
          map,
          center: coords,
          strokeColor: "#FF0000",
          strokeOpacity: 0,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: _debugFillOpacity,
          radius: 400,
          zIndex: zInd,
        });
      } else {
        if (community.type == "retail") {
          zInd = 2;
        } else {
          zInd = 4;
        }
        let fillColor = community.type == "retail" ? "#00ff00" : "#0000ff";
        shape = new window.google.maps.Circle({
          // @ts-ignore
          map,
          center: coords,
          strokeColor: "#FF0000",
          strokeOpacity: 0,
          strokeWeight: 2,
          fillColor: fillColor,
          fillOpacity: _debugFillOpacity,
          radius: 450,
          zIndex: zInd,
        });
      }

      // Click on Irvine Company listener
      if (shape) {
        shape.addListener("click", (mapsMouseEvent: any) => {
          setDrawerData(community);
          setIsDrawerOpen(true);

          const circle = new google.maps.Circle({
            center: mapsMouseEvent.latLng,
            map: map,
            fillColor: "#FF0000",
            fillOpacity: 0.7,
            strokeOpacity: 0,
            radius: 450,
          });
          // @ts-ignore
          setSavedClicks((savedClicks) => [...savedClicks, circle]);
        });
      }

      return shape;
    });
  }, []);

  // useEffect(() => {
  // 	console.log(savedClicks);
  // }, [savedClicks])

  return (
    <>
      <div
        /* @ts-ignore */
        ref={ref}
        id="map"
        className={
          "w-full h-full transition duration-[2000ms] ease-in-out " +
          (isActive ? "scale-[100%]" : "scale-[110%]")
        }
      />
    </>
  );
};
