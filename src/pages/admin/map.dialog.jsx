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
//import {registerContext} from '../../../context/register.context'

export default function MapDialog(props) {
  const data = props.data;
  //const [popup, setPopup] = React.useState(true);
  // const {registerInfo, setRegisterInfo} = React.useContext(registerContext)
  // const marker = props.data
  React.useEffect(() => {
    console.log(data);
  }, []);

  return (
    <MapGl
      initialViewState={{
        longitude: 102.6228224,
        latitude: 17.9765248,
        zoom: 10,
      }}
      style={{ width: "550px", height: "400px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoia29uZ2NoZWUiLCJhIjoiY2wzeTBkdGtrMHBrazNicWd4YmdxOHc0MiJ9.GeJSPrsB-aNk1G-y-72NxQ"
    >
      <Marker
        longitude={data.hotel.lng}
        latitude={data.hotel.lat}
        anchor="center"
      >
        <RoomIcon color="error" />
      </Marker>
      : <></>
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showAccuracyCircle={false}
      />
      <NavigationControl />
      <ScaleControl />
    </MapGl>
  );
}
