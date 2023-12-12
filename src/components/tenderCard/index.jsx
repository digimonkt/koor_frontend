import { SVG } from "../../assets/svg";
import { ChipBox } from "../../components/jobCard/style";
import { Avatar, Box, Chip, Divider, Grid, Stack } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import urlcat from "urlcat";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getColorByRemainingDays } from "@utils/generateColor";
import { SolidButton } from "@components/button";
import { capitalizeFirst, showDay } from "@utils/constants/utility";
import { saveTenderAPI, unSaveTenderAPI } from "@api/vendor";
import { updateEmployerTenderStatusAPI } from "@api/employer";
import { USER_ROLES } from "@utils/enum";
import useMediaQuery from "@mui/material/useMediaQuery";

function TenderCard({ tenderDetails, selfTender, applied, logo }) {
  const { isLoggedIn } = useSelector(state => state.auth);
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
  const updateTender = async tenderId => {
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
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div className="job_card tender_job_card_text">
      <Grid container spacing={1.875} {...gridProps}>
        {logo && (
          <Grid
            item
            sm={2}
            xs={12}
            sx={{
              "@media (min-width: 1200px)": {
                maxWidth: "10.555%",
                flexBasis: "10.555%",
              },
            }}>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}>
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
                  src={generateFileUrl(tenderDetails?.user?.image?.path || "")}>
                  <SVG.SuitcaseJob />
                </Avatar>
              </div>

              {matches ? (
                <div>
                  <div className="text-end w-100 mb-4">
                    <SolidButton
                      className={
                        tenderDetails?.expiredInDays > 0
                          ? "btn_font_lower"
                          : "btn_font_capitalize"
                      }
                      title={
                        tenderDetails?.expiredInDays > 0
                          ? showDay(tenderDetails?.expiredInDays)
                          : "Expired"
                      }
                      color={getColorByRemainingDays(
                        tenderDetails?.expiredInDays > 0
                          ? tenderDetails?.expiredInDays
                          : 0,
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
                    sx={{ minHeight: "87%" }}>
                    <div>
                      {selfTender ? (
                        <Box className="job-button-card">
                          <button
                            onClick={() => {
                              handleStartPause();
                            }}>
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
                                  }),
                                );
                              }
                            }}>
                            {<SVG.Edit1 />}
                            <span className="d-block">Edit</span>
                          </button>
                        </Box>
                      ) : isLoggedIn ? (
                        <React.Fragment>
                          {!applied ? (
                            <div
                              onClick={handleToggleSave}
                              style={{ marginLeft: "6px" }}>
                              <div className="bookmark">
                                {isSaved ? (
                                  <>
                                    {USER_ROLES.jobSeeker ? (
                                      <SVG.BlueSaveIcon />
                                    ) : (
                                      <SVG.SaveIcon />
                                    )}
                                    <span
                                      style={{
                                        color: USER_ROLES.jobSeeker
                                          ? " #274593"
                                          : "#eea23d",
                                      }}>
                                      Saved
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <SVG.UnSave style={{ color: "#848484" }} />
                                    <span style={{ color: "#848484" }}>
                                      Save
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </Stack>
                </div>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
        )}

        <Grid
          sm={8}
          xs={12}
          item
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "72%",
              flexBasis: "72%",
            },
          }}>
          <div className="my-jobs">
            <h2>
              <Link to={`/tender/details/${tenderDetails?.id || "tenderId"}`}>
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
              </Link>
            </h2>
            <div
              className="job-description card-description mt-1 mb-3"
              dangerouslySetInnerHTML={{
                __html: tenderDetails?.description,
              }}></div>
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{
                width: "100%",
                flexWrap: "wrap",
                "@media (max-width: 667px)": {
                  overflow: "hidden",
                  overflowX: "auto",
                },
              }}
              useFlexGap
              className="tender_card_chip">
              {tenderDetails.sector && (
                <ChipBox
                  label={`Sector: ${capitalizeFirst(
                    tenderDetails?.sector?.title || "",
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
                  </span>{" "}
                  <div className="textdes">
                    {tenderDetails.company === null &&
                    tenderDetails.companyLogo === null
                      ? "Company:"
                      : "Posted By"}
                    <span>
                      {tenderDetails.company === null &&
                      tenderDetails.companyLogo === null
                        ? tenderDetails.user.name
                        : " Koor"}
                    </span>
                  </div>
                </Stack>
              )}
              <Stack direction="row" spacing={1} className="company_textdes">
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
        {!matches ? (
          <Grid
            item
            lg={logo ? 2 : 3}
            xs={12}
            sm={2}
            sx={{ marginLeft: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <SolidButton
                // style={{ textTransform: "capitalize", cursor: "default" }}
                className={
                  tenderDetails?.expiredInDays > 0
                    ? "btn_font_lower"
                    : "btn_font_capitalize"
                }
                title={
                  tenderDetails?.expiredInDays > 0
                    ? showDay(tenderDetails?.expiredInDays)
                    : "Expired"
                }
                color={getColorByRemainingDays(
                  tenderDetails?.expiredInDays > 0
                    ? tenderDetails?.expiredInDays
                    : 0,
                )}
              />
            </Box>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="end"
              alignItems="center"
              className="py-2 mt-2"
              sx={{ minHeight: "87%" }}>
              <div className="py-4 border-left-1 py-4 ps-3">
                {selfTender ? (
                  <Box className="job-button-card">
                    <button
                      onClick={() => {
                        handleStartPause();
                      }}>
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
                            }),
                          );
                        }
                      }}>
                      {<SVG.Edit1 />}
                      <span className="d-block">Edit</span>
                    </button>
                  </Box>
                ) : isLoggedIn ? (
                  <React.Fragment>
                    {!applied ? (
                      <div
                        onClick={handleToggleSave}
                        style={{ marginLeft: "6px" }}>
                        <div className="bookmark">
                          {isSaved ? (
                            <>
                              {USER_ROLES.jobSeeker ? (
                                <SVG.BlueSaveIcon />
                              ) : (
                                <SVG.SaveIcon />
                              )}
                              <span
                                style={{
                                  color: USER_ROLES.jobSeeker
                                    ? " #274593"
                                    : "#eea23d",
                                }}>
                                Saved
                              </span>
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
              </div>
            </Stack>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
}

export default TenderCard;
