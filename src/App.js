import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Datacard from "./Components/Datacard";
import Map from './Components/Map';
import Sidebar from "./Components/Sidebar";

const CASES = "cases";
const HISTORY = "history";
const VACCINES = "vaccines";

function App() {
  const COVID_API = `https://covid-api.mmediagroup.fr/v1/`;
  // const category = [CASES, HISTORY, VACCINES];
  const [status, setStatus] = useState("idle");
  const [appdata, setAppData] = useState(["Fetching country list"]);

  useEffect(() => {
    const fetchData = (async () => {
      setStatus("pending");
      try {
        const res = await fetch(`${COVID_API}${CASES}`);
        const json = await res.json();
        console.log(Object.keys(json));
        setAppData(Object.keys(json));
      } catch (error) {
        setStatus("error");
      }
    })();
  }, []);

  return (
    <CssBaseline>
      <div className="App">
        <Grid container justifyContent="center" spacing={2}>
          <Grid item s={12}>
            <h1>COVID-19 API Data</h1>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Sidebar items={appdata} />
          </Grid>
          <Grid item s={10}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Map />
                <Datacard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default App;
