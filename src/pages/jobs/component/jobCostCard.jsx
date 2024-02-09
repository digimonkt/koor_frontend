import { SVG } from "../../../assets/svg";
import { Avatar, Box } from "@mui/material";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import { useSelector } from "react-redux";
import { getColorByRole } from "@utils/generateColor";

function JobCostCard({ amount, payPeriod, user, color = "" }) {
  const { role } = useSelector((state) => state.auth);
  return (
    <>
      {amount > 0 ? (
        <div className={`${styles.monthBox}`}>
          <>
            {payPeriod ? <h4>UP TO</h4> : "BUDGET"}
            <p
              className="m-0"
              style={{
                color: color ? getColorByRole(role) : color,
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
              "@media (max-width:992px)": {
                width: "70px",
                height: "70px",
              },
            }}
            src={generateFileUrl(user.image?.path)}
          >
            <SVG.UserIcon />
          </Avatar>
          <Box>
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
            <div
              className={`mt-4 text-break text-wrap  ${styles.Numbers}`}
              style={{ marginLeft: "18px" }}
            >
              <span>{user.website}</span>
              <span>
                <Link
                  to={`tel:${formatPhoneNumberIntl(
                    user.countryCode + user.mobileNumber,
                  )}`}
                >
                  {user.countryCode && user.mobileNumber
                    ? formatPhoneNumberIntl(
                        user.countryCode + user.mobileNumber,
                      )
                    : ""}
                </Link>
              </span>
              <span>
                <Link to={`mailto:${user.email}`}>{user.email}</Link>
              </span>
            </div>
          </Box>
        </div>
      </Box>
    </>
  );
}

export default JobCostCard;
