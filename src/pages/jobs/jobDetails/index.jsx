import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SVG } from "@assets/svg";
import { Link, useParams } from "react-router-dom";
import { getJobDetailsByIdAPI } from "@api/job";
import dayjs from "dayjs";
import { SolidButton, SearchButton } from "@components/button";
import { getColorByRemainingDays } from "@utils/generateColor";
import { generateFileUrl } from "@utils/generateFileUrl";
import { Avatar } from "@mui/material";
import { formatPhoneNumberIntl } from "react-phone-number-input";

const JobDetails = () => {
  const params = useParams();

  const [details, setDetails] = useState({
    id: "",
    title: "",
    description: "",
    budgetCurrency: "",
    budgetAmount: "",
    budgetPayPeriod: "",
    country: {
      id: "",
      title: "",
    },
    city: {
      id: "",
      title: "",
    },
    address: "",
    jobCategories: [],
    deadline: "",
    isFullTime: false,
    isPartTime: false,
    hasContract: false,
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
    highestEducation: {
      id: "",
      title: "",
    },
    languages: [],
    skills: [],
    workingDays: "5",
    status: "active",
    applicant: 0,
    createdAt: "2023-02-23T05:44:36",
    expiredInDays: 37,
    user: {
      id: "",
      name: "",
      email: "",
      countryCode: "",
      mobileNumber: "",
      image: {
        id: "",
        title: "",
        path: "",
        type: "image",
      },
    },
    attachments: [],
  });

  const getJobDetails = async (jobId) => {
    const res = await getJobDetailsByIdAPI({ jobId });
    console.log({ res });
    if (res.remote === "success") {
      setDetails(res.data);
    }
  };
  useEffect(() => {
    getJobDetails(params.jobId);
  }, [params.jobId]);
  return (
    <>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={`${styles.postJob}`}>
                  {/* <Link to="/saved-jobs"> */}
                  <span>{<SVG.LeftArrow />}</span>
                  {/* </Link> */}
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.clocs}`}>
                  <span>{<SVG.ClockIconSmall />}</span>
                  <p className="mb-0 mt-0 me-1">
                    <span>Posted:</span> {dayjs(details.createdAt).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > 0
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
                    color={getColorByRemainingDays(
                      details.expiredInDays > 0 ? details.expiredInDays : 0
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <div className={`${styles.contentJob}`}>
                  <h4>Details:</h4>
                  <p>{details.description}</p>
                </div>
                <div className={`${styles.iconbtn}`}>
                  <SearchButton
                    text={details.country.title}
                    leftIcon={<SVG.LocationIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={`${details.workingDays || 2}-Day Week`}
                    leftIcon={<SVG.BagClock />}
                    className={`${styles.iconbutton}`}
                  />
                  {details.isFullTime && (
                    <SearchButton
                      text="Full Time"
                      leftIcon={<SVG.MoonCircle />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                  {details.isPartTime && (
                    <SearchButton
                      text="Part time"
                      leftIcon={<SVG.MoonCircle />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                  {details.hasContract && (
                    <SearchButton
                      text="Contract"
                      leftIcon={<SVG.MoonCircle />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                </div>
                <div className={`${styles.datesatrt}`}>
                  <span>{<SVG.StartDate />}</span>
                  <p className="m-0 ms-2">
                    <span className={`${styles.startDate}`}>Start date:</span>
                    <b className={`${styles.startB}`}>
                      Septermber 13 (From where this should come? I think we
                      need to add one more field in create job form - Saral
                      Shrivastava)
                    </b>
                  </p>
                </div>
                <div className={`${styles.downloadattachment}`}>
                  <h6>Download attachments</h6>
                  {details.attachments.map((attachment) => {
                    return (
                      <div
                        className={`${styles.downloadtext}`}
                        key={attachment.id}
                      >
                        <span className="d-inline-flex">
                          {<SVG.OrangeIcon />}
                        </span>
                        <a
                          href={generateFileUrl(attachment.path)}
                          target="_blank"
                          className="m-0"
                          rel="noreferrer"
                        >
                          {attachment.title}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </Grid>
              <Grid item xs={12} lg={4}>
                <div className={`${styles.monthBox}`}>
                  <h4>UP TO</h4>
                  <p className="m-0">
                    $ <span>{details.budgetAmount}</span>
                  </p>
                  <h5 className="mt-0">/ {details.budgetPayPeriod}</h5>
                </div>
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
                      src={generateFileUrl(details.user.image.path)}
                    >
                      <SVG.UserIcon />
                    </Avatar>
                    <h3>{details.user.name}</h3>
                  </div>
                  <div className={`${styles.Numbers}`}>
                    <span>{details.user.website}</span>
                    <span>
                      {details.user.countryCode && details.user.mobileNumber
                        ? formatPhoneNumberIntl(
                            details.user.countryCode + details.user.mobileNumber
                          )
                        : ""}
                    </span>
                    <span>{details.user.email}</span>
                  </div>
                </div>
                <div className={`${styles.jobpostbtn}`}>
                  <Link to="../job/apply/:jobId">
                    <SearchButton
                      text="Apply for this job"
                      className={`${styles.enablebtn}`}
                      lefticon={<SVG.Enable />}
                    />
                  </Link>

                  <SearchButton
                    text="Save job"
                    lefticon={<SVG.BlueFlag />}
                    className={`${styles.outlinebtn}`}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className={`${styles.requirement}`}>
                  <h5>Requirements:</h5>
                  <div className={`${styles.required}`}>
                    <h6>Education</h6>
                    {details.jobCategories.map((category) => {
                      return (
                        <div
                          className={`${styles.educations}`}
                          key={category.id}
                        >
                          <span></span>
                          <p className="m-0">{category.title}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className={`${styles.language}`}>
                    <h6 className="mb-0 mt-3">Languages</h6>
                    <Grid container spacing={2}>
                      {details.languages.map((language) => {
                        return (
                          <Grid item xs={4} key={language.id}>
                            <div className={`${styles.english}`}>
                              <span className={`${styles.dots}`}></span>
                              <div className={`${styles.englishtext}`}>
                                <h6 className="mb-0 mt-3">{language.title}</h6>
                                <span>Spoken: Fluent</span>
                                <span>Written: Fluent</span>
                              </div>
                            </div>
                            (From where These details come? maybe we need to
                            change post job form - Saral Shrivastava )
                          </Grid>
                        );
                      })}
                    </Grid>
                    <div className={`${styles.skills}`}>
                      <h6 className="mb-1">Skills</h6>
                      <div className={`${styles.skilssbtn}`}>
                        {details.skills.map((skill) => {
                          return (
                            <SearchButton
                              key={skill.id}
                              text={skill.title}
                              className={`${styles.grybtn}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location:</h3>
                  <p>{details.address}</p>
                  <div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14310.988719236786!2d78.1676101!3d26.269867549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1669036707774!5m2!1sen!2sin"
                      width="100%"
                      height="255"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="googleMap"
                    ></iframe>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.LikeJob}`}>
            <h2>more jobs like this:</h2>
            <p>
              RETAIL ASSISTANT CASHIER <span>– Dahli, India – 900$</span>
            </p>
            <p>
              Internship In Tourism & Hospitality{" "}
              <span>– Amsterdam, Netherlands – 2,700$</span>
            </p>
            <p>
              Online Research Participant (Work From Home/Part Time/Casual)
              #KerjaTrending. <span>– Berlin, Germany – 4,200$</span>
            </p>
            <p>
              Executive, Call Centre - (Kerja Office){" "}
              <span>– Kerja, Philippines – 1,400$</span>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default JobDetails;
