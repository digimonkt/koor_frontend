import { SVG } from "@assets/svg";
import { ChipBox } from "@components/jobCard/style";
import { Avatar, Chip, Divider, Grid, Stack } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import urlcat from "urlcat";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getColorByRemainingDays } from "@utils/generateColor";
import { SolidButton } from "@components/button";
import { capitalizeFirst } from "@utils/constants/utility";
import { saveTenderAPI, unSaveTenderAPI } from "@api/vendor";
import { updateEmployerTenderStatusAPI } from "@api/employer";

function TenderCard({ tenderDetails, selfTender, applied, logo }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [gridProps, setGridProps] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isStart, setIsStart] = useState(tenderDetails?.status);
  const handleToggleSave = async () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      await saveTenderAPI(tenderDetails.id);
    } else {
      await unSaveTenderAPI(tenderDetails.id);
    }
  };
  const updateTender = async (tenderId) => {
    const res = await updateEmployerTenderStatusAPI(tenderId);
    if (res.remote === "success") {
      console.log(res);
    }
  };
  const handleStartPause = async () => {
    setIsStart(isStart === "active" ? "inactive" : "active");
    updateTender(tenderDetails.id);
  };

  useEffect(() => {
    if (tenderDetails) setIsSaved(tenderDetails.isSaved);
  }, [tenderDetails]);

  useEffect(() => {
    if (tenderDetails.user.image) {
      setGridProps({
        alignItems: "center",
        sx: { my: 3 },
      });
    }
  }, [tenderDetails.user.image]);
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
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto",
                  color: "#CACACA",
                  "&.MuiAvatar-colorDefault": {
                    background: "#F0F0F0",
                  },
                }}
                src={generateFileUrl(tenderDetails?.user?.image?.path || "")}
              >
                <SVG.SuitcaseJob />
              </Avatar>
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
            <Link to={`/tender/details/${tenderDetails?.id || "tenderId"}`}>
              <h2>
                {tenderDetails?.title || ""}
                {tenderDetails.isApplied ? (
                  <Chip
                    // variant="outlined"
                    color="success"
                    size="small"
                    label="Applied"
                    sx={{
                      marginLeft: "5px",
                    }}
                  />
                ) : null}
              </h2>
            </Link>
            <p className="job-description card-description mt-1 mb-3">
              {tenderDetails?.description}
            </p>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{ width: "100%", flexWrap: "wrap" }}
            >
              {tenderDetails.sector && (
                <ChipBox
                  label={`Sector: ${capitalizeFirst(
                    tenderDetails?.sector?.title || ""
                  )}`}
                  icon={<>{<SVG.SellIcon />}</>}
                />
              )}
              {(tenderDetails?.tenderCategory || []).map((category, k) => {
                return (
                  <ChipBox
                    key={k}
                    label={category.title}
                    icon={<>{<SVG.SellIcon />}</>}
                  />
                );
              })}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              className="mt-3"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {!selfTender && (
                <Stack direction="row" spacing={1}>
                  <span>
                    <SVG.BriefcaseIcon />
                  </span>{" "}
                  <div className="textdes">
                    Company: <span>{tenderDetails.user.name}</span>
                  </div>
                </Stack>
              )}
              <Stack direction="row" spacing={1}>
                <span>
                  <SVG.ClockIconSmall />
                </span>{" "}
                <div className="textdes">
                  Posted At:{" "}
                  <span>{dayjs(tenderDetails?.createdAt).format("ll")}</span>
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
                tenderDetails?.expiredInDays > 0
                  ? `${tenderDetails?.expiredInDays} days left`
                  : "Expired"
              }
              color={getColorByRemainingDays(
                tenderDetails?.expiredInDays > 0
                  ? tenderDetails?.expiredInDays
                  : 0
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
            {selfTender ? (
              <div className="job-button-card">
                <button
                  onClick={() => {
                    handleStartPause();
                  }}
                >
                  {isStart === "active" ? (
                    <>
                      <SVG.PauseIcon />
                      <span className="d-block">Hold</span>
                    </>
                  ) : (
                    <>
                      <SVG.StartIcon />
                      <span className="d-block">Start</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (tenderDetails?.id) {
                      navigate(
                        urlcat("/employer/tender/post", {
                          tenderId: tenderDetails?.id,
                        })
                      );
                    }
                  }}
                >
                  {<SVG.EditIcon />}
                  <span className="d-block">Edit</span>
                </button>
              </div>
            ) : isLoggedIn ? (
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
            ) : (
              ""
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default TenderCard;
