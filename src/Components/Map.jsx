import { geoJSON } from "leaflet";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  GeoJSON
} from "react-leaflet";
import L from "leaflet";
import geodata from "../Data/50m_admin0";

const Map = () => {
    

    // const country = (geodata.features.filter(item=> item.properties.NAME_EN === /China/))[0];
    const country = geodata.features.filter((item) =>
      item.properties.NAME_EN.match(/china/i)
    )[0];
    // console.log("bbox", L.geoJSON(country).getBounds());  
    // console.log("geodata", geodata);
    // console.log("geodata", geodata.features);
    console.log("country", country)
    return (
      <div id="map">
        <MapContainer
          //   center={[100.29027, 103.851959]}
          bounds={L.geoJSON(country).getBounds()}
          zoom={2}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={country} pathOptions={{ color: "#ff6d00" }}>
            <Popup>
              {`Formal name: ${country.properties.FORMAL_EN}`} <br />
              {`ISO A2: ${country.properties.ISO_A2}`}
            </Popup>
          </GeoJSON>
          {/* <Polygon pathOptions={purple} positions={mys[0].geometry} /> */}
        </MapContainer>
      </div>
    );
}

export default Map;