import { CircularProgress } from "@mui/material";
import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import urlcat from "urlcat";

const BASEURL = `https://covid-api.mmediagroup.fr/v1/`;

const Piechart = (props) => {
  const abbr = props.params;
  const [chartData, setChartData] = useState();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchData = (async () => {
      setStatus("pending");
      try {
        const res = await fetch(urlcat(BASEURL, `vaccines`, { ab: abbr }));
        const json = await res.json();
        setStatus("resolved");
        setChartData([
          { name: "Vaccinated", value: parseInt(json.All.people_vaccinated) },
          {
            name: "Not vaccinated",
            value:
              parseInt(json.All.population) -
              parseInt(json.All.people_vaccinated),
          },
        ]);
      } catch (error) {
        setStatus("error");
      }
    })();
  }, [abbr]);

  return (
    <>
      <div
        style={
          status !== "pending" ? { display: "block" } : { display: "none" }
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
            >
              <Cell key={0} fill="#4999A3" />
              <Cell key={1} fill="#F0B384" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <p style={{ textAlign: "center" }}>
          Percent vaccinated:{" "}
          {(
            (chartData?.[0]?.value / (chartData?.[1]?.value + chartData?.[0]?.value)) *
            100
          ).toFixed(1)}
          %
        </p>
      </div>
      {status === "pending" ? <CircularProgress /> : null}
    </>
  );
};

export default Piechart;
