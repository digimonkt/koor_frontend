import { Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import { SolidButton } from "../button";
import { ChipBox } from "./style";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";
import dayjs from "dayjs";
import urlcat from "urlcat";
import { getColorByRemainingDays } from "@utils/generateColor";
import { generateFileUrl } from "@utils/generateFileUrl";
import { saveJobAPI, unSaveJobAPI } from "@api/jobSeeker";
function JobCard({ logo, selfJob, applied, jobDetails }) {
  const editUrl = urlcat("/employer/jobs/post", { jobId: jobDetails?.id });

  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [gridProps, setGridProps] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleSave = async () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      await saveJobAPI(jobDetails.id);
    } else {
      await unSaveJobAPI(jobDetails.id);
    }
  };

  useEffect(() => {
    if (jobDetails) setIsSaved(jobDetails.isSaved);
  }, [jobDetails]);
  useEffect(() => {
    if (logo) {
      setGridProps({
        alignItems: "center",
        sx: { my: 3 },
      });
    }
  }, [logo]);
  return (
    <div className="job_card">
      <Grid container spacing={1.875} {...gridProps}>
        {logo && (
          <Grid
            item
            sx={{
              "@media (min-width: 1200px)": {
                maxWidth: "10.555%",
                flexBasis: "10.555%",
              },
            }}
          >
            <div className="squer-width">
              <img
                src={generateFileUrl(jobDetails?.user?.image?.path || "")}
                alt=""
                style={{ width: "100%", height: "85px" }}
              />
            </div>
          </Grid>
        )}
        <Grid
          item
          // lg={logo ? 8 : 9}
          // xs={12}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "72%",
              flexBasis: "72%",
            },
          }}
        >
          <div className="my-jobs">
            <h2>
              {role !== USER_ROLES.employer ? (
                <Link to={`/jobs/details/${jobDetails?.id || "jobId"}`}>
                  {jobDetails?.title || "RETAIL ASSISTANT CASHIER"}
                </Link>
              ) : (
                <Link to={editUrl}>
                  {jobDetails?.title || "RETAIL ASSISTANT CASHIER"}
                </Link>
              )}
            </h2>
            <p className="my-3">
              {jobDetails?.description ||
                "Role and Responsibilities · Provide good customer service · Maintain store cleanliness. Check and display goods/merchandise · Cashiering duties as and when needed Qualifications and Education Requirements· Minimum SPM and above· No experience needed · Good verbal..."}
            </p>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{ width: "100%", flexWrap: "wrap" }}
            >
              <ChipBox
                sx={{ marginBottom: "10px" }}
                label={jobDetails?.country.title || "Dusseldorf"}
                icon={<>{<SVG.LocationIcon />}</>}
              />
              <ChipBox
                label={`${jobDetails?.workingDays || 2}-Day Week`}
                icon={<>{<SVG.BegClock />}</>}
              />
              {jobDetails?.isFullTime && (
                <ChipBox label={"Full Time"} icon={<>{<SVG.MoonCircle />}</>} />
              )}
              {jobDetails?.isPartTime && (
                <ChipBox label={"Part time"} icon={<>{<SVG.MoonCircle />}</>} />
              )}
              {jobDetails?.hasContract && (
                <ChipBox label={"Contract"} icon={<>{<SVG.MoonCircle />}</>} />
              )}
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
                  Posted At:{" "}
                  <span>{dayjs(jobDetails?.createdAt).format("ll")}</span>
                </div>
              </Stack>
            </Stack>
          </div>
        </Grid>
        <Grid item lg={logo ? 2 : 3} xs={12}>
          <div className="text-end mb-4">
            <SolidButton
              style={{ textTransform: "lowercase" }}
              title={
                jobDetails?.expiredInDays > 0
                  ? `${jobDetails?.expiredInDays} days left`
                  : "Expired"
              }
              color={getColorByRemainingDays(
                jobDetails?.expiredInDays > 0 ? jobDetails?.expiredInDays : 0
              )}
            />
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
              {jobDetails?.budgetAmount ? (
                <>
                  <span className="d-block">UP TO</span>
                  <h4>
                    <small>{"$"}</small>
                    {jobDetails?.budgetAmount || "3,500"}
                  </h4>
                  <span>{jobDetails?.budgetPayPeriod}</span>
                </>
              ) : (
                <h3>-</h3>
              )}
            </div>
            {selfJob ? (
              <div className="job-button-card">
                <button>
                  {<SVG.PauseIcon />}
                  <span className="d-block">Hold</span>
                </button>
                <button
                  onClick={() => {
                    if (jobDetails?.id) {
                      navigate(editUrl);
                    }
                  }}
                >
                  {<SVG.EditIcon />}
                  <span className="d-block">Edit</span>
                </button>
              </div>
            ) : (
              <React.Fragment>
                {!applied ? (
                  <div onClick={handleToggleSave} style={{ marginLeft: "6px" }}>
                    <div className="bookmark">
                      {isSaved ? (
                        <>
                          <SVG.SaveIcon />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <SVG.UnSave style={{ color: "#848484" }} />
                          <span style={{ color: "#848484" }}>Save</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobCard;
