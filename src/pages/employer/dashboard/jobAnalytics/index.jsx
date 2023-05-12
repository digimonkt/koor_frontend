import { getJobAnalyticsAPI } from "@api/employer";
import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const OPTIONS = {
  chart: {
    height: 185,
    type: "area",
    width: "100%",
    toolbar: {
      show: false,
      autoSelected: "pan",
    },
  },
  colors: ["#4CAF50", "#004C6A"],

  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
    colors: ["#4CAF50", "#002C6A"],
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
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
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
};
const transformData = (data) => {
  let total = 0;
  const counts = new Array(12).fill(0);
  for (const d of data) {
    const month = new Date(d.month).getMonth();
    counts[month] += d.count;
    total += d.count;
  }

  const result = [];
  for (let i = 0; i < 12; i++) {
    result.push(`${counts[i] || 0}`);
  }

  return { result, total };
};
function JobAnalytics({ title }) {
  const [applicationCount, setApplicationCount] = useState(0);
  const [chartData, setChartData] = useState({
    options: OPTIONS,
    data: [],
  });
  const getJobAnalytics = async () => {
    const res = await getJobAnalyticsAPI();
    if (res.remote === "success") {
      const { result, total } = transformData(res.data.orderCounts);
      setChartData({
        ...chartData,
        data: [
          {
            name: "series1",
            data: result,
          },
        ],
      });
      setApplicationCount(total);
    }
  };
  useEffect(() => {
    getJobAnalytics();
  }, []);
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
        {/* <div className="views">
          <span className="blueview" style={{ borderColor: "#274593" }}></span>
          <b>345 </b>views
        </div> */}
        <div className="views">
          <span className="blueview" style={{ borderColor: "#4CAF50" }}></span>
          <b>{applicationCount} </b>Applications
        </div>
      </Stack>
      <div className="chart-space">
        <ReactApexChart
          options={chartData.options || {}}
          series={chartData.data || []}
          type="area"
          height={185}
        />
      </div>
    </>
  );
}

export default JobAnalytics;
