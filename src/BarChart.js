import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import department from "./db.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const BarChart = () => {
  const [state, setState] = useState([]);
  const [monthlys, setMonthlys] = useState([]);
  const [labels, setday] = useState([]);
  const chartRef = useRef();

  const onClick = (event) => (news) => {
    console.log("🚀 ~ file: BarChart.js:42 ~ onClick ~ news", news);
    console.log(getElementAtEvent(chartRef.current, event));
  };
  console.log("🚀 ~ file: BarChart.js:71 ~ BarChart ~ day", labels);

  console.log("🚀 ~ file: BarChart.js:70 ~ BarChart ~ monthlys", monthlys);

  useEffect(() => {
    if (state.length === 0) {
      const newValues = department.department.map((item) => {
        return { ["daily"]: item.daily, ["department"]: item.department };
      });

      setMonthlys(newValues);
    }

    const newValues = department.department.map((item) => {
      if (state === "daily") {
        return { ["daily"]: item.daily, ["department"]: item.department };
      } else if (state === "weekly") {
        return { ["daily"]: item.weekly, ["department"]: item.department };
      } else if (state === "Monthly") {
        return { ["daily"]: item.Monthly, ["department"]: item.department };
      } else {
        return { ["daily"]: item.daily, ["department"]: item.department };
      }
    });
    setMonthlys(newValues);
  }, [state]);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    if (monthlys.length !== 0) {
      const newshow = monthlys.map((item) => {
        return item.department;
      });
      setday(newshow);
    }
  }, [monthlys]);

  const data = {
    labels,
    datasets: [
      {
        label: state,
        data: monthlys.map((item) => item?.daily),
        backgroundColor:
          state === "monthly"
            ? "rgba(11, 127, 171, 0.6)"
            : state === "weekly"
            ? "rgba(245, 140, 166, 0.5)"
            : "rgba(255, 0, 160, 0.4)",
      },
    ],
  };
  console.log("🚀 ~ file: BarChart.js:116 ~ BarChart ~ data", data);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "60px 0px",
      }}
    >
      <Paper elevation={8} style={{ width: "720px", padding: "20px" }}>
        <Typography variant="h6" style={{ fontSize: "30px", color: "gray" }}>
          Sales
        </Typography>
        <select
          value={state}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "20px",
            backgroundColor: "rgb(191 227 255)",
            border: "none",
            float: "right",
            marginLeft: "5px",
          }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="Monthly">Monthtly</option>
        </select>
        <select
          style={{
            padding: "8px",
            borderRadius: "20px",
            backgroundColor: "rgb(191 227 255)",
            border: "none",
            float: "right",
          }}
        >
          <option value="Department">Department</option>
        </select>
        <Bar
          ref={chartRef}
          data={data}
          onClick={onClick(state)}
          style={{ fontSize: "20px" }}
        />
      </Paper>
    </div>
  );
};

export default BarChart;
