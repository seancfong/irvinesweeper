import { useEffect, useRef } from "react";

type Props = {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

export const MapContent = ({ center, zoom }: Props) => {
    const ref = useRef();

    const irvineCoords = [
        { lat: 33.6846, lng: -117.8265 },
        { lat: 33.6794, lng: -117.8265 },
        { lat: 33.6794, lng: -117.8355 },
        { lat: 33.6846, lng: -117.8355 }
      ];
  
    const mapOptions = {
        center,
        zoom,
        disableDefaultUI: true,
    }

    useEffect(() => {
        /* @ts-ignore */
      const map = new window.google.maps.Map(ref.current, mapOptions);

      new window.google.maps.Polygon({
        paths: irvineCoords,
        map,
        fillColor: "#FF0000",
        fillOpacity: 0,
        strokeColor: "#FF0000",
        strokeWeight: 2
      })

      new google.maps.Marker({
        position: { lat: 33.6846, lng: -117.8265 },
        map: map,
      });
    });
      /* @ts-ignore */
    return (<div ref={ref} id="map" className="w-full h-screen" />);
  }