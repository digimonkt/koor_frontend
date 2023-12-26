import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { generateFileUrl } from "@utils/generateFileUrl";
import { SVG } from "@assets/svg";
import CoverLetter from "../cover-letter";
import { YEAR_FORMAT } from "@utils/constants/constants";
import dayjs from "dayjs";

function ResumeTemplate({ user, appliedJob = false }) {
  const { currentUser } = useSelector((state) => state.auth);
  const applicantDetails = user || currentUser;
  const [, setBase64Image] = useState("");
  useEffect(() => {
    const convertImageToBase64 = async () => {
      try {
        const response = await fetch(
          generateFileUrl(applicantDetails?.profileImage)
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
    <div className="job-application pages" id="div-to-pdf">
      <div className="container resume_template">
        <div className="heading">
          <h1>{applicantDetails.name}</h1>
        </div>
        <div className="section">
          <div className="cv_first_div">
            <div style={{ width: "44%", padding: "20px 15px 20px 0px" }}>
              <div className="top_div">
                <ul>
                  {applicantDetails.mobileNumber && (
                    <li>
                      {" "}
                      <SVG.callTrik style={{ marginRight: "5px" }} />
                      {applicantDetails.countryCode +
                        " " +
                        applicantDetails.mobileNumber}
                    </li>
                  )}
                  {applicantDetails.email && (
                    <li>
                      <SVG.mailTrik style={{ marginRight: "5px" }} />
                      {applicantDetails.email}
                    </li>
                  )}
                  {applicantDetails?.profile?.website && (
                    <li>
                      <SVG.languageTrik style={{ marginRight: "5px" }} />
                      {applicantDetails?.profile?.website}
                    </li>
                  )}
                  {applicantDetails.profile?.country?.title && (
                    <li>
                      <SVG.locationTrik style={{ marginRight: "5px" }} />
                      {applicantDetails.profile?.city &&
                        applicantDetails.profile?.city.title + ", "}
                      {applicantDetails.profile?.country?.title}
                    </li>
                  )}
                </ul>
              </div>
              <hr className="horizontal_line" />
              {Boolean(applicantDetails.skills.length) && (
                <>
                  <div className="skills_div">
                    <h2>SKILLS</h2>
                    {applicantDetails.skills.map((item, index) => (
                      <button key={index} className="skills_btn">
                        {item.skill.title}
                      </button>
                    ))}
                  </div>
                  <hr />
                </>
              )}
              {Boolean(applicantDetails.educationRecord.length) && (
                <>
                  <div className="education">
                    <h2>EDUCATION</h2>
                    {applicantDetails.educationRecord.map((item, index) => (
                      <div key={index} style={{ margin: "20px 0px" }}>
                        <div className="education_div">
                          <p>
                            {dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
                            {item.present
                              ? "Present"
                              : dayjs(item.endDate).format(YEAR_FORMAT)}
                          </p>
                          <span>{item.educationLevel.title}</span>
                          <h3>{item.institute}</h3>
                          <h6>{item?.description}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </>
              )}
              {/* <div className="education">
              <h2>Expertise</h2>
              <div className="education_div">
                <h3>My expertise area</h3>
                <h6>
                  Maecenas bibendum at mattis gravida pellentesque dolor nibh
                  amet. At sem vitae leo maecenas tincidunt orci ut. Arcu in
                  vestibulum phasellus eu. Semper nunc eget varius diam habitant
                  id lacus.
                </h6>
              </div>
              <div style={{ margin: "20px 0px" }}></div>
              <div className="education_div">
                <h3>Product development</h3>
                <h6>
                  Maecenas bibendum at mattis gravida pellentesque dolor nibh
                  amet. At sem vitae leo maecenas tincidunt orci ut.{" "}
                </h6>
              </div>
              <div style={{ margin: "20px 0px" }}></div>
              <div className="education_div">
                <h3>Digital product development and team management</h3>
                <h6>
                  Maecenas bibendum at mattis gravida pellentesque dolor nibh
                  amet. At sem vitae leo maecenas tincidunt orci ut. Maecenas
                  bibendum at mattis gravida pellentesque dolor nibh amet. At
                  sem vitae leo maecenas tincidunt orci ut. Maecenas bibendum at
                  mattis gravida pellentesque dolor nibh amet. At sem vitae leo
                  maecenas tincidunt orci ut.{" "}
                </h6>
              </div>
            </div>
            <hr /> */}
              {/* <div className="refrence">
              <h2>Refrence</h2>
              <h3 style={{ marginBottom: "5px" }}>Abdimajid Omar</h3>
              <span>
                <SVG.callTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
              <span>
                <SVG.mailTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
              <h3 style={{ marginBottom: "5px", marginTop: "10px" }}>
                Second reference name
              </h3>
              <span>
                <SVG.callTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
              <span>
                <SVG.mailTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
            </div>
            <hr /> */}
              {/* <div className="certification">
              <h2>CERTIFICATION</h2>
              <div className="certification_div">
                <p>2016-2018</p>
                <span>Credly</span>
                <h3>User research and user experience</h3>
              </div>
            </div>
            <hr /> */}
              {Boolean(applicantDetails.languages.length) && (
                <div className="language">
                  <h2>LANGUAGE</h2>
                  <div className="language_div">
                    {applicantDetails.languages.map((item, index) => (
                      <div key={index} style={{ marginRight: "40px" }}>
                        <h6>{item.language.title}</h6>
                        <p>Spoken: {item?.spoken}</p>
                        <p>Written: {item?.written}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ width: "2px", backgroundColor: "#cacaca" }}></div>
            <div style={{ width: "54%", padding: "20px 0px 20px 15px" }}>
              <div className="profile">
                <h2>PROFILE</h2>
                <p>{applicantDetails.profile.description}</p>
              </div>
              <hr />
              {Boolean(applicantDetails.workExperiences.length) && (
                <div className="work_experiance">
                  <h2>Work Experience</h2>
                  {applicantDetails.workExperiences.map((item, index) => (
                    <div
                      className="job_position"
                      key={index}
                      style={{ marginTop: "25px" }}
                    >
                      <span>{item.title}</span>
                      <div className="work_experiance_div">
                        <h3>{item.organization}</h3>
                        <h3>
                          {dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
                          {item.present
                            ? "Present"
                            : dayjs(item.endDate).format(YEAR_FORMAT)}
                        </h3>
                      </div>
                      {item?.description && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                          style={{
                            wordBreak: "break-all",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {appliedJob && (
          <>
            {/* <div className="footer"> */}
            {/*   <p>This resume is generated with</p> */}
            {/*   <SVG.logoHorizontalTrik style={{ marginRight: "5px" }} /> */}
            {/* </div> */}
            <div id="page-break"></div>
            <CoverLetter
              applicantDetails={applicantDetails}
              content={appliedJob}
            />
          </>
        )}
        {/* <div className="footer">
          <p>This resume is generated with</p>
          <SVG.logoHorizontalTrik style={{ marginRight: "5px" }} />
        </div> */}
      </div>
    </div>
  );
}

export default ResumeTemplate;
