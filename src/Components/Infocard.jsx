import React from 'react'
import urlcat from 'urlcat'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`;


const Infocard = () => {
  const {abbr} = useParams();
  const [status, setStatus] = useState("idle");
  const [cardData, setCardData] = useState();

  console.log("Map params", abbr);

  useEffect(() => {
    const fetchData = (async () => {
      setStatus("pending");
          try {
            const res = await fetch(urlcat(BASEURL, `/cases`, {ab:abbr}));
            const json = await res.json();
            console.log("InfoCard", json)
            setCardData(json);
          } catch (error) {
            setStatus("error");
          }
    })();
  }, [abbr]);

  const getNextAttr = (obj) => {
    const keys = Object.keys(obj);
    return keys[1];
  }

  return (
    <div>
      <Typography variant="h5">{cardData?.All?.country}</Typography>
      <p>ISO A2: {cardData?.All?.abbreviation}</p>
      <p>ISO N3: {cardData?.All?.iso}</p>
      <p>Population: {cardData?.All?.population}</p>
      <p>Area: {cardData?.All?.sq_km_area}</p>
      <p>
        Data last updated:{" "}
        {cardData?.All?.updated === undefined
          ? cardData?.[getNextAttr(cardData)]?.updated
          : cardData?.All?.updated}
      </p>
    </div>
  );
}

export default Infocard
