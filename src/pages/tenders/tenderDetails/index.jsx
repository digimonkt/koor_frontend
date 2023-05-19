import { Container, Grid, Stack } from "@mui/material";
import React from "react";
import styles from "./tenderDetails.module.css";
import { SVG } from "@assets/svg";
import {
  FilledButton,
  OutlinedButton,
  SearchButton,
  SolidButton,
} from "@components/button";
import JobCostCard from "@pages/jobs/component/jobCostCard";
import { GoogleMapWrapper, GoogleMap } from "@components/googleMap";

function TenderDetailsComponent() {
  return (
    <>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={`${styles.postJob}`}>
                  <span style={{ paddingTop: "5px" }}>{<SVG.LeftArrow />}</span>
                  <p className="mb-0">Title</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.clocs}`}>
                  <SVG.ClockIconSmall />
                  <p className="mb-0 mt-0 me-1">
                    <span>Posted:</span> date
                  </p>
                  <SolidButton
                    title="12 Days"
                    style={{ marginLeft: "20px" }}
                    color="green"
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9}>
                <div className={`mb-4 ${styles.contentJob}`}>
                  <h4>Details :</h4>
                  <p className="job-description">
                    Hi there! 👋 Though I don’t have an education mentioned in
                    your job post, I have 8 years of experience in the job
                    described. Please check out my resume, I’m sure you’ll like
                    it. Looking forward to talking in person! Information about
                    the person that they attach as a plain text to grab
                    employer’s attention. We can fit two rows here to be able to
                    showcase yourself before a potential employer even opens
                    your resume. Like “Hi, I’m Maraua and I’m the perfect fit
                    for your job”. Please check out my attachements below.. I
                    don’t have an education mentioned in your job post, I have 8
                    years of experience in the job described. Please check out
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
                  <SearchButton
                    text={"India"}
                    leftIcon={<SVG.LocationIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={"2-Day Week"}
                    leftIcon={<SVG.BagClock />}
                    className={`${styles.iconbutton}`}
                  />
                </div>
                <div className={`${styles.datesatrt}`}>
                  <span>{<SVG.StartDate />}</span>
                  <p className="m-0 ms-2">
                    <span className={`${styles.startDate}`}>Start date:</span>{" "}
                    <b className={`${styles.startB}`}>{"September 12"}</b>
                  </p>
                </div>
                <div className={`${styles.downloadattachment}`}>
                  <h6>Download attachments</h6>
                  <div className={`${styles.downloadtext}`}>
                    <span className="d-inline-flex">{<SVG.OrangeIcon />}</span>
                    <a
                      href={"#"}
                      target="_blank"
                      className="m-0"
                      rel="noreferrer"
                    >
                      title
                    </a>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} lg={3}>
                <JobCostCard amount={2000} payPeriod={"month"} user={{}} />
                <div className={`${styles.jobpostbtn}`}>
                  <FilledButton
                    title={"Apply for this Tender"}
                    className={`${styles.enablebtn}`}
                  />
                  <Stack
                    direction="row"
                    spacing={{
                      xs: 1,
                      sm: 1,
                      lg: 1,
                    }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <OutlinedButton
                      title={"Saved"}
                      style={{ height: "44px" }}
                    />
                  </Stack>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location :</h3>
                  <p>{"details.address"}</p>
                  <div
                    style={{
                      height: "75%",
                      overflow: "hidden",
                      borderRadius: "5px",
                    }}
                  >
                    <GoogleMapWrapper>
                      <GoogleMap center={{}} zoom={15} />
                    </GoogleMapWrapper>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.LikeJob}`}>
            <h2>more jobs like this:</h2>
            {[1, 2, 3, 4].map((item, key) => {
              return (
                <p key={key}>
                  {"item.title"}
                  <span>
                    – {"item.city.title"}, {"item.country.title"} $
                    {"item.budgetAmount"}{" "}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default TenderDetailsComponent;
