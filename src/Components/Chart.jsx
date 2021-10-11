import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";
import { Button } from "@mui/material";

const Chart = () => {
  // `https://covid-api.mmediagroup.fr/v1/history?status=confirmed&ab=sg`;

  const fetchData = async (APIURL, stateSet, valName) => {
    setStatus("pending");
    try {
      const res = await fetch(APIURL);
      const json = await res.json();
      setStatus("resolved");
      stateSet(formatData(json.All.dates, valName));
    } catch (error) {
      setStatus("error");
    }
  };

  const [confirmedData, setConfirmedData] = useState();
  const [deathsData, setdeathsData] = useState();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchData(
      `https://covid-api.mmediagroup.fr/v1/history?status=confirmed&ab=sg`,
      setConfirmedData,
      "confirmed"
    );

    fetchData(
      `https://covid-api.mmediagroup.fr/v1/history?status=deaths&ab=sg`,
      setdeathsData,
      "deaths"
    );
  }, []);

  const formatData = (data, valName) => {
    const dataArr = [];
    for (const item in data) {
      dataArr.unshift({
        date: format(new Date(item), "yyyy-mm-dd"),
        [valName]: data[item],
      });
    }
    return dataArr;
  };

  return (
    <LineChart height={400} width={800} data={confirmedData}>
      <Line
        type="monotone"
        data={confirmedData}
        dataKey="confirmed"
        stroke={"#8884d8"}
      />

      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
