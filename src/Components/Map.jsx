import { geoJSON } from "leaflet";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON
} from "react-leaflet";
import geodata from "../Data/50m_admin0";

const Map = () => {
    const country = geodata.features.filter(item=> item.properties.NAME_EN === "Singapore");
    console.log("geodata", geodata);
    console.log("geodata", geodata.features);
    console.log("geodata.features", geodata.features[5].properties.NAME_EN);
    console.log("bbox", country[0].bbox)
    console.log("country", country)
    return (
      <div id="map">
        <MapContainer
        //   center={[100.29027, 103.851959]}
          bounds={[
            [1.265,103.65],
            [1.447,103.996],
        ]}
          zoom={2}
          scrollWheelZoom={true}
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
          <GeoJSON data={country} bounds={country[0].bbox} />
          {/* <Polygon pathOptions={purple} positions={mys[0].geometry} /> */}
        </MapContainer>
      </div>
    );
}

export default Map;