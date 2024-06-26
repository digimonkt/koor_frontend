import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { SVG } from "../../assets/svg";
import { ChipBox } from "../../components/jobCard/style";
import { Avatar, Box, Chip, Divider, Grid, Stack } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getColorByRemainingDays } from "@utils/generateColor";
import { SolidButton } from "@components/button";
import { capitalizeFirst, showDay } from "@utils/constants/utility";
import { saveTenderAPI, unSaveTenderAPI } from "@api/vendor";
import { updateEmployerTenderStatusAPI } from "@api/employer";
import { USER_ROLES } from "@utils/enum";
import useMediaQuery from "@mui/material/useMediaQuery";
import StartHoldEdit from "./startHoldEdit";
import { ShowLessText } from "@components/common";

function TenderCard({ tenderDetails, selfTender, applied, logo }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const matches = useMediaQuery("(max-width:600px)");
  const { isMobileView } = useSelector(({ platform }) => platform);
  const params = useParams();
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
    await updateEmployerTenderStatusAPI(tenderId);
  };
  const handleStartPause = async () => {
    setIsStart(isStart === "active" ? "inactive" : "active");
    updateTender(tenderDetails.id);
  };
  useEffect(() => {
    if (tenderDetails) setIsSaved(tenderDetails.isSaved);
  }, [tenderDetails]);
  return (
    <div className="job_card tender_job_card_text">
      <Grid
        container
        spacing={1.875}
        sx={{
          alignItems: "flex-start",
        }}
      >
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
              "@media (max-width:562px)": {
                marginBottom: "20px",
              },
            }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <div className="squer-width" style={{ width: "100px" }}>
                <Avatar
                  sx={{
                    width: "100%",
                    height: "100%",
                    minWidth: "auto",
                    minHeight: "100px",
                    margin: "auto",
                    color: "#CACACA",
                    fontSize: "15rem",
                    borderRadius: "10px",
                    "&.MuiAvatar-colorDefault": {
                      background: "#F0F0F0",
                    },
                  }}
                  src={generateFileUrl(tenderDetails?.user?.image?.path || "")}
                >
                  <BusinessCenterOutlinedIcon
                    sx={{
                      width: "100%",
                      height: "100%",
                      padding: "30px",
                      minWidth: "auto",
                      minHeight: "100px",
                      "@media (max-width:1589px)": {
                        padding: "20px",
                      },
                    }}
                  />
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
                    <div>
                      {selfTender ? (
                        <StartHoldEdit
                          handleStartPause={handleStartPause}
                          tenderDetails={tenderDetails}
                          isStart={isStart}
                        />
                      ) : isLoggedIn && role === USER_ROLES.vendor ? (
                        <React.Fragment>
                          {!applied ? (
                            <div
                              onClick={handleToggleSave}
                              style={{ marginLeft: "6px" }}
                            >
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
                                        color:
                                          role === USER_ROLES.jobSeeker
                                            ? "#eea23d"
                                            : "#274593",
                                      }}
                                    >
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
          }}
        >
          <div className="my-jobs">
            <h2 style={{ marginBottom: "8px" }}>
              <Link to={`/tender/details/${tenderDetails?.slug}`}>
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
            <Box>
              <ShowLessText item={tenderDetails.description} />
            </Box>

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
              className="tender_card_chip"
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
                  Posted At:{" "}
                  <span>{dayjs(tenderDetails?.startDate).format("ll")}</span>
                </div>
              </Stack>
            </Stack>
          </div>
        </Grid>
        {!matches ||
        (isMobileView &&
          Object.values(params)[0] === "employer/manage-jobs") ? (
          <Grid
            item
            lg={logo ? 2 : 3}
            xs={12}
            sm={2}
            sx={{ marginLeft: "auto" }}
          >
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
                    : 0
                )}
              />
            </Box>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="end"
              alignItems="center"
              className="py-2 mt-2"
              sx={{ minHeight: "87%" }}
            >
              <div className="py-4 border-left-1 py-4 ps-3">
                {selfTender ? (
                  <StartHoldEdit
                    handleStartPause={handleStartPause}
                    tenderDetails={tenderDetails}
                    isStart={isStart}
                  />
                ) : isLoggedIn && role !== USER_ROLES.jobSeeker ? (
                  <React.Fragment>
                    {!applied ? (
                      <div
                        onClick={handleToggleSave}
                        style={{ marginLeft: "6px" }}
                      >
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
                                }}
                              >
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
