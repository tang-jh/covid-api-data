import React from "react";
import urlcat from "urlcat";
import { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import numbro from "numbro";
import format from "date-fns/format";
import {makeStyles} from "@mui/styles"

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`;

const useStyles = makeStyles(() => ({
  dataVal: {
    color: "#17517e",
  },
}));

const Infocard = (props) => {
  const abbr = props.params;
  const classes = useStyles();
  const [status, setStatus] = useState("idle");
  const [cardData, setCardData] = useState();
  const [lastUpdated, setLastUpdated] = useState();

  console.log("Map params", abbr);

  useEffect(() => {
    const fetchData = (async () => {
      setStatus("pending");
      try {
        const res = await fetch(urlcat(BASEURL, `/cases`, { ab: abbr }));
        const json = await res.json();
        console.log("InfoCard", json);
        setStatus("resolved");
        setCardData(json);
        setLastUpdated(json.All.updated === undefined ? json[getNextAttr(json)].updated : json.All.updated);
      } catch (error) {
        setStatus("error");
      }
    })();
  }, [abbr]);

  const getNextAttr = (obj) => {
    const keys = Object.keys(obj);
    return keys[1];
  };

  return (
    <>
      <div
        style={
          status === "resolved" ? { display: "block" } : { display: "none" }
        }
      >
        <Typography variant="h4">{cardData?.All?.country}</Typography>
        <p>
          ISO A2:{" "}
          <span className={classes.dataVal}>{cardData?.All?.abbreviation}</span>
        </p>
        <p>
          ISO N3: <span className={classes.dataVal}>{cardData?.All?.iso}</span>
        </p>
        <p>
          Population:{" "}
          <span className={classes.dataVal}>
            {numbro(cardData?.All?.population).format({
              thousandSeparated: true,
            })}
          </span>
        </p>
        <p>
          Area:{" "}
          <span className={classes.dataVal}>
            {numbro(cardData?.All?.sq_km_area).format({
              thousandSeparated: true,
            })}{" "}
            km<sup>2</sup>
          </span>
        </p>
        <p>
          Data last updated:{" "}
          <span className={classes.dataVal}>
            {lastUpdated
              ? format(new Date(lastUpdated), "cccc, dd MMM yyyy")
              : "waiting"}
          </span>
        </p>
      </div>
      {status === "pending" ? (
        <Grid container justifyContent="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : null}
      {status === "error" ? (
        <Grid container justifyContent="center">
          <Grid item> No data</Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default Infocard;
