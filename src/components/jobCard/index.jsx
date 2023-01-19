import { Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { SVG } from "../../assets/svg";
import { SolidButton } from "../button";
import { ChipBox } from "./style";

function JobCard({ logo, selfJob, applied }) {
  const navigate = useNavigate();
  const [gridProps, setGridProps] = useState({});
  useEffect(() => {
    if (logo) {
      setGridProps({
        alignItems: "center",
        sx: { my: 3 },
      });
    }
  }, [logo]);
  return (
    <Grid container spacing={2} {...gridProps}>
      {logo && (
        <Grid
          item
          lg={2}
          xs={12}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "12.666667%",
              flexBasis: "12.666667%",
            },
          }}
        >
          <div className="squer-width">
            <img src={IMAGES.FacebookBoxIcon} alt="" />
          </div>
        </Grid>
      )}
      <Grid item lg={logo ? 8 : 9} xs={12}>
        <div className="my-jobs">
          <h2>RETAIL ASSISTANT CASHIER</h2>
          <p>
            Role and Responsibilities · Provide good customer service · Maintain
            store cleanliness. Check and display goods/merchandise · Cashiering
            duties as and when needed Qualifications and Education Requirements·
            Minimum SPM and above· No experience needed · Good verbal...
          </p>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ width: "100%" }}
          >
            <ChipBox label="Dusseldorf" icon={<>{<SVG.LocationIcon />}</>} />
            <ChipBox label="5-Day week" icon={<>{<SVG.BegClock />}</>} />
            <ChipBox label="Full time" icon={<>{<SVG.MoonCircle />}</>} />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            className="mt-3"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {!selfJob && (
              <Stack direction="row" spacing={1}>
                <span>
                  <SVG.BriefcaseIcon />
                </span>{" "}
                <div className="textdes">
                  Company: <span>Facebook</span>
                </div>
              </Stack>
            )}
            <Stack direction="row" spacing={1}>
              <span>
                <SVG.ClockIconSmall />
              </span>{" "}
              <div className="textdes">
                Posted At: <span>August 28, 2022</span>
              </div>
            </Stack>
          </Stack>
        </div>
      </Grid>
      <Grid item lg={logo ? 2 : 3} xs={12}>
        <div className="text-end">
          <SolidButton title="2 Days" />
        </div>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="end"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          className="py-2"
          sx={{ minHeight: "87%" }}
        >
          <div className="pricebox py-3">
            <span className="d-block">UP TO</span>
            <h4>
              <small>$</small>
              3,500
            </h4>
          </div>
          {selfJob ? (
            <div className="job-button-card">
              <button>
                {<SVG.PauseIcon />}
                <span className="d-block">Hold</span>
              </button>
              <button onClick={() => {navigate("/employer/jobs/post?jobId=ID")}}>
                {<SVG.EditIcon />}
                <span className="d-block">Edit</span>
              </button>
            </div>
          ) : (
            <>
              {!applied ? (
                <>
                  <div className="bookmark pe-lg-4">
                    <SVG.SaveIcon />
                    <span>Saved</span>
                  </div>
                </>
              ) : null}
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default JobCard;
