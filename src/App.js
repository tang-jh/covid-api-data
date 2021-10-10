import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  Drawer,
  Divider,
  AppBar,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import Infocard from "./Components/Infocard";
import Map from "./Components/Map";
import Sidebar from "./Components/Sidebar";
import Chart from "./Components/Chart";
import { flexbox } from "@mui/system";
import Infoboard from "./Components/Infoboard";

const CASES = "cases";
const HISTORY = "history";
const VACCINES = "vaccines";

const drawerWidth = 240;
const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
});

function App(props) {
  const COVID_API = `https://covid-api.mmediagroup.fr/v1/`;
  // const category = [CASES, HISTORY, VACCINES];
  const classes = useStyles();

  const [status, setStatus] = useState("idle");
  const [appdata, setAppData] = useState(["Fetching country list"]);

  useEffect(() => {
    const fetchData = (async () => {
      setStatus("pending");
      try {
        const res = await fetch(`${COVID_API}${CASES}`);
        const json = await res.json();
        setAppData(Object.keys(json));
      } catch (error) {
        setStatus("error");
      }
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5"> List of Countries</Typography>
        </div>
        <Sidebar items={appdata} />
      </Drawer>
      <Infoboard />

      {/* <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <h1>COVID-19 API Data</h1>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          justifyContent="flex-start"
        >
          <Grid item s={3} sx={{maxHeight: 800}}>
            <Sidebar items={appdata} />
          </Grid>
          <Grid item s={9}>
            <Map />
            <Infocard />
            <Chart />
          </Grid>
        </Grid> */}

      {/* <Grid container spacing={1}>
          <Grid item xs={2}>
            <Sidebar items={appdata} />
          </Grid>
          <Grid item s={10}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Map />
                <Infocard />
                <Chart />
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
    </div>
  );
}

export default App;
