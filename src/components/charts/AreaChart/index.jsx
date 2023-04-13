import { Stack } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ title }) => {
  const [state] = React.useState({
    data: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 185,
        type: "area",
        toolbar: {
          show: false,
          autoSelected: "pan",
        },
      },
      colors: ["#004C6A", "#4CAF50"],

      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#002C6A", "#4CAF50"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        offsetX: -17,

        labels: {
          formatter: function (value) {
            return value + "";
          },
          style: {
            colors: ["#CACACA"],
            fontSize: "12px",
            fontFamily: "Poppins",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "March", "Apr", "May", "Jun", "July"],
        labels: {
          show: true,
          style: {
            colors: [
              "#22294399",
              "#22294399",
              "#22294399",
              "#22294399",
              "#22294399",
              "#22294399",
              "#22294399",
            ],
            fontSize: "14px",
            fontFamily: '"Poppins" !important',
            fontWeight: 400,
          },
        },
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "29px" }}
      >
        <h2>{title}</h2>
      </Stack>
      <Stack direction="row" spacing={5}>
        <div className="views">
          <span className="blueview" style={{ borderColor: "#274593" }}></span>
          <b>345 </b>views
        </div>
        <div className="views">
          <span className="blueview" style={{ borderColor: "#4CAF50" }}></span>
          <b>75 </b>Applications
        </div>
      </Stack>
      <div className="chart-space">
        <ReactApexChart
          options={state.options}
          series={state.data}
          type="area"
          height={185}
        />
      </div>
    </>
  );
};
export default AreaChart;
