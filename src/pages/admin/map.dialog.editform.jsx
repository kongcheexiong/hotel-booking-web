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
import { EditHotelContext } from "../../context/edithotel.context";

export default function MapDialogEdit(props) {
  const data = props.data;
  const { EditHotel, setEditHotel } = React.useContext(EditHotelContext);
  //const [popup, setPopup] = React.useState(true);
  // const {registerInfo, setRegisterInfo} = React.useContext(registerContext)
  // const marker = props.data
  const [marker, setMarker] = React.useState({
    lat: data?.hotel?.lat ,
    lng: data?.hotel?.lng,
  });

  React.useEffect(() => {
    console.log(data);
    setMarker({
      lat: data?.hotel?.lat,
      lng: data?.hotel?.lng,
    });
  }, []);

  return (
    <MapGl
      initialViewState={{
        longitude: 102.6228224,
        latitude: 17.9765248,
        zoom: 10,
      }}
      style={{ width: "500px", height: "350px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoia29uZ2NoZWUiLCJhIjoiY2wzeTBkdGtrMHBrazNicWd4YmdxOHc0MiJ9.GeJSPrsB-aNk1G-y-72NxQ"
    >
      {data?.hotel?.lng ? (
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
            // setRegisterInfo({...registerInfo, lat: marker.lat, lng: marker.lng})
            //
            // console.log(marker)
            setEditHotel({
              ...EditHotel,
              lat: e.lngLat.lat,
              lng: e.lngLat.lng,
            });
          }}
        >
          <RoomIcon color="error" />
        </Marker>
      ) : (
        <></>
      )}

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
