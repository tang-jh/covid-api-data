import React from "react";
import Infocard from "./Infocard";
import Linechart from "./Linechart";
import Piechart from "./Piechart";
import Map from "./Map";
import { Grid } from "@mui/material";
import { useParams } from "react-router";

const Infoboard = () => {
  const {abbr} = useParams();

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12} lg={6}>
          <Map params={abbr} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Infocard params={abbr} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12} lg={6}>
          <Linechart params={abbr} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Piechart params={abbr} />
        </Grid>
      </Grid>
    </>
  );
};

export default Infoboard;
