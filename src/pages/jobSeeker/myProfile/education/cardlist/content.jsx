import { Stack } from "@mui/material";
import React from "react";
import { SVG } from "../../../../../assets/svg";

const Content = ({ title, subtitle, date, koor }) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="list-content">
          <h5>{title}</h5>
          <h6>{subtitle}</h6>
          <span>{date}</span>
        </div>
        <Stack direction="row" spacing={1} className="list-button">
          <button>
            <SVG.EditIcon />
            <span>Edit</span>
          </button>
          <button>
            <SVG.DeleteICon />
            <span>Delete</span>
          </button>
        </Stack>
      </Stack>
    </>
  );
};
export default Content;
