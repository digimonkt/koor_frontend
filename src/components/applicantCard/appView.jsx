import { Avatar, Box, Chip, Stack } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { SVG } from "../../assets/svg";
import ApplicationOptions from "../../components/applicationOptions";

function AppView({ prop }) {
  console.log({ prop });
  const { details, sx, shortlist } = prop;
  const [jobOrTenderDetails, setJobOrTenderDetails] = useState({});
  useEffect(() => {
    setJobOrTenderDetails(details.tender || details.job);
  });
  return (
    <>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: "2", lg: "2" }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        justifyContent={{ xs: "center", lg: "space-between" }}
        className="border-recent"
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems={{ xs: "flex-start", lg: "row" }}
          sx={{ width: "57%", "@media (max-width:992px)": { width: "auto" } }}
        >
          <Avatar
            src={generateFileUrl(details.user.image?.path || "")}
            sx={{
              width: "70px",
              height: "70px",
              "@media(max-width:768px)": {
                width: "50px",
                height: "50px",
              },
            }}
          />
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 0, lg: 2 }}
            alignItems={{ xs: "flex-start", lg: "flex-startr" }}
            sx={{ mb: 1, ...sx }}
            width="100%"
            display="flex"
            flewWrap="nowrap"
          >
            <h4>{details?.user?.name || details?.user?.email}</h4>
            <div
              className="recent-contant"
              style={{
                fontSize: "10px",
                display: "flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              <span>
                Applied{" "}
                <strong>
                  {dayjs.utc(details?.createdAt).local().fromNow()}
                </strong>
              </span>
            </div>
          </Stack>
          <div>
            <Box
              sx={{
                fontSize: "11px",
                fontFamily: "Poppins",
                fontWeight: "400",
                color: "#121212",
                borderLeft: "1px solid #cacaca",
                paddingLeft: "10px",
              }}
            >
              {`${jobOrTenderDetails?.title?.substring(0, 50)}...`}
            </Box>

            <div className="recent-descrition">
              <p>{details?.shortLetter || details?.user?.description}</p>
            </div>
          </div>
        </Stack>

        <Stack
          direction="row"
          spacing={0}
          // flexWrap={"wrap"}
          // useFlexGap
          className="edit-button"
          justifyContent="space-between"
          sx={{
            // marginLeft: {
            //   sm: "0px !important",
            //   xs: "0px",
            // },
            marginTop: "5px !important",
            width: "100%",
          }}
        >
          <div className="recent-descrition mobile-recent-descrition mt-2">
            <p>{details?.shortLetter || details?.user?.description}</p>
          </div>
          <div>
            <ApplicationOptions details={details} shortlist={shortlist} />
          </div>
        </Stack>
        {details?.education || details?.skills || details?.language ? (
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            sx={{
              mb: 1,
              ...sx,
            }}
            className="meets_div"
          >
            <span className="meets">
              Meets your
              <br /> requirements with:{" "}
            </span>
            <Stack
              sx={{ ...sx, overflowX: "scroll", width: "160px" }}
              direction={"row"}
              alignItems={"center"}
              spacing={1}
            >
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
            </Stack>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}

export default AppView;
