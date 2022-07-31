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
import { font, SERVER_URL } from "../../constants";

import axios from "axios";
//import {registerContext} from '../../../context/register.context'

export default function HotelMap() {
  const [hotels, setHotels] = React.useState([]);

  //const [popup, setPopup] = React.useState(true);
  // const {registerInfo, setRegisterInfo} = React.useContext(registerContext)
  // const marker = props.data

  const fetchHotel = async () => {
    await axios
      .get(`${SERVER_URL}/api/is-approved-hotels`)
      .then((res) => {
       
        setHotels(res.data);
        console.log(hotels);
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <>
  
     <MapGl
      initialViewState={{
        longitude: 102.6228224,
        latitude: 17.9765248,
        zoom: 10,
      }}
      style={{ width: "900px", height: "550px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoia29uZ2NoZWUiLCJhIjoiY2wzeTBkdGtrMHBrazNicWd4YmdxOHc0MiJ9.GeJSPrsB-aNk1G-y-72NxQ"
    >
        
      {hotels.map((hotel, idx) => {
        return <Marker
          key={idx}
          longitude={hotel?.lng}
          latitude={hotel?.lat}
          anchor="center"
        >
        <div style={{
            fontFamily: `${font.LAO_FONT}`,
            
        }}>{hotel?.hotelName}</div>
          <RoomIcon color="error" />
        </Marker>;
      })}

      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showAccuracyCircle={false}
      />

      <NavigationControl />

      <ScaleControl />
    </MapGl>
    </>
   
  );
}
