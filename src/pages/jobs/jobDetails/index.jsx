import React from "react";
import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SVG } from "../../../assets/svg";
import Searchbutton from "../../../components/button/Searchbutton";
import { IMAGES } from "../../../assets/images";
import { Link } from "react-router-dom";

const JobDetails = () => {
  return (
    <>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={`${styles.postJob}`}>
                  <Link to="/saved-jobs">
                    <span>{<SVG.LeftArrow />}</span>
                  </Link>
                  <p className="mb-0">
                    Online Research Participant (Work From Home/Part
                    Time/Casual) #KerjaTrending. Testing two rows of text.
                  </p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.clocs}`}>
                  <span>{<SVG.Clock />}</span>
                  <p className="mb-0 mt-0">
                    <span>Posted:</span> August 28, 2022
                  </p>
                  <Searchbutton
                    text="11 days left"
                    className={`${styles.greenbtn}`}
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <div className={`${styles.contentJob}`}>
                  <h4>Details:</h4>
                  <p>
                    Hi there! 👋 Though I don’t have an education mentioned in
                    your job post, I have 8 years of experience in the job
                    described. Please check out my resume, I’m sure you’ll like
                    it. Looking forward to talking in person! Information about
                    the person that they attach as a plain text to grab
                    employer’s attention. We can fit two rows here to be able to
                    showcase yourself before a potential employer even opens
                    your resume. Like “Hi, I’m Maraua and I’m the perfect fit
                    for your job”.
                  </p>
                  <p>Please check out my attachements below..</p>
                  <p>
                    I don’t have an education mentioned in your job post, I have
                    8 years of experience in the job described. Please check out
                    my resume, I’m sure you’ll like it. Looking forward to
                    talking in person! Information about the person that they
                    attach as a plain text to grab employer’s attention. We can
                    fit two rows here to be able to showcase yourself before a
                    potential employer even opens your resume. Like “Hi, I’m
                    Maraua and I’m the perfect fit for your job”.I don’t have an
                    education mentioned in your job post, I have 8 years of
                    experience in the job described. Please check out my resume,
                    I’m sure you’ll like it. Looking forward to talking in
                    person! Information about the person that they attach as a
                    plain text to grab employer’s attention. We can fit two rows
                    here to be able to showcase yourself before a potential
                    employer even opens your resume. Like “Hi, I’m Maraua and
                    I’m the perfect fit for your jobI don’t have an education
                    mentioned in your job post, I have 8 years of experience in
                    the job described. Please check out my resume, I’m sure
                    you’ll like it.{" "}
                  </p>
                </div>
                <div className={`${styles.iconbtn}`}>
                  <Searchbutton
                    text="5-Day week"
                    lefticon={<SVG.BagClock />}
                    className={`${styles.iconbutton}`}
                  />
                  <Searchbutton
                    lefticon={<SVG.HalfCircle />}
                    text="Full time"
                    className={`${styles.iconbutton}`}
                  />
                </div>
                <div className={`${styles.datesatrt}`}>
                  <span>{<SVG.StartDate />}</span>
                  <p className="m-0 ms-2">
                    <span className={`${styles.startDate}`}>Start date:</span>
                    <b className={`${styles.startB}`}>Septermber 13</b>
                  </p>
                </div>
                <div className={`${styles.downloadattachment}`}>
                  <h6>Download attachments</h6>
                  <div className={`${styles.downloadtext}`}>
                    <span className="d-inline-flex">{<SVG.OrangeIcon />}</span>
                    <p className="m-0">Muraua_Birhuneya_resume_2022.pdf</p>
                  </div>
                  <div className={`${styles.downloadtext}`}>
                    <span className="d-inline-flex">{<SVG.OrangeIcon />}</span>
                    <p className="m-0">Muraua_Birhuneya_resume_2022.pdf</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={`${styles.monthBox}`}>
                  <h4>UP TO</h4>
                  <p className="m-0">
                    $ <span>3,500</span>
                  </p>
                  <h5 className="mt-0">/ month</h5>
                </div>
                <div className={`${styles.lotus}`}>
                  <div className={`${styles.lotusimg}`}>
                    <img src={IMAGES.Lotus} alt="" />
                    <h3>Lotus's Employment Group LLC</h3>
                  </div>
                  <div className={`${styles.Numbers}`}>
                    <span>lotuss.us</span>
                    <span>+51599268290</span>
                    <span>contact@lotuss.us</span>
                  </div>
                </div>
                <div className={`${styles.jobpostbtn}`}>
                  <Link to="../jobs/applyJob/:jobId">
                    <Searchbutton
                      text="Apply for this job"
                      className={`${styles.enablebtn}`}
                      lefticon={<SVG.Enable />}
                    />
                  </Link>

                  <Searchbutton
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
                    <div className={`${styles.educations}`}>
                      <span></span>
                      <p className="m-0">Job manedgement – Bachelor</p>
                    </div>
                  </div>
                  <div className={`${styles.language}`}>
                    <h6 className="mb-0 mt-3">Languages</h6>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <div className={`${styles.english}`}>
                          <span className={`${styles.dots}`}></span>
                          <div className={`${styles.englishtext}`}>
                            <h6 className="mb-0 mt-3">English</h6>
                            <span>Spoken: Fluent</span>
                            <span>Written: Fluent</span>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={4}>
                        <div className={`${styles.english}`}>
                          <span className={`${styles.dots}`}></span>
                          <div className={`${styles.englishtext}`}>
                            <h6 className="mb-0 mt-3">Spanish</h6>
                            <span>Spoken: Fluent</span>
                            <span>Written: Fluent</span>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    <div className={`${styles.skills}`}>
                      <h6 className="mb-1">Skills</h6>
                      <div className={`${styles.skilssbtn}`}>
                        <Searchbutton
                          text="Calls"
                          className={`${styles.grybtn}`}
                        />
                        <Searchbutton
                          text="Event Management"
                          className={`${styles.grybtn}`}
                        />
                        <Searchbutton
                          text="Stock Taking"
                          className={`${styles.grybtn}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location:</h3>
                  <p>Germany, Dusseldorf. Menara Suruhanjaya Syakinat Str. 7</p>
                  <div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14310.988719236786!2d78.1676101!3d26.269867549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1669036707774!5m2!1sen!2sin"
                      width="100%"
                      height="255"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
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
