import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";
import { Button } from "@mui/material";
import urlcat from "urlcat";

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`; //?status=confirmed

const Chart = (props) => {
  
  // `https://covid-api.mmediagroup.fr/v1/history?status=confirmed&ab=sg`;

  // const fetchData = async (APIURL, stateSet, valName) => {
  //   setStatus("pending");
  //   try {
  //     const res = await fetch(APIURL);
  //     const json = await res.json();
  //     setStatus("resolved");
  //     stateSet(formatData(json.All.dates, valName));
  //   } catch (error) {
  //     setStatus("error");
  //   }
  // };
  const abbr = props.params;
  const [chartData, setChartData] = useState();
  const [category, setCategory] = useState("confirmed");
  const [status, setStatus] = useState("idle");

  const fetchData = async (url, category) => {
    setStatus("pending");
    try {
      const res = await fetch(url);
      const json = await res.json();
      setChartData(formatData(json.All.dates,category));
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData(urlcat(BASEURL, `/history`, {ab: abbr, status: category}), category);
    console.log("Chart url", urlcat(BASEURL, `/history`, { ab: abbr, status: category }));
  }, [abbr, category]);

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
    <LineChart height={400} width={800} data={chartData}>
      <Line
        type="monotone"
        data={chartData}
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
