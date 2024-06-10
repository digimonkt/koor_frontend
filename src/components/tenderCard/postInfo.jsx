import { SVG } from "@assets/svg";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const PostInfo = ({ selfTender, tenderDetails }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      className="mt-3"
      sx={{
        "@media (max-width: 992px)": {
          display: "block",
        },
      }}
      // divider={<Divider orientation="vertical" flexItem />}
    >
      {!selfTender && (
        <Stack direction="row" spacing={1}>
          <span>
            <SVG.BriefcaseIcon />
          </span>
          <div className="textdes">
            {/*
                    { tenderDetails.isPostedByAdmin
                      ? "Posted By"
                      : "Institution:"}
                    <span>
                      {tenderDetails.isPostedByAdmin
                        ? " Koor"
                      : ` ${tenderDetails.user.name}` }
                    </span>
                      */}
            Institution:{" "}
            <span>
              {!tenderDetails.company
                ? tenderDetails.user.name
                : tenderDetails.company}
            </span>{" "}
          </div>
        </Stack>
      )}
      <Stack direction="row" spacing={1} className="company_textdes">
        <span>
          <SVG.ClockIconSmall />
        </span>{" "}
        <div className="textdes">
          Posted At: <span>{dayjs(tenderDetails?.startDate).format("ll")}</span>
        </div>
      </Stack>
    </Stack>
  );
};

export default PostInfo;
