import React from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FormControl, Grid, Select, Stack } from "@mui/material";
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
const DonutChart = ({ shareCountData }) => {
  const [state] = React.useState({
    series: shareCountData.series,
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      labels: [
        "Facebook",
        "WhatsApp",
        "Telegram",
        "Linked In",
        "Mail",
        "Direct Link",
      ],
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
        colors: [
          "#CACACA",
          "#4CAF50",
          "#FFA500",
          "#4267B2",
          "#ff7f50",
          "#80004e",
        ],
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

  const getCountPercent = (totalCount, count) => {
    const res = (count / totalCount) * 100;
    return res;
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "0px" }}
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
        <Grid item xl={7} lg={7} style={{ paddingTop: "0px" }}>
          <div className="series-box">
            <h2>{shareCountData?.total} Total shares:</h2>
            <ul>
            {shareCountData?.sites.map((site, i) => {
              return (
                <li key={i}>
                  <b>{site.count}</b> – {site.name}
                   ({getCountPercent(shareCountData?.total, site.count)}
                  %)
                </li>
              );
            })}
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default DonutChart;
