import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { generateFileUrl } from "@utils/generateFileUrl";
import { Stack, Avatar, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";
import { Fragment } from "react";
import { SVG } from "@assets/svg";

const AvatarComponent = ({ imageUrl }) => {
  return (
    <div>
      <Avatar
        sx={{
          width: "100%",
          height: "100%",
          margin: "auto",
          color: "#CACACA",
          maxWidth: "100px",
          maxHeight: "100px",
          fontSize: "15rem",
          borderRadius: "10px",
          "&.MuiAvatar-colorDefault": {
            background: "#F0F0F0",
          },
        }}
        src={generateFileUrl(imageUrl || "")}
      >
        <BusinessCenterOutlinedIcon
          sx={{
            width: "100%",
            padding: "30px",
            height: "100%",
            maxWidth: "100px",
            maxhigh: "100px",
            "@media (max-width: 600px)": {
              minWidth: "100px",
              minHeight: "100px",
              height: "100%",
            },
          }}
        />
      </Avatar>
    </div>
  );
};

const JobDetailsComponent = ({
  jobDetails,
  isStart,
  selfJob,
  isLoggedIn,
  role,
  matches,
  isSaved,
  applied,
  handleSave,
}) => {
  console.log(applied);
  return (
    <>
      {Boolean(jobDetails.budgetAmount) && (
        <div className="pricebox py-3 me-lg-4">
          <span className="d-block">UP TO</span>
          <h4>
            <small>{"$"}</small>
            {jobDetails?.budgetAmount || ""}
          </h4>
          <span>{jobDetails.budgetPayPeriod}</span>
        </div>
      )}
      {selfJob ? (
        <div className="job-button-card">
          <button>
            {isStart === "active" ? (
              <>
                <span className="d-block">Hold</span>
              </>
            ) : (
              <>
                <span className="d-block">Start</span>
              </>
            )}
          </button>
          <button>
            <span className="d-block">Edit</span>
          </button>
        </div>
      ) : (
        isLoggedIn &&
        role === USER_ROLES.jobSeeker && (
          <Fragment>
            {!applied ? (
              <div
                onClick={handleSave}
                style={{ marginLeft: "6px", cursor: "pointer" }}
              >
                <div
                  className="bookmark"
                  style={{ width: matches ? "auto" : "" }}
                >
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
            ) : (
              "sdf"
            )}
          </Fragment>
        )
      )}
    </>
  );
};

const JobButtons = ({
  jobDetails,
  isStart,
  selfJob,
  isLoggedIn,
  isSaved,
  applied,
  handleSave,
}) => {
  const matches = useMediaQuery("(max-width:600px)");
  const { role } = useSelector(({ auth }) => auth);
  console.log(role, "role");
  return (
    <Stack
      direction={"row"}
      spacing={2}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <AvatarComponent imageUrl={jobDetails?.user?.image?.path} />
      {matches && (
        <JobDetailsComponent
          jobDetails={jobDetails}
          isStart={isStart}
          selfJob={selfJob}
          isLoggedIn={isLoggedIn}
          role={role}
          matches={matches}
          isSaved={isSaved}
          applied={applied}
          handleSave={handleSave}
        />
      )}
    </Stack>
  );
};

export default JobButtons;
