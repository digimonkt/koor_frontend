import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
const AreaChart = () => {
  const [isSelect, setIsSelect] = useState("");
  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };

  const [state] = React.useState({
    data: [
      {
        name: "series1",
        data: [45, 52, 38, 45, 19, 23, 2],
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
        // type: "datetime",
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
            IconComponent={KeyboardArrowUpIcon}
            displayEmpty
          >
            <MenuItem value="">2019</MenuItem>
            <MenuItem value={20}>2020</MenuItem>
            <MenuItem value={30}>2021</MenuItem>
            <MenuItem value={31}>2022</MenuItem>
          </SelectBox>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <div className="chart-view">
          <h4>112 views</h4>
          <p>in the last month</p>
        </div>
        <div className="chart-view">
          <h5>+200%</h5>
          <p>comparing to previous period</p>
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
