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
import { Button, CircularProgress, Grid } from "@mui/material";
import urlcat from "urlcat";
import numbro from "numbro";

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`;
const CONFIRMED = "confirmed";
const DEATHS = "deaths";

const Linechart = (props) => {
  const abbr = props.params;
  const [chartData, setChartData] = useState();
  const [category, setCategory] = useState("deaths");
  const [status, setStatus] = useState("idle");

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

  const axisFormatter = (value) => {
    if (value > 1000000000) {
      return (value / 1000000000).toString() + "B";
    } else if (value > 1000000) {
      return (value / 1000000).toString() + "M";
    } else if (value > 1000) {
      return (value / 1000).toString() + "K";
    } else {
      return value.toString();
    }
  }

  return (
    <>
      <div
        style={
          status === "resolved" ? { display: "block" } : { display: "none" }
        }
      >
        <Button onClick={() => setCategory(CONFIRMED)}>Confirmed</Button>
        <Button onClick={() => setCategory(DEATHS)}>Deaths</Button>
        <ResponsiveContainer width="100%" height={300}>
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
            <YAxis tickFormatter={axisFormatter}/>
            <Tooltip formatter={(value)=>numbro(value).format({thousandSeparated:true})} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {status === "pending" ? (
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : null}
      {status === "error" ? (
        <Grid container alignItems="center" justifyContent="center">
          <Grid item> No data</Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default Linechart;
