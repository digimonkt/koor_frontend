import { Avatar, Button, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { generateFileUrl } from "../../utils/generateFileUrl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import { ChipBox } from "@components/jobCard/style";
import { SVG } from "@assets/svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { unblockUserAPI } from "@api/employer";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setTotalBlacklist } from "@redux/slice/employer";
import { USER_ROLES } from "@utils/enum";
import { getConversationIdByUserIdAPI } from "@api/chat";
import useMediaQuery from "@mui/material/useMediaQuery";
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTime);

const BlacklistCard = ({ details, reason, sx, handleUnblockUserId }) => {
  const { totalBlacklist } = useSelector((state) => state.employer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUnblockUser = async (userId) => {
    handleUnblockUserId(userId);
    const res = await unblockUserAPI(userId);
    if (res.remote === "success") {
      dispatch(setTotalBlacklist(totalBlacklist - 1));
      dispatch(setSuccessToast("User unblock successfully"));
      handleUnblockUserId(userId);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };
  const handleMessageClick = async () => {
    const res = await getConversationIdByUserIdAPI({
      userId: details?.user?.id,
    });
    if (res.remote === "success") {
      const conversationId = res.data.conversation_id;
      Navigate(
        urlcat("/employer/chat", {
          conversion: conversationId,
          userId: details?.user?.id,
        })
      );
    }
  };
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 1, md: 1 }}
        sx={{
          width: "100%",
          flexWrap: "wrap",
          mt: 2,
          justifyContent: "space-between",
        }}
      >
        <ChipBox
          sx={{
            marginBottom: "10px",
            backgroundColor: "#d5e3f7 !important",
            fontSize: "14px !important",
          }}
          label={`Blacklist Reason: ${reason || ""}`}
          icon={<>{<SVG.BlockedIcon />}</>}
        />
        <ChipBox
          sx={{
            marginBottom: "10px",
            backgroundColor: "#d5e3f7 !important",
            cursor: "pointer",
            fontSize: "14px !important",
          }}
          label="Unblock"
          icon={<>{<SVG.BlockedIcon />}</>}
          onClick={() => handleUnblockUser(details?.id)}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: "2", lg: "2" }}
        alignItems={{ xs: "start", lg: "center" }}
        justifyContent={{ xs: "center", lg: "space-between" }}
        className="border-recent"
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Avatar
            src={generateFileUrl(details?.image || "")}
            sx={{ width: "70px", height: "70px" }}
          />{" "}
          <div className="recent-content" style={{ width: "100%" }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              flexWrap="wrap"
              alignItems="center"
              sx={{ mb: 1, ...sx }}
            >
              <Link
                to={urlcat("/job-seeker/:userId/profile", {
                  userId: details?.id,
                })}
              >
                <h4>{details?.name || details?.email}</h4>
              </Link>
            </Stack>
            {!matches ? (
              <div className="recent-descrition manage-jobs">
                <div>
                  <p>{details?.description}</p>
                </div>
                <div className="recent-descrition-icon">
                  <Button
                    sx={{
                      minWidth: "auto",
                      color: "#274593",
                      textTransform: "capitalize",
                      "& p": { color: "#274593 !important" },
                      "& svg": { width: "20px", height: "20px" },
                    }}
                    variant="link"
                    onClick={() => {
                      if (details.job) {
                        navigate(
                          urlcat(
                            "/:role/manage-jobs/:jobId/applicant-details/:applicationId",
                            {
                              applicationId: details.id,
                              role: USER_ROLES.employer,
                              jobId: details.job.id,
                            }
                          )
                        );
                      } else if (details.tender) {
                        navigate(
                          urlcat(
                            "/:role/manage-tenders/:tenderId/applicant-details/:applicationId",
                            {
                              applicationId: details.id,
                              role: USER_ROLES.employer,
                              tenderId: details.tender.id,
                            }
                          )
                        );
                      } else {
                        navigate(
                          urlcat("/:role/:userId/profile", {
                            userId: details.user.id,
                            role: details.user.role.replace("_", "-"),
                          })
                        );
                      }
                    }}
                  >
                    <div>
                      <SVG.OpenNewIcon />
                      <p>View</p>
                    </div>
                  </Button>
                  <Button
                    variant="link"
                    sx={{
                      minWidth: "auto",
                      color: "#274593",
                      textTransform: "capitalize",
                      "& p": { color: "#274593 !important" },
                      "& svg": { width: "20px", height: "20px" },
                    }}
                    onClick={handleMessageClick}
                  >
                    <div>
                      <SVG.MessageIcon />
                      <p>Message</p>
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Stack>
        <div className="recent-content">
          {matches ? (
            <div className="recent-descrition manage-jobs">
              <div>
                <p className="mb-3">{details?.description}</p>
              </div>
              <div className="recent-descrition-icon">
                <Button
                  sx={{
                    minWidth: "auto",
                    color: "#274593",
                    textTransform: "capitalize",
                    "& p": { color: "#274593 !important" },
                    "& svg": { width: "20px", height: "20px" },
                  }}
                  variant="link"
                  onClick={() => {
                    if (details.job) {
                      navigate(
                        urlcat(
                          "/:role/manage-jobs/:jobId/applicant-details/:applicationId",
                          {
                            applicationId: details.id,
                            role: USER_ROLES.employer,
                            jobId: details.job.id,
                          }
                        )
                      );
                    } else if (details.tender) {
                      navigate(
                        urlcat(
                          "/:role/manage-tenders/:tenderId/applicant-details/:applicationId",
                          {
                            applicationId: details.id,
                            role: USER_ROLES.employer,
                            tenderId: details.tender.id,
                          }
                        )
                      );
                    } else {
                      navigate(
                        urlcat("/:role/:userId/profile", {
                          userId: details.user.id,
                          role: details.user.role.replace("_", "-"),
                        })
                      );
                    }
                  }}
                >
                  <div>
                    <SVG.OpenNewIcon />
                    <p>View</p>
                  </div>
                </Button>
                <Button
                  variant="link"
                  sx={{
                    minWidth: "auto",
                    color: "#274593",
                    textTransform: "capitalize",
                    "& p": { color: "#274593 !important" },
                    "& svg": { width: "20px", height: "20px" },
                  }}
                  onClick={handleMessageClick}
                >
                  <div>
                    <SVG.MessageIcon />
                    <p>Message</p>
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Stack>
    </>
  );
};

export default BlacklistCard;
