import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapContent } from "./MapContent";
import { ReactElement } from "react";

export interface ProcessEnv {
    [key: string]: string;
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    /* @ts-ignore */
  return null;
};


export function GoogleMaps() {
    const center = { lat: 33.7, lng: -117.76 };
    const zoom = 13;

    let mapsKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_KEY"];

    return (
      <Wrapper apiKey={mapsKey ?? ""} render={render}>
        <MapContent center={center} zoom={zoom}/>
      </Wrapper>
    );
  }