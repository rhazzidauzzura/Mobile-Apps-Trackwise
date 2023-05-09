import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Location() {
  return (
    <MapContainer center={[-6.200000, 106.816666]} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-6.200000, 106.816666]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Location;