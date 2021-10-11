import React from "react";
import Infocard from "./Infocard";
import Map from "./Map";
import Chart from "./Chart";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import urlcat from "urlcat";

// const BASEURL = `https://covid-api.mmediagroup.fr/v1/`;

const Infoboard = () => {
  const params = useParams();
  
//   console.log("Infoboard params", useParams());
//   const [status, setStatus] = useState("idle");
//   const [pageData, setPageData] = useState({confirmed:{}, deaths:{}});

//   const fetchData = async (url, category, state, stateMethod) => {
//     setStatus("pending");
//     try {
//       const res = await fetch(url);
//       const json = await res.json();
//       stateMethod({ ...state, [category]: json });
//     } catch (error) {
//       setStatus("error");
//     }
//   };

//   console.log(
//     "urlcat test",
//     urlcat(BASEURL, `/:category`, {
//       category: "history",
//       ab: "sg",
//       status: "confirmed",
//     })
//   );

//   useEffect(() => {
//     fetchData(
//       urlcat(BASEURL, `/:category`, {
//         category: "history",
//         ab: "sg",
//         status: "confirmed",
//       }),
//       "confirmed",
//       pageData,
//       setPageData
//     );
//     fetchData(
//       urlcat(BASEURL, `/:category`, {
//         category: "history",
//         ab: "sg",
//         status: "deaths",
//       }),
//       "deaths",
//       pageData,
//       setPageData
//     );
//   }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Map params={params}/>
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
