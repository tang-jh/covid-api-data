import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import L from "leaflet";
import geodata from "../Data/50m_admin_0";
import urlcat from "urlcat";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router";

let countryPoly;
const BASEURL = `https://covid-api.mmediagroup.fr/v1`;
const CASES = "cases";
const VACCINES = "vaccines";
const HISTORY = "history?status=confirmed";

const Landing = () => {
  const [landingMap, setLandingMap] = useState(null);
  const [status, setStatus] = useState("idle");
  const [casesData, setCasesData] = useState([]);
  const [vaccinesData, setVaccinesData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [overlay, setOverlay] = useState([]);
  const history = useHistory();

  const fetchData = async (category, setMethod) => {
    setStatus("pending");
    try {
      const res = await fetch(urlcat(BASEURL, category));
      const json = await res.json();
      setStatus("resolved");
      setMethod(processJson(category)(json));
    } catch (error) {
      setStatus("error");
    }
  };

  const processJson = (datatype, obj) => {
    switch (datatype) {
      case CASES:
        return (obj) => {
          const arr = [];
          for (const k in obj) {
            if (obj[k].All.abbreviation) {
              arr.push({
                country: k,
                isoA2: obj[k].All.abbreviation,
                confirmed: obj[k].All.confirmed,
                deaths: obj[k].All.deaths,
                population: obj[k].All.population,
              });
            }
          }
          return arr;
        };

      case VACCINES:
        return (obj) => {
          const arr = [];
          for (const k in obj) {
            if (obj[k].All.abbreviation) {
              arr.push({
                country: k,
                isoA2: obj[k].All.abbreviation,
                population: obj[k].All.population,
                administered: obj[k].All.administered,
                vaccinated: obj[k].All.people_vaccinated,
                percent_vaccinated: parseFloat(
                  (
                    (obj[k].All.people_vaccinated / obj[k].All.population) *
                    100
                  ).toFixed(1)
                ),
              });
            }
          }
          return arr;
        };
      case HISTORY:
        return (obj) => {
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
      default:
        return obj;
    }
  };

  const processGeodata = (geoFeatures) => {
    const arr = [];
    let item = {};
    for (const f of geoFeatures) {
      for (const h of historyData) {
        if (f.properties.ISO_A2 === h.isoA2) {
          item = {
            ...f,
            properties: {
              ...f.properties,
              fivedays:
                h.dates[indexAt(h.dates, 0)] - h.dates[indexAt(h.dates, 4)],
              tendays:
                h.dates[indexAt(h.dates, 0)] - h.dates[indexAt(h.dates, 9)],
            },
          };
          arr.push(item);
          item={};
        }
      }
    }
    console.log("ProcessGeoData", arr);
    return arr;
  };

  const polyStyle = (currmax) => (feature) => {
    return {
      fillOpacity: feature.properties.fivedays / currmax,
      color: "#d5b23f",
      weight: 1
    };
  };

  const indexAt = (obj, index) => {
    const keys = Object.keys(obj);
    return keys[index];
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties.fivedays) {
      layer.bindPopup(`Cases in past five days <br/> <strong>${feature.properties.fivedays}</strong>`);
      layer.on("mouseover", (e)=>{e.target.openPopup()});
      layer.on("mouseout", (e)=>{e.target.closePopup()});
      layer.on("click", ()=>{history.push(`country/${feature.properties.ISO_A2}`)})
    }
  }

  useEffect(() => {
    fetchData(CASES, setCasesData);
    fetchData(VACCINES, setVaccinesData);
    fetchData(HISTORY, setHistoryData);
  }, []);

  useEffect(() => {
    setOverlay(processGeodata(geodata.features));
  }, [historyData]);

  useEffect(() => {
    if (!landingMap) return;
    if (countryPoly) {
      landingMap.removeLayer(countryPoly);
    }

    const fivedays = overlay.map((item) =>
      parseInt(item.properties.fivedays)
    );
    const maxFivedays = Math.max(...fivedays);

    countryPoly = L.geoJSON(overlay, { style: polyStyle(maxFivedays), onEachFeature:onEachFeature }).addTo(
      landingMap
    );
  }, [landingMap, overlay]);

  return (
    <div>
      <Typography gutterBottom={true} align="center" variant="h5">
        Global Statistics on COVID-19
      </Typography>
      <Grid
        container
        justifyContent="center"
        style={
          status !== "pending" ? { display: "flex" } : { display: "none" }
        }
      >
        <MapContainer
          id="landing-map"
          center={[12.24, 1.56]}
          zoom={2}
          scrollWheelZoom={true}
          whenCreated={setLandingMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Grid>
      {status === "pending" ? <CircularProgress /> : null}
    </div>
  );
};

export default Landing;
