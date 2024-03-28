import React, { useEffect, useState } from "react";
import "./style.css";
import { generateFileUrl } from "@utils/generateFileUrl";

const CoverLetter = ({ applicantDetails, content }) => {
  const [base64Image, setBase64Image] = useState("");
  console.log("here is data", applicantDetails, content);

  useEffect(() => {
    const convertImageToBase64 = async () => {
      try {
        const response = await fetch(
          generateFileUrl(applicantDetails?.signature?.path),
        );
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;
          setBase64Image(base64String);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    };

    convertImageToBase64();
  }, []);

  return (
    <>
      <div className="pages">
        <div className="coverletter_div section">
          <h2>To whom it may concern,</h2>
          <p>{content}</p>
          <h3 style={{ marginTop: "50px" }}>Sincerely,</h3>
          {Boolean(applicantDetails?.signature?.id) && (
            <img
              width={135}
              height={85}
              src={base64Image}
              alt={applicantDetails?.signature?.title}
            />
          )}
          <h3>{applicantDetails.name}</h3>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;
