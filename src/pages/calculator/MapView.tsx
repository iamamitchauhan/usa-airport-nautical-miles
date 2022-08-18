import { GoogleApiWrapper, Map, Marker, Polyline } from "google-maps-react";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY as string;

interface LatLng {
  lat: number;
  lng: number;
}

interface FromTo {
  value: LatLng;
  label: string;
  shortCode: string;
}

interface Props {
  paths: FromTo[];
  google: any;
  center: LatLng;
}

const MapView = ({ paths, center, google }: Props) => {
  const routes = paths.map((o) => o.value);
  const source = paths[0];
  const destination = paths[paths.length - 1];

  const containerStyle = {
    position: "static",
    width: "100%",
    height: "38vh",
  };

  return (
    <Map
      google={google}
      zoom={5}
      containerStyle={containerStyle}
      initialCenter={{
        lat: 33.9415933,
        lng: -118.4107187,
      }}
      center={center}
    >
      <Marker title={source.label} position={source.value} animation={google.maps.Animation.DROP} />

      <Marker
        icon={{
          url: google.maps.SymbolPath.CIRCLE,
          anchor: new google.maps.Point(32, 32),
          scaledSize: new google.maps.Size(64, 64),
        }}
        title={destination.label}
        position={destination.value}
        animation={google.maps.Animation.DROP}
      />

      <Polyline path={routes} strokeColor="blue" strokeOpacity={0.8} strokeWeight={3} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey,
})(MapView);
