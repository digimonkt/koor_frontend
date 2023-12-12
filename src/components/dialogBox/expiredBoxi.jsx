import React from "react";
import DialogBox from ".";
import { Link } from "react-router-dom";
import { OutlinedButton } from "@components/button";

const ExpiredBoxComponent = ({ open, handleClose }) => {
  const currentUrl = window.location.href;

  const isTenderPage = currentUrl.includes("tender");
  const pageType = isTenderPage ? "tenders" : "jobs";

  return (
    <DialogBox open={open} handleClose={handleClose}>
      <div>
        <h1 className="heading" style={{ textTransform: "capitalize" }}>
          {pageType === "tenders" ? "tender" : "job"} has Expired
        </h1>
        <div className="form-content">
          <p className="jobs_dailog_content">
            This posted has expired. So you can't apply for this {pageType}.
          </p>
          <div style={{ textAlign: "center", lineHeight: "40px" }}>
            <Link to={`/search/${pageType}`}>
              <OutlinedButton
                title="Go Back"
                jobSeeker
                sx={{
                  fontSize: "16px !important",
                  width: "100%",
                  color: "#274593 !important",
                  "@media (max-width: 992px)": {
                    fontSize: "16px !important",
                  },
                  "@media (max-width: 480px)": {
                    fontSize: "14px !important",
                  },
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </DialogBox>
  );
};

export default ExpiredBoxComponent;
