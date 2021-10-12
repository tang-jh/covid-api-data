import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import geodata from "../Data/50m_admin0";
import { useParams } from "react-router";


let polylayer;

const Map = (props) => {
  const { abbr } = useParams();
  const [mapData, setMapData] = useState();
  const [map, setMap] = useState(null);


  console.log("Map params", abbr);

  useEffect(() => {
    let regex = new RegExp(abbr, "i");
    setMapData(
      geodata.features.filter((item) => item.properties.ISO_A2.match(regex))[0]
    );
  }, [abbr]);

  useEffect(() => {
    if (!map) return;
    if (L.geoJSON(mapData).getBounds()) {map.fitBounds(L.geoJSON(mapData).getBounds())} else {
      map.fitBounds([[110,110],[-110,-110]])
    }
      // map.fitBounds(L.geoJSON(mapData).getBounds());
    if (polylayer) {map.removeLayer(polylayer)}
    polylayer = L.geoJSON(mapData, {style:{ color: "#ff6d00" }}).addTo(map);
    console.log("MAP", map)
  }, [mapData, map]);

  // const country = (geodata.features.filter(item=> item.properties.NAME_EN === /China/))[0];
  const country = geodata.features.filter((item) =>
    item.properties.ISO_A2.match(/no/i)
  )[0];
  console.log("Test NO country", country);
  // console.log("state bound", L.geoJSON(mapData).getBounds());
  // console.log("test bound", L.geoJSON(country).getBounds());
  // console.log("bbox", L.geoJSON(country).getBounds());
  // console.log("geodata", geodata);
  // console.log("geodata", geodata.features);

  return (
    <div id="map">
      <MapContainer
        // bounds={L.geoJSON(country).getBounds()}
        zoom={2}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <GeoJSON data={mapData} pathOptions={{ color: "#ff6d00" }}>
          <Popup>
            {`Formal name: ${mapData?.properties.FORMAL_EN}`} <br />
            {`ISO A2: ${mapData?.properties.ISO_A2}`}
          </Popup>
        </GeoJSON> */}
      </MapContainer>
    </div>
  );
};

export default Map;
