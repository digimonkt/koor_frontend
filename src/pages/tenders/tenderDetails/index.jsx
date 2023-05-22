import { Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import { getTenderDetailsByIdAPI, getTenderSuggestionAPI } from "@api/tender";
import dayjs from "dayjs";
import { generateFileUrl } from "@utils/generateFileUrl";
import urlcat from "urlcat";

function TenderDetailsComponent() {
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
    jobCategories: {
      id: "",
      title: "",
    },
    jobSubCategory: {
      id: "",
      title: "",
    },
    deadline: "",
    isFullTime: false,
    isPartTime: false,
    isSaved: false,
    isApplied: false,
    hasContract: false,
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
    highestEducation: {
      id: "",
      title: "",
    },
    application: {},
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
  const [tenderSuggestion, setTenderSuggestion] = useState([]);
  const getTenderDetails = async (tenderId) => {
    const res = await getTenderDetailsByIdAPI({ tenderId });
    if (res.remote === "success") {
      setDetails(res.data);
    }
  };

  const getTenderSuggestion = async (tenderId) => {
    const res = await getTenderSuggestionAPI(tenderId);
    if (res.remote === "success") {
      console.log("getTenderSuggestion ", res.data);
      setTenderSuggestion(res.data.results);
    }
  };
  useEffect(() => {
    getTenderDetails(params.tenderId);
    getTenderSuggestion(params.tenderId);
  }, [params.tenderId]);
  return (
    <>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={`${styles.postJob}`}>
                  <span style={{ paddingTop: "5px" }}>{<SVG.LeftArrow />}</span>
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.clocs}`}>
                  <SVG.ClockIconSmall />
                  <p className="mb-0 mt-0 me-1">
                    <span>Posted:</span> {dayjs(details.createdAt).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > 0
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
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
                  <p className="job-description">{details.description}. </p>
                </div>
                <div className={`${styles.iconbtn}`}>
                  <SearchButton
                    text={details?.country?.title}
                    leftIcon={<SVG.LocationIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={details?.sector?.title}
                    leftIcon={<SVG.CategoryIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={details?.type?.title}
                    leftIcon={<SVG.CategoryIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  {(details.tag || []).map((tag, i) => {
                    return (
                      <SearchButton
                        key={i}
                        text={tag.title}
                        leftIcon={<SVG.SellIcon />}
                        className={`${styles.iconbutton}`}
                      />
                    );
                  })}
                </div>
                <div className={`${styles.datesatrt}`}>
                  <span>{<SVG.StartDate />}</span>
                  <p className="m-0 ms-2">
                    <span className={`${styles.startDate}`}>Start date:</span>{" "}
                    <b className={`${styles.startB}`}>
                      {details?.startDate
                        ? dayjs(details.startDate).format("ll")
                        : ""}
                    </b>
                  </p>
                </div>
                <div className={`${styles.downloadattachment}`}>
                  <h6>Download attachments</h6>
                  {details.attachments.map((attachment, i) => {
                    return (
                      <div key={i} className={`${styles.downloadtext}`}>
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
              <Grid item xs={12} lg={3}>
                <JobCostCard
                  amount={details.budgetAmount}
                  payPeriod={"month"}
                  user={details?.user}
                />
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
                  <p>
                    {"Germany, Dusseldorf. Menara Suruhanjaya Syakinat Str. 7"}
                  </p>
                  <div
                    style={{
                      height: "236px",
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
            <h2>more tenders like this:</h2>
            {tenderSuggestion.map((item, key) => {
              console.log("item", item);
              return (
                <p key={key}>
                  <Link
                    to={urlcat("/tender/details/:tenderId", {
                      tenderId: item.id,
                    })}
                  >
                    {item?.title}
                  </Link>
                  <span>
                    – {item?.city}, {item?.country} $
                    {item.budgetAmount}{" "}
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
