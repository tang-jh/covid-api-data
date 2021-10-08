import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

const Map = () => {
    return (
        <div id="map">
        <MapContainer
            center={[1.29027, 103.851959]}
            // bounds={mys.bbox}
            zoom={2}
            scrollWheelZoom={false}
        >
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[1.29027, 103.851959]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            {/* <Polygon pathOptions={purple} positions={mys[0].geometry} /> */}
        </MapContainer>
        </div>
    );
}

export default Map;