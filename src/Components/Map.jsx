import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import geodata from "../Data/50m_admin0";
import { useParams } from "react-router";

let polylayer;

const Map = () => {
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
    if (L.geoJSON(mapData).getBounds()) {
      map.fitBounds(L.geoJSON(mapData).getBounds());
    } else {
      map.fitBounds([
        [110, 110],
        [-110, -110],
      ]);
    }
    if (polylayer) {
      map.removeLayer(polylayer);
    }
    polylayer = L.geoJSON(mapData, { style: { color: "#ff6d00" } }).addTo(map);
    console.log("MAP", map);
  }, [mapData, map]);

  return (
    <div id="map">
      <MapContainer zoom={2} scrollWheelZoom={true} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
