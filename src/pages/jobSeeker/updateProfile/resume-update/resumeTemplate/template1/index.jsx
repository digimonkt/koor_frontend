// import { useSelector } from "react-redux";
// import "./style.css";
// import { SVG } from "@assets/svg";
// import CoverLetter from "../cover-letter";
// import { YEAR_FORMAT } from "@utils/constants/constants";
// import dayjs from "dayjs";

// function ResumeTemplate({ user, appliedJob = false }) {
//   const { currentUser } = useSelector((state) => state.auth);
//   const applicantDetails = user || currentUser;
//   return (
//     <div className="job-application pages" id="div-to-pdf">
//       <div className="container resume_template">
//         <div className="heading">
//           <h1>{applicantDetails.name}</h1>
//         </div>
//         <div className="heading">
//           <h5>{applicantDetails?.profile?.profileTitle}</h5>
//         </div>
//         <div className="section">
//           <div className="cv_first_div">
//             <div style={{ width: "44%", padding: "20px 15px 20px 0px" }}>
//               <div className="top_div">
//                 <ul>
//                   {applicantDetails.mobileNumber && (
//                     <li>
//                       {" "}
//                       <SVG.callTrik style={{ marginRight: "5px" }} />
//                       {applicantDetails.countryCode +
//                         " " +
//                         applicantDetails.mobileNumber}
//                     </li>
//                   )}
//                   {applicantDetails.email && (
//                     <li>
//                       <SVG.mailTrik style={{ marginRight: "5px" }} />
//                       {applicantDetails.email}
//                     </li>
//                   )}
//                   {applicantDetails?.profile?.personalWebsite && (
//                     <li>
//                       <SVG.languageTrik style={{ marginRight: "5px" }} />
//                       {applicantDetails?.profile?.personalWebsite}
//                     </li>
//                   )}
//                   {applicantDetails.profile?.country?.title && (
//                     <li>
//                       <SVG.locationTrik style={{ marginRight: "5px" }} />
//                       {applicantDetails.profile?.city &&
//                         applicantDetails.profile?.city.title + ", "}
//                       {applicantDetails.profile?.country?.title}
//                     </li>
//                   )}
//                 </ul>
//               </div>
//               <hr className="horizontal_line" />
//               {Boolean(applicantDetails.skills.length) && (
//                 <>
//                   <div className="skills_div">
//                     <h2>SKILLS</h2>
//                     {applicantDetails.skills.map((item, index) => (
//                       <button key={index} className="skills_btn">
//                         {item.skill.title}
//                       </button>
//                     ))}
//                   </div>
//                   <hr />
//                 </>
//               )}
//               {Boolean(applicantDetails.educationRecord.length) && (
//                 <>
//                   <div className="education">
//                     <h2>EDUCATION</h2>
//                     {applicantDetails.educationRecord.map((item, index) => (
//                       <div key={index} style={{ margin: "20px 0px" }}>
//                         <div className="education_div">
//                           <p>
//                             {dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
//                             {item.present
//                               ? "Present"
//                               : dayjs(item.endDate).format(YEAR_FORMAT)}
//                           </p>
//                           <span>{item.educationLevel.title}</span>
//                           <h3>{item.institute}</h3>
//                           <h6>{item?.description}</h6>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <hr />
//                 </>
//               )}
//               {/* <div className="education">
//               <h2>Expertise</h2>
//               <div className="education_div">
//                 <h3>My expertise area</h3>
//                 <h6>
//                   Maecenas bibendum at mattis gravida pellentesque dolor nibh
//                   amet. At sem vitae leo maecenas tincidunt orci ut. Arcu in
//                   vestibulum phasellus eu. Semper nunc eget varius diam habitant
//                   id lacus.
//                 </h6>
//               </div>
//               <div style={{ margin: "20px 0px" }}></div>
//               <div className="education_div">
//                 <h3>Product development</h3>
//                 <h6>
//                   Maecenas bibendum at mattis gravida pellentesque dolor nibh
//                   amet. At sem vitae leo maecenas tincidunt orci ut.{" "}
//                 </h6>
//               </div>
//               <div style={{ margin: "20px 0px" }}></div>
//               <div className="education_div">
//                 <h3>Digital product development and team management</h3>
//                 <h6>
//                   Maecenas bibendum at mattis gravida pellentesque dolor nibh
//                   amet. At sem vitae leo maecenas tincidunt orci ut. Maecenas
//                   bibendum at mattis gravida pellentesque dolor nibh amet. At
//                   sem vitae leo maecenas tincidunt orci ut. Maecenas bibendum at
//                   mattis gravida pellentesque dolor nibh amet. At sem vitae leo
//                   maecenas tincidunt orci ut.{" "}
//                 </h6>
//               </div>
//             </div>
//               {/* <div className="certification">
//               <h2>CERTIFICATION</h2>
//               <div className="certification_div">
//                 <p>2016-2018</p>
//                 <span>Credly</span>
//                 <h3>User research and user experience</h3>
//               </div>
//             </div>
//             <hr /> */}
//               {Boolean(applicantDetails?.profile?.references[0]?.name) && (
//                 <>
//                   <div>
//                     <h2>References</h2>
//                     {applicantDetails?.profile?.references?.map(
//                       (reference, idx) => (
//                         <div key={idx} className="reference">
//                           <h3 style={{ marginBottom: "5px" }}>
//                             {reference?.name}
//                           </h3>
//                           {Boolean(reference?.mobile_number) && (
//                             <>
//                               <span>
//                                 <SVG.callTrik style={{ marginRight: "5px" }} />
//                                 {reference?.mobile_number}
//                               </span>
//                               <br />
//                             </>
//                           )}
//                           {Boolean(reference?.email) && (
//                             <span>
//                               <SVG.mailTrik style={{ marginRight: "5px" }} />
//                               {reference?.email}
//                             </span>
//                           )}
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 </>
//               )}
//               <hr />
//               {Boolean(applicantDetails.languages.length) && (
//                 <div className="language">
//                   <h2>LANGUAGE</h2>
//                   <div className="language_div">
//                     {applicantDetails.languages.map((item, index) => (
//                       <div key={index} style={{ marginRight: "40px" }}>
//                         <h6>{item.language.title}</h6>
//                         <p>Spoken: {item?.spoken}</p>
//                         <p>Written: {item?.written}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div style={{ width: "2px", backgroundColor: "#cacaca" }}></div>
//             <div style={{ width: "54%", padding: "20px 0px 20px 15px" }}>
//               <div className="profile">
//                 <h2>Overview</h2>
//                 <p>{applicantDetails.profile?.shortSummary}</p>
//               </div>
//               <hr />
//               {Boolean(applicantDetails.workExperiences.length) && (
//                 <div className="work_experiance">
//                   <h2>Work Experience</h2>
//                   {applicantDetails.workExperiences.map((item, index) => (
//                     <div
//                       className="job_position"
//                       key={index}
//                       style={{ marginTop: "25px" }}
//                     >
//                       <span>{item.title}</span>
//                       <div className="work_experiance_div">
//                         <h3>{item.organization}</h3>
//                         <h3>
//                           {dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
//                           {item.present
//                             ? "Present"
//                             : dayjs(item.endDate).format(YEAR_FORMAT)}
//                         </h3>
//                       </div>
//                       {item?.description && (
//                         <p
//                           dangerouslySetInnerHTML={{
//                             __html: item?.description,
//                           }}
//                           style={{
//                             wordBreak: "break-all",
//                           }}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {appliedJob && (
//           <>
//             {/* <div className="footer"> */}
//             {/*   <p>This resume is generated with</p> */}
//             {/*   <SVG.logoHorizontalTrik style={{ marginRight: "5px" }} /> */}
//             {/* </div> */}
//             <div id="page-break"></div>
//             <CoverLetter
//               applicantDetails={applicantDetails}
//               content={appliedJob}
//             />
//           </>
//         )}
//         {/* <div className="footer">
//           <p>This resume is generated with</p>
//           <SVG.logoHorizontalTrik style={{ marginRight: "5px" }} />
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default ResumeTemplate;

