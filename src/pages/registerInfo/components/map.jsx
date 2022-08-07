import * as React from "react";
import MapGl, {
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Layer,
  GeolocateControl,
  FullscreenControl,
  AttributionControl,
} from "react-map-gl";

import RoomIcon from "@mui/icons-material/Room";
import { registerContext } from "../../../context/register.context";
export default function Map() {
  const [popup, setPopup] = React.useState(true);
  const { registerInfo, setRegisterInfo } = React.useContext(registerContext);

  const [marker, setMarker] = React.useState({
    lat: "",
    lng: "",
  });

  const currentLocate = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setMarker({
        ...marker,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      console.log(marker);
    });
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setMarker({
        ...marker,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setRegisterInfo({ ...registerInfo, lat: marker.lat, lng: marker.lng });
      console.log(marker);
    });
  }, []);

  return (
    <MapGl
      initialViewState={{
        longitude: 102.6228224,
        latitude: 17.9765248,
        zoom: 10,
      }}
      style={{ width: "500px", height: "400px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoia29uZ2NoZWUiLCJhIjoiY2wzeTBkdGtrMHBrazNicWd4YmdxOHc0MiJ9.GeJSPrsB-aNk1G-y-72NxQ"
    >
      <Marker
        longitude={marker.lng}
        latitude={marker.lat}
        anchor="center"
        draggable
        onDragEnd={(e) => {
          setMarker({
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
          });
          setRegisterInfo({
            ...registerInfo,
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
          });

         // console.log(marker);
        }}
      >
        <RoomIcon color="error" />
      </Marker>
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showAccuracyCircle={false}
      />

      <NavigationControl />
      {/*popup && (
        <Popup
          longitude={marker.lng}
          latitude={marker.lat}
          anchor="bottom"
          onClose={() => setPopup(false)}
        >
          you are here
        </Popup>
      )*/}
      <ScaleControl />
    </MapGl>
  );
}
