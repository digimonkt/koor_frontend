import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { SearchButton } from "@components/button";
import React, { useState } from "react";
// import AttachmentFile from "@components/attatchmentFile";
// import NewPostJobModal from "../employer/postjob/modal-content/NewPostJobModal";
// import CancelJob from "../employer/postjob/modal-content/CancelJob";
// import ModalView from "../add-info-profile/modal";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";
import { useFormik } from "formik";
import { applyJobValidationSchema } from "./validator";
import { AttachmentDragNDropInput } from "@components/input";
import { ErrorMessage } from "@components/caption";

const ApplyForJob = () => {
  // navigate
  const navigate = useNavigate();

  // state management

  const [hide, setHide] = useState(false);
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = (type) => {
  //     setOpen(type);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  // formik validation and values setup

  const formik = useFormik({
    initialValues: {
      shortLetter: "",
      attachments: [],
    },
    validationSchema: applyJobValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <div className={`${styles.postJob}`}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  >
                    {<SVG.LeftArrow />}
                  </span>

                  <h1>Apply for the job</h1>
                </div>
              </Grid>
              <Grid item xs={1}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                  className={`${styles.crossed}`}
                >
                  {<SVG.Crossed />}
                </span>
              </Grid>
              <Grid item xs={9}>
                <p className="mb-0 ">
                  Online Research Participant (Work From Home/Part Time/Casual)
                  #KerjaTrending. Testing two rows of text.
                </p>
              </Grid>
              <Grid item xs={3} className="ps-0">
                <div className={`${styles.clocs}`}>
                  <span>{<SVG.ClockIconSmall />}</span>
                  <p className="mb-0 mt-0">
                    <span>Posted:</span> August 28, 2022
                  </p>
                  <SearchButton
                    text="11 days left"
                    className={`${styles.greenbtn}`}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
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

                  {hide ? (
                    <>
                      <p>Please check out my attachements below..</p>
                      <p>
                        I don’t have an education mentioned in your job post, I
                        have 8 years of experience in the job described. Please
                        check out my resume, I’m sure you’ll like it. Looking
                        forward to talking in person! Information about the
                        person that they attach as a plain text to grab
                        employer’s attention. We can fit two rows here to be
                        able to showcase yourself before a potential employer
                        even opens your resume. Like “Hi, I’m Maraua and I’m the
                        perfect fit for your job”.I don’t have an education
                        mentioned in your job post, I have 8 years of experience
                        in the job described. Please check out my resume, I’m
                        sure you’ll like it. Looking forward to talking in
                        person! Information about the person that they attach as
                        a plain text to grab employer’s attention. We can fit
                        two rows here to be able to showcase yourself before a
                        potential employer even opens your resume. Like “Hi, I’m
                        Maraua and I’m the perfect fit for your jobI don’t have
                        an education mentioned in your job post, I have 8 years
                        of experience in the job described. Please check out my
                        resume, I’m sure you’ll like it.{" "}
                      </p>
                    </>
                  ) : null}
                  <div className={`${styles.infomore}`}>
                    <h6 onClick={() => setHide(!hide)}>
                      More
                      <span className={`${hide ? styles.rotate : ""}`}>
                        {<SVG.Downarrow />}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className={`${styles.iconbtn}`}>
                  <SearchButton
                    text="5-Day week"
                    lefticon={<SVG.BagClock />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
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
              </Grid>
              <Grid item xs={5}>
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
                      <Grid item xs={5}>
                        <div className={`${styles.english}`}>
                          <span className={`${styles.dots}`}></span>
                          <div className={`${styles.englishtext}`}>
                            <h6 className="mb-0 mt-3">English</h6>
                            <span>Spoken: Fluent</span>
                            <span>Written: Fluent</span>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={5}>
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
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        className={`${styles.skilssbtn}`}
                      >
                        <SearchButton
                          text="Calls"
                          className={`${styles.grybtn}`}
                        />
                        <SearchButton
                          text="Event Management"
                          className={`${styles.grybtn}`}
                        />
                        <SearchButton
                          text="Stock Taking"
                          className={`${styles.grybtn}`}
                        />
                      </Stack>
                    </div>
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
              </Grid>
            </Grid>

            <div className={`${styles.shortLetter}`}>
              <h1 className="m-0 mb-3">Your short-letter</h1>
              <TextareaAutosize
                aria-label="minimum height"
                className={`${styles.textarea}`}
                minRows={3}
                placeholder="Write a few words about yourself and why you think that you are a good fit for this particular job."
                {...formik.getFieldProps("shortLetter")}
              />
              {formik.touched.shortLetter && formik.errors.shortLetter && (
                <ErrorMessage>{formik.errors.shortLetter}</ErrorMessage>
              )}
            </div>
            <Grid item xl={12} lg={12} xs={12} className="attachments">
              <h2 className="mt-4 mb-3">Attach files</h2>
              <AttachmentDragNDropInput
                files={formik.getFieldProps("attachments").value}
                handleDrop={(file) => {
                  formik.setValues({
                    ...formik.values,
                    attachments: [
                      ...formik.getFieldProps("attachments").value,
                      file[0],
                    ],
                  });
                }}
                deleteFile={(file) => {
                  formik.setValues({
                    ...formik.values,
                    attachments: formik.values.attachments.filter(
                      (el) => el !== file
                    ),
                  });
                }}
              />
              {formik.touched.attachments && formik.errors.attachments && (
                <ErrorMessage>{formik.errors.attachments}</ErrorMessage>
              )}
            </Grid>

            <Stack
              direction="row"
              spacing={2}
              className={`${styles.applybtns}`}
            >
              <SearchButton
                text="Cancel"
                className={`${styles.cancelbtn}`}
                // handleClickOpen={() => handleClickOpen("cancelJob")}
              />
              <SearchButton
                text="Apply"
                className={`${styles.applybtn}`}
                handleClickOpen={formik.handleSubmit}
              />
            </Stack>
          </div>
        </div>
      </Container>
      {/*
      <ModalView
        open={open}
        handleClose={handleClose}
        modalclass="apply-modalwidth"
        content={
          open === "postjob" ? (
            <NewPostJobModal
              title="Done!"
              description="Your application was submitted. The employer will reach out to you if they will find you suitable for the job. Stay tuned."
              buttontext="Back to jobs search"
              icon={applypostjob}
              handleClose={handleClose}
              color="#EEA23D"
              url="/jobadvancedsearch"
              buttonHover="rgba(255, 165, 0, 0.1)"
            />
          ) : open === "cancelJob" ? (
            <CancelJob
              title="Cancel applying?"
              description="Are you sure you want to go back and delete all the info you’ve added? "
              color="#EEA23D"
              buttontext="Yes, cancel"
              handleClose={handleClose}
              url="/jobpost"
              buttonHover="rgba(255, 165, 0, 0.1)"
            />
          ) : null
        }
      /> */}
    </div>
  );
};

export default ApplyForJob;
