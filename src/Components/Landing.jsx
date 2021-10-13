import React, { useState, useEffect, useReducer } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import geodata from "../Data/10m_admin_0";
import urlcat from "urlcat";

let countryPoly;
const BASEURL = `https://covid-api.mmediagroup.fr/v1`;
const CASES = "cases";
const VACCINES = "vaccines";
const HISTORY = "history?status=confirmed";

const Landing = () => {
  const [landingMap, setLandingMap] = useState(null);
  const [status, setStatus] = useState("idle");
  const [casesData, setCasesData] = useState([]);
  const [vaccinesData, setVaccinesData] = useState();
  const [historyData, setHistoryData] = useState();
  
  const fetchData = async (category, setMethod) => {
    setStatus("pending");
    try {
      const res = await fetch(urlcat(BASEURL, category));
      const json = await res.json();
      setStatus("resolved");
      console.log("processjson", processJson(category)(json));
      setMethod(processJson(category)(json));
    } catch (error) {
      setStatus("error");
    }
  };

  const processJson = (datatype, obj) => {
    switch (datatype) {
        case CASES: return ((obj)=>{
            const arr = [];
          for (const k in obj) {
            if (obj[k].All.abbreviation) {
              arr.push({
                country: k,
                isoA2: obj[k].All.abbreviation,
                confirmed: obj[k].All.confirmed,
                deaths:obj[k].All.deaths,
                population: obj[k].All.population
              });
            }
          }
          return arr;});
        
          case VACCINES: return ((obj)=>{
            const arr = [];
          for (const k in obj) {
            if (obj[k].All.abbreviation) {
              arr.push({
                country: k,
                isoA2: obj[k].All.abbreviation,
                population: obj[k].All.population,
                administered: obj[k].All.administered,
                vaccinated:obj[k].All.people_vaccinated,
                percent_vaccinated: ((obj[k].All.people_vaccinated/obj[k].All.population)*100).toFixed(1)
              });
            }
          }
          return arr;});
          case HISTORY: return (obj) => {
            const arr = [];
            for (const k in obj) {
              if (obj[k].All.abbreviation) {
                arr.push({
                  country: k,
                  isoA2: obj[k].All.abbreviation,
                  population: obj[k].All.population,
                  dates: obj[k].All.dates,
                });
              }
            }
            return arr;
          };
          default: return obj;
        }
    }
  

  useEffect(() => {
    fetchData(CASES, setCasesData);
    fetchData(VACCINES, setVaccinesData);
    fetchData(HISTORY, setHistoryData);
  }, []);

  useEffect(() => {
    if (!landingMap) return;

    // if (polylayer) {
    //   map.removeLayer(polylayer);
    // }
    countryPoly = L.geoJSON(geodata).addTo(landingMap);
  }, [landingMap]);

  return (
    <div>
      <h2>Landing page</h2>
      <MapContainer
        id="landing-map"
        center={[46.8, 8.2]}
        zoom={2}
        scrollWheelZoom={true}
        whenCreated={setLandingMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Landing;
