import { SVG } from "../../../assets/svg";
import { Avatar, Box } from "@mui/material";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import { USER_ROLES } from "../../../utils/enum";
import { useSelector } from "react-redux";
function JobCostCard({ amount, payPeriod, user }) {
  const { role } = useSelector((state) => state.auth);
  return (
    <>
      {amount ? (
        <div className={`${styles.monthBox}`}>
          <>
            {payPeriod ? <h4>UP TO</h4> : "BUDGET"}
            <p
              className="m-0"
              style={{
                color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
              }}
            >
              $ <span>{amount}</span>
            </p>
            {payPeriod ? <h5 className="mt-0">/ {payPeriod}</h5> : "/ month"}
          </>
        </div>
      ) : (
        ""
      )}
      <Box
        className={`${styles.lotus}`}
        sx={{
          "@media (max-width: 600px)": {
            borderBottom: "0px",
            paddingBottom: "0px",
          },
        }}
      >
        <div className={`${styles.lotusimg}`}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              color: "#CACACA",
              "&.MuiAvatar-colorDefault": {
                background: "#F0F0F0",
              },
            }}
            src={generateFileUrl(user.image?.path)}
          >
            <SVG.UserIcon />
          </Avatar>
          <h3>
            <Link
              to={urlcat("/employer/:userId/profile", {
                userId: user.id || "null",
              })}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              {user.name}
            </Link>
          </h3>
        </div>
        <div className={`mt-4 text-break text-wrap  ${styles.Numbers}`}>
          <span>{user.website}</span>
          <span>
            <Link
              to={`tel:${formatPhoneNumberIntl(
                user.countryCode + user.mobileNumber
              )}`}
            >
              {user.countryCode && user.mobileNumber
                ? formatPhoneNumberIntl(user.countryCode + user.mobileNumber)
                : ""}
            </Link>
          </span>
          <span>
            <Link to={`mailto:${user.email}`}>{user.email}</Link>
          </span>
        </div>
      </Box>
    </>
  );
}

export default JobCostCard;
