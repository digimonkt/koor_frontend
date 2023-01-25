import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FormControl, Grid, MenuItem, Select, Stack } from "@mui/material";
export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: rgba(202, 202, 202, 0.25);
    border-radius: 10px;
    padding: 10px 20px;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    letter-spacing: 0.02em;

    color: #121212;
    opacity: 0.75;
  }
  & fieldset {
    display: none;
  }
`;
const DonutChart = () => {
  const [isSelect, setIsSelect] = useState("");

  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };
  const [state] = React.useState({
    series: [10, 70, 30, 10],
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      //   labels: ["Apple", "Orange", "Mango"],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: { show: false },

              total: {
                show: true,
              },
            },
          },
          expandOnClick: false,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: false,
        width: 0,
      },
      fill: {
        colors: ["#CACACA", "#4CAF50", "#FFA500", "#4267B2"],
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: "bottom",
              show: false,
            },
          },
        },
      ],
    },
  });
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "30px" }}
      >
        <h2>Number of shares</h2>
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
            <MenuItem value="">This Week</MenuItem>
            <MenuItem value={20}>Last Month</MenuItem>
            <MenuItem value={30}>Whole Year</MenuItem>
          </SelectBox>
        </FormControl>
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={5} xl={5}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height={200}
          />
        </Grid>
        <Grid item xl={7} lg={7}>
          <div className="series-box">
            <h2>48 total shares:</h2>
            <ul>
              <li>
                <b>22</b> – Direct link share (65%)
              </li>
              <li>
                <b>8</b> – Telegram (22%)
              </li>
              <li>
                <b>3</b> – WhatsApp (12%)
              </li>
              <li>
                <b>1</b> – LinkedIn (1%)
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default DonutChart;
