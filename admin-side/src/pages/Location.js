import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Location(props) {
  const latLong = [Number(props.lat), Number(props.long)];

  return (
    <MapContainer center={latLong} zoom={15} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={latLong}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Location;