import {
  MONTH_YEAR_FORMAT,
  YEAR_FORMAT,
} from "../../../../../../utils/constants/constants";
import dayjs from "dayjs";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useSelector } from "react-redux";
import CoverLetter from "../cover-letter";
import "./style.css";

function ResumeTemplate({ user, appliedJob = false }) {
  const { currentUser } = useSelector((state) => state.auth);
  const showUser = user || currentUser;

  return (
    <div className="container" id="div-to-pdf">
      <div className="header">
        <div className="full-name">
          <h4>CURICULUM VITAE (CV)</h4>
          <div>
            <span className="first-name">{showUser.name}</span>
          </div>
        </div>
        <div className="contact-info">
          <span className="phone">Phone : </span>
          <span className="phone-val">
            {showUser.countryCode && showUser.mobileNumber
              ? formatPhoneNumberIntl(
                  showUser.countryCode + showUser.mobileNumber,
                )
              : ""}
          </span>
          <br />
          <span className="email">Email : </span>
          <a
            href={`mailto: ${showUser.email}`}
            target="_blank"
            className="email-val"
            rel="noreferrer"
          >
            {showUser.email}
          </a>
        </div>
      </div>
      <div className="about">
        <p className="position">PROFILE SUMMARY</p>
        <p className="job-description">{showUser.profile.shortSummary}</p>
      </div>
      <div className="knowledge">
        <p className="title">KNOWLEDGE AND EXPERTISE</p>
        <ul>
          {showUser.skills.map((skill) => (
            <li key={skill.id}>{skill.skill.title}</li>
          ))}
        </ul>
      </div>
      <div className="education">
        <p className="title">Education</p>
        <ul>
          {showUser.educationRecord.map((education) => {
            return (
              <li key={education.id}>
                {dayjs(education.startDate).format(YEAR_FORMAT)} -{" "}
                {education.present
                  ? "Present"
                  : dayjs(education.endDate).format(YEAR_FORMAT)}{" "}
                {education.title} - {education.institute}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="summary">
        <p className="title">Employment Summary</p>
        {showUser.workExperiences.map((experience) => {
          return (
            <React.Fragment key={experience.id}>
              <span>
                {dayjs(experience.startDate).format(MONTH_YEAR_FORMAT)} -{" "}
                {experience.present
                  ? "Present"
                  : dayjs(experience.endDate).format(MONTH_YEAR_FORMAT)}
                :{" "}
              </span>
              <span className="title">{experience.title}</span> -{" "}
              <span className="responsibility">{experience.organization}</span>{" "}
              <p
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: experience.description }}
              ></p>
            </React.Fragment>
          );
        })}
      </div>
      <div className="qualification">
        <p className="title">Languages</p>
        <ul>
          {showUser.languages.map((language) => (
            <li key={language.id}>
              <h4>{language.language.title}</h4>
              <span>Spoken: {language.spoken}</span> <br />
              <span>Written: {language.written}</span>
            </li>
          ))}
        </ul>
      </div>
      {appliedJob && (
        <>
          <div id="page-break"></div>
          <CoverLetter applicantDetails={showUser} content={appliedJob} />
        </>
      )}
    </div>
  );
}

export default ResumeTemplate;
