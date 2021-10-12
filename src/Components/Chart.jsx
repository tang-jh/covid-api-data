import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { Button, CircularProgress } from "@mui/material";
import urlcat from "urlcat";
import { Box } from "@mui/system";

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`; //?status=confirmed
const CONFIRMED = "confirmed";
const DEATHS = "deaths";

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
  const [category, setCategory] = useState("deaths");
  const [status, setStatus] = useState("idle");
  const [chartKey, setChartKey] = useState(0);


  const fetchData = async (url, category) => {
    setStatus("pending");
    try {
      const res = await fetch(url);
      const json = await res.json();
      setStatus("resolved");
      setChartData(formatData(json.All.dates, category));
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData(
      urlcat(BASEURL, `/history`, { ab: abbr, status: category }),
      category
    );
    console.log(
      "Chart url",
      urlcat(BASEURL, `/history`, { ab: abbr, status: category })
    );
  }, [abbr, category]);

  const formatData = (data, valName) => {
    const dataArr = [];
    for (const item in data) {
      dataArr.unshift({
        date: format(new Date(item), "yyyy-MM-dd"),
        [valName]: data[item],
      });
    }
    console.log("DateArr", dataArr);
    return dataArr;
  };

  const handleClick = (category) => {
    setCategory(category);
    // setChartKey(chartKey===0?1:0);
  }

  // key = { chartKey };
  return (
    <>
      <div
        style={
          status !== "pending" ? { display: "block" } : { display: "none" }
        }
      >
        <Button onClick={() => handleClick(CONFIRMED)}>Confirmed</Button>
        <Button onClick={() => handleClick(DEATHS)}>Deaths</Button>
        <ResponsiveContainer width="50%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              data={chartData}
              dataKey={category}
              stroke={category === CONFIRMED ? "#145DA0" : "#A36F18"}
              dot={false}
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {status === "pending" ? <CircularProgress /> : null}
    </>
  );
};

export default Chart;
