import React from "react";
import Infocard from "./Infocard";
import Map from "./Map";
import Chart from "./Chart";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const Infoboard = () => {

  

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Map />
        </Grid>
        <Grid item xs={12} md={6}>
          <Infocard />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Chart />
        </Grid>
      </Grid>
    </>
  );
};

export default Infoboard;
