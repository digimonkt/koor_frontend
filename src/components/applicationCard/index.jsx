import { Avatar, Chip, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { SVG } from "@assets/svg";
import { generateFileUrl } from "@utils/generateFileUrl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ApplicationOptions from "@components/applicationOptions";
dayjs.extend(relativeTime);

const ApplicationCard = ({
  details,
  sx,
  isShortlisted,
  allOptions,
  isRejected,
}) => {
  // navigate
  // const navigate = useNavigate();

  // handle navigation
  // const handleNavigate = () => {
  //   navigate("/employer/manage-jobs/applicant-details");
  // };
  // const [isShortlisted, setIsShortlisted] = useState(false);
  // const [isRejected, setIsRejected] = useState(false);
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={generateFileUrl(details?.user?.image?.path || "")}
          sx={{ width: "70px", height: "70px" }}
        />{" "}
        <div className="recent-content">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            flexWrap="wrap"
            alignItems="center"
            sx={{ mb: 1, ...sx }}
          >
            <h4>{details?.user?.name || details?.user?.email}</h4>
            <div className="recent-research" style={{ flexWrap: "wrap" }}>
              <span>
                Applied <strong>{dayjs(details?.createdAt).fromNow()}</strong>{" "}
                to:{" "}
              </span>
              <div>{details?.job?.title}</div>
            </div>
            {/* {subTitle && <div className="recent-research">{subTitle}</div>} */}
          </Stack>
          {details?.education || details?.skills || details?.language ? (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1, ...sx }}
              className="meets_div"
            >
              <div>
                <span className="meets">Meets your requirements with: </span>
              </div>
              <div>
                <>
                  {details?.education && (
                    <Chip
                      label="Education"
                      className="chiplabel"
                      icon={<SVG.SchoolIcon />}
                    />
                  )}
                  {details?.skills && (
                    <Chip
                      label="Skills"
                      className="chiplabel"
                      icon={<SVG.SmallSkillsIcon />}
                    />
                  )}
                  {details?.language && (
                    <Chip
                      label="Language"
                      className="chiplabel"
                      icon={<SVG.SmallLangugeIcon />}
                    />
                  )}
                </>
              </div>
            </Stack>
          ) : (
            ""
          )}
          <div className="recent-descrition">
            <p>{details?.shortLetter || details?.user?.description}</p>
          </div>
        </div>
      </Stack>
      <Stack direction="row" spacing={0} className="edit-button">
        <ApplicationOptions
          allOptions={allOptions}
          applicationId={details.id}
          isShortlisted={isShortlisted}
          isRejected={isRejected}
        />
      </Stack>
    </Stack>
  );
};

export default ApplicationCard;
