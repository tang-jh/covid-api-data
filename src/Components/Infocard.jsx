import React from "react";
import urlcat from "urlcat";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`;

const Infocard = (props) => {
  const abbr = props.params;
  const [status, setStatus] = useState("idle");
  const [cardData, setCardData] = useState();

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
          status !== "pending" ? { display: "block" } : { display: "none" }
        }
      >
        <Typography variant="h4">{cardData?.All?.country}</Typography>
        <p>ISO A2: {cardData?.All?.abbreviation}</p>
        <p>ISO N3: {cardData?.All?.iso}</p>
        <p>Population: {cardData?.All?.population}</p>
        <p>
          Area: {cardData?.All?.sq_km_area} km<sup>2</sup>
        </p>
        <p>
          Data last updated:{" "}
          {cardData?.All?.updated === undefined
            ? cardData?.[getNextAttr(cardData)]?.updated
            : cardData?.All?.updated}
        </p>
      </div>
      {status === "pending" ? <CircularProgress /> : null}
    </>
  );
};

export default Infocard;
