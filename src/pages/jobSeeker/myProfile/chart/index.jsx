import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getProfileAnalyticsDataAPI } from "@api/jobSeeker";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    padding: 8px 25px 8px 30px;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;
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
  colors: ["#FFA500"],

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
    colors: ["#FFA500"],
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
      hideOverlappingLabels: false,
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

const AreaChart = () => {
  const [isSelect, setIsSelect] = useState(new Date().getFullYear());
  const [lastMonthViews, setLastMonthViews] = useState(0);
  const [lastMonthComparing, setLastMonthComparing] = useState(0);
  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  currentDate.setMonth(currentDate.getMonth() - 1);
  const lastMonth = currentDate.getMonth();
  const lastFiveYears = Array.from(
    { length: 5 },
    (_, index) => currentYear - index
  );
  const [chartData, setChartData] = useState({
    options: OPTIONS,
    data: [],
  });
  const getLastMonthComparing = (lastMonthViews, currentMonthViews) => {
    setLastMonthComparing(0);

    if (lastMonthViews > 0 && currentMonthViews > 0) {
      setLastMonthComparing(
        (((currentMonthViews - lastMonthViews) / lastMonthViews) * 100).toFixed(
          0
        )
      );
    }
  };
  const getProfileAnalyticsData = async () => {
    const res = await getProfileAnalyticsDataAPI(isSelect);
    if (res.remote === "success") {
      const { result } = res.data;
      setLastMonthViews(result[lastMonth]);
      getLastMonthComparing(result[lastMonth], result[currentMonth]);
      setChartData({
        ...chartData,
        data: [
          {
            name: "Total Views",
            data: result,
          },
        ],
      });
    }
  };
  useEffect(() => {
    getProfileAnalyticsData();
  }, [isSelect]);
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "29px" }}
      >
        <h2>Profile analytics</h2>
        <FormControl
          sx={{
            minWidth: 128,
            "&.MuiSelect-select": {
              fontFamily: "Poppins",
              fontSize: "12px",
            },
          }}
          size="small"
        >
          <SelectBox
            value={isSelect}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
          >
            {lastFiveYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </SelectBox>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <div className="chart-view">
          <h4>{lastMonthViews} views</h4>
          <p>in the last month</p>
        </div>
        <div className="chart-view">
          <h5>
            {" "}
            {lastMonthComparing > 0
              ? "+"
              : lastMonthComparing === 0
              ? ""
              : "-"}{" "}
            {lastMonthComparing}%
          </h5>
          <p>comparing to the previous period</p>
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
};
export default AreaChart;
