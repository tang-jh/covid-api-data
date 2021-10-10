import React from "react";
import Infocard from "./Infocard";
import Map from "./Map";
import Chart from "./Chart";
import { Box, Grid } from "@mui/material";

const Infoboard = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}><Map /></Grid>
        <Grid item xs={12} md={6}><Infocard /></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}><Chart /></Grid>
      </Grid>
    </Box>
  );
};

export default Infoboard;
