import { useSelector } from "react-redux";
import "./style.css";
import CoverLetter from "../cover-letter";
import { YEAR_FORMAT } from "@utils/constants/constants";
import dayjs from "dayjs";
import { SVG } from "@assets/svg";

function ResumeTemplate({ user, appliedJob = false }) {
  const { currentUser } = useSelector((state) => state.auth);
  const applicantDetails = user || currentUser;
  return (
    <div className="job-application pages" id="div-to-pdf">
      <div className="container resume_template">
        <div className="heading">
          <h1>{applicantDetails.name}</h1>
        </div>
        <div className="section">
          <div className="cv_first_div">
            <div className="top_div">
              {currentUser.profile.homeAddress && (
                <div className="element">
                  <div>
                    <h2>Adress:</h2>
                    <p>{currentUser.profile.homeAddress}</p>
                  </div>
                </div>
              )}
              <div className="element">
                {applicantDetails.mobileNumber && (
                  <div>
                    <h2>Phone:</h2>
                    <a
                      href={`tel:${
                        applicantDetails.countryCode +
                        applicantDetails.mobileNumber
                      }`}
                    >
                      {applicantDetails.countryCode +
                        " " +
                        applicantDetails.mobileNumber}
                    </a>
                  </div>
                )}
                {applicantDetails.email && (
                  <div>
                    <h2>Email:</h2>
                    <a href={`mailto:${applicantDetails.email}`}>
                      {applicantDetails.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="main_content">
              {applicantDetails.profile?.shortSummary && (
                <div className="element">
                  <h2>Summary profile</h2>
                  <p>{applicantDetails.profile?.shortSummary}</p>
                </div>
              )}
              {applicantDetails.educationRecord.length > 0 && (
                <div className="element">
                  <h2>Education and certificate</h2>
                  {applicantDetails.educationRecord.map((item, index) => (
                    <div key={index} className="education_div">
                      <div>
                        <span>{item.educationLevel.title}</span>
                        <p>{item.institute}</p>
                      </div>
                      <div>
                        <p>
                          {dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
                          {item.present
                            ? "Present"
                            : dayjs(item.endDate).format(YEAR_FORMAT)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {applicantDetails.workExperiences.length > 0 && (
                <div className="element">
                  <h2>Experience</h2>
                  {applicantDetails.workExperiences.map((item, index) => (
                    <div className="job_position" key={index}>
                      <span>
                        {item.title} at {item.organization}
                      </span>
                      <div className="work_experiance_div">
                        <p>
                          {dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
                          {item.present
                            ? "Present"
                            : dayjs(item.endDate).format(YEAR_FORMAT)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {applicantDetails.skills.length > 0 && (
                <div className="element">
                  <h2>Skills</h2>
                  <p>
                    {applicantDetails.skills.map(
                      (item, index) =>
                        `${item.skill.title}${
                          applicantDetails.skills.length - 1 === index
                            ? ""
                            : ", "
                        }`
                    )}
                  </p>
                </div>
              )}
              {applicantDetails.languages.length > 0 && (
                <div className="element">
                  <h2>Languages</h2>
                  <p>
                    {applicantDetails.languages.map(
                      (item, index) =>
                        `${item.language.title}${
                          applicantDetails.languages.length - 1 === index
                            ? ""
                            : ", "
                        }`
                    )}
                  </p>
                </div>
              )}
              {applicantDetails?.profile?.references.length > 0 && (
                <div className="element">
                  <h2>References</h2>
                  {applicantDetails?.profile?.references?.map(
                    (reference, index) => (
                      <div className="references_div" key={index}>
                        <p>{reference?.name}</p>
                        {(reference?.mobile_number || reference?.email) && (
                          <div>
                            {reference?.mobile_number && (
                              <a
                                href={`tel:${
                                  applicantDetails.countryCode +
                                  reference?.mobile_number
                                }`}
                              >
                                <SVG.callTrik style={{ marginRight: "5px" }} />
                                <span>
                                  {applicantDetails.countryCode +
                                    reference?.mobile_number}
                                </span>
                              </a>
                            )}
                            {reference?.email && (
                              <a href={`mailto:${reference?.email}`}>
                                <SVG.mailTrik style={{ marginRight: "5px" }} />
                                <span>{reference?.email}</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
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
