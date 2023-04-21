import { SVG } from "@assets/svg";
import { Avatar } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import styles from "./styles.module.css";
function JobCostCard({ amount, payPeriod, user }) {
  return (
    <>
      {amount ? (
        <div className={`${styles.monthBox}`}>
          <>
            <h4>UP TO</h4>
            <p className="m-0">
              $ <span>{amount}</span>
            </p>
            <h5 className="mt-0">/ {payPeriod}</h5>
          </>
        </div>
      ) : (
        ""
      )}
      <div className={`${styles.lotus}`}>
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
          <h3>{user.name}</h3>
        </div>
        <div className={`mt-4 text-break text-wrap ps-lg-5 ${styles.Numbers}`}>
          <span>{user.website}</span>
          <span>
            {user.countryCode && user.mobileNumber
              ? formatPhoneNumberIntl(user.countryCode + user.mobileNumber)
              : ""}
          </span>
          <span>{user.email}</span>
        </div>
      </div>
    </>
  );
}

export default JobCostCard;
