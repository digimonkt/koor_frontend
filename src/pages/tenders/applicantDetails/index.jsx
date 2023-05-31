import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SVG } from "@assets/svg";
import { getTenderApplicationDetailsAPI } from "@api/employer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ApplicationOptions from "@components/applicationOptions";
import { generateFileUrl } from "@utils/generateFileUrl";
import urlcat from "urlcat";
dayjs.extend(relativeTime);
const ApplicantDetails = () => {
  // navigate
  const navigate = useNavigate();
  const params = useParams();
  const [applicantDetails, setApplicantDetails] = useState({
    user: {
      profile: {},
    },
    tender: {},
    attachments: [],
  });

  const getApplicantDetails = async () => {
    const res = await getTenderApplicationDetailsAPI(params.applicationId);
    if (res.remote === "success") {
      setApplicantDetails(res.data);
    }
  };
  useEffect(() => {
    getApplicantDetails();
  }, []);
  return (
    <>
      <div className="job-application">
        <Card
          sx={{
            "&.MuiCard-root": {
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              mb: 3,
            },
          }}
        >
          <CardContent
            sx={{
              "&.MuiCardContent-root": {
                padding: "25px 25px 25px",
              },
            }}
          >
            {/* -------------- header  ------------ */}

            <Stack
              direction="row"
              spacing={2}
              alignItems={{ xs: "start", lg: "center" }}
              className="recent-content job-border pb-2 mb-3"
            >
              <IconButton LinkComponent={Link} onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                alignItems={{ xs: "start", lg: "center" }}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <h4>{applicantDetails.user.name}</h4>
                <div
                  className="recent-research"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    Appliedvfvc {dayjs(applicantDetails.createdAt).fromNow()}{" "}
                    to:{" "}
                  </span>
                  <div>{applicantDetails.tender.title}</div>
                </div>
              </Stack>
            </Stack>

            {/* -------------- applicant basic info ---------- */}

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={applicantDetails.user.profileImage}
                    sx={{ width: "70px", height: "70px" }}
                  />
                  <div className="user-application">
                    <Link
                      to={urlcat("/vendor/:userId/profile", {
                        userId: applicantDetails.user.id || "a",
                      })}
                    >
                      <h4>{applicantDetails.user.name}</h4>
                    </Link>
                    {applicantDetails.user.profile?.country?.title ? (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>{<SVG.LocationIcon />}</span>{" "}
                        <span>
                          {applicantDetails.user.profile?.country?.title},
                          {applicantDetails.user.profile?.city?.title}
                        </span>
                      </Stack>
                    ) : (
                      ""
                    )}
                  </div>
                </Stack>
              </Grid>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack
                  direction="row"
                  spacing={0}
                  className="edit-button"
                  alignItems="center"
                >
                  <ApplicationOptions
                    details={applicantDetails}
                    interviewPlanned
                    shortlist
                    reject
                    blacklist
                    message
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={3}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <div className="user-descrition">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      applicantDetails.shortLetter ||
                      applicantDetails.user.profile.description,
                  }}
                />
              </div>
              <div className="attachment-box">
                {applicantDetails.attachments.length ? (
                  <h2>Attachments</h2>
                ) : (
                  ""
                )}
                {applicantDetails.attachments.map((attachment) => {
                  return (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      key={attachment.id}
                    >
                      <span className="d-inline-flex">
                        {<SVG.OrangeIcon />}
                      </span>
                      <a
                        href={generateFileUrl(attachment.path)}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#000" }}
                      >
                        {attachment.title}
                      </a>
                    </Stack>
                  );
                })}
              </div>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ApplicantDetails;
