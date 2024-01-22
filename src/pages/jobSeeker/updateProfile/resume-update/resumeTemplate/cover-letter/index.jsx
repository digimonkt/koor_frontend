import React from "react";
import "./style.css";

const CoverLetter = ({ applicantDetails, content }) => {
  return (
    <>
      <div className="pages">
        <div className="coverletter_div section">
          <h2>To whom it may concern,</h2>
          <p>{content}</p>
          <h3 style={{ marginTop: "50px" }}>Sincerely,</h3>
          <h3>{applicantDetails.name}</h3>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;
