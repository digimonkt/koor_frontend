import { OutlinedButton } from "@components/button";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
const ResumeUpdate = ({ title, bgcolor, color, description, buttonWidth }) => {
  return (
    <>
      <div className="add-content">
        <h2>{title}</h2>
        <Stack direction="row" spacing={2} className="mt-4">
          <IconButton
            sx={{
              "&.MuiIconButton-root": {
                backgroundColor: bgcolor,
                width: "101px",
                height: "101px",
                color,
              },
            }}
          >
            <SVG.ResumeIcon />
          </IconButton>
          <div className="description">{description}</div>
        </Stack>
        <div className="my-4 text-center">
          <OutlinedButton
            title={
              <>
                <span className="me-2 d-inline-flex">
                  <SVG.UploadIcon />
                </span>
                download your resume
              </>
            }
            sx={{
              "&.MuiButton-outlined": {
                border: "1px solid #EEA23D !important",
                color: "#EEA23D !important",
                fontWeight: "500",
                fontSize: "16px",
                padding: "6px 30px",
                width: buttonWidth,
                "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                "@media (max-width: 992px)": {
                  padding: "10px 16px",
                  fontSize: "14px",
                },
              },
            }}
          />
        </div>

        {/* <Divider />
        <div className="text-resume  text-center mt-3 pb-1">
          Don’t have a resume?
        </div>
        <div className="text-worry">
          Don't worry if you don't have one yet,{" "}
          <span>create resume from Jobseeker's</span>
        </div> */}
      </div>
    </>
  );
};
export default ResumeUpdate;
