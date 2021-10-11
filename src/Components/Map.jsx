import React, { useRef } from "react";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import geodata from "../Data/50m_admin0";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Map = (props) => {
  const { abbr } = useParams();
  const [mapData, setMapData] = useState();
  const mapRef = useRef(null);

  console.log("Map params", abbr);

  useEffect(() => {
    let regex = new RegExp(abbr, "i");
    setMapData(
      geodata.features.filter((item) => item.properties.ISO_A2.match(regex))[0]
    );
  }, [abbr]);

  useEffect(() => {
    const map = mapRef.current?.leafletElement;
    console.log("UseMap", map);
    if (map) {
      map.fitBounds(L.geoJSON(mapData).getBounds());
    }
  }, [mapData]);

  // const country = (geodata.features.filter(item=> item.properties.NAME_EN === /China/))[0];
  const country = geodata.features.filter((item) =>
    item.properties.ISO_A2.match(/au/i)
  )[0];
  console.log("Test CN country", country);
  console.log("state bound", L.geoJSON(mapData).getBounds());
  console.log("test bound", L.geoJSON(country).getBounds());

  // console.log("bbox", L.geoJSON(country).getBounds());
  // console.log("geodata", geodata);
  // console.log("geodata", geodata.features);

  const bbox = (geoObj) => {
    console.log(geoObj);
    L.geoJSON(geoObj).getBounds();
  };

  return (
    <div id="map">
      <MapContainer
        bounds={L.geoJSON(country).getBounds()}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={mapData} pathOptions={{ color: "#ff6d00" }}>
          <Popup>
            {`Formal name: ${mapData?.properties.FORMAL_EN}`} <br />
            {`ISO A2: ${mapData?.properties.ISO_A2}`}
          </Popup>
        </GeoJSON>
      </MapContainer>
    </div>
  );
};

export default Map;
