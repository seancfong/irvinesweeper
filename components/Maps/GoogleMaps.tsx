import { Wrapper } from "@googlemaps/react-wrapper";
import { MapContent } from "./MapContent";

export interface ProcessEnv {
    [key: string]: string;
}

export function GoogleMaps() {
    const center = { lat: 33.6846, lng: -117.8265 };
    const zoom = 12;

    let mapsKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_KEY"];

    return (
      <Wrapper apiKey={mapsKey ?? ""}>
        <MapContent  center={center} zoom={zoom}/>
      </Wrapper>
    );
  }