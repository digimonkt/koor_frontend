import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./createResume.module.css";
import { HorizontalPhoneInput, LabeledInput } from "@components/input";
import { SVG } from "@assets/svg";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setResumeData } from "@redux/slice/user";
import { validateCreateResume } from "./validator";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editResumeDetailsAPI } from "../../../api/jobSeeker";
import { ErrorMessage } from "../../../components/caption";
import { FilledButton } from "@components/button";
import DialogBox from "@components/dialogBox";
import ResumeTemplate from "../updateProfile/resume-update/resumeTemplate/template1";
import { pdfDownloader, docsDownloader } from "@utils/fileUtils";

const CreateResumeComponent = () => {
  const { currentUser } = useSelector(({ auth }) => auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [openResume, setOpenResume] = useState(false);
  const dispatch = useDispatch();
  const [referenceCount, setReferenceCount] = useState(1);
  const [word, setWord] = useState("");
  const maxWordCount = 300;
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isDownloadingDocs, setIsDownloadingDocs] = useState(false);

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      shortSummary: "",
      homeAddress: "",
      personalWebsite: "",
      reference: Array.from({ length: referenceCount }, () => ({
        email: "",
        mobile_number: "",
        country_code: "",
        name: "",
      })),
    },
    validationSchema: validateCreateResume,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        profile_title: values.jobTitle,
        job_summary: values.shortSummary,
        home_address: values.homeAddress,
        personal_website: values.personalWebsite,
        reference: values.reference,
      };

      for (const key in payload) {
        if (!payload[key]) {
          delete payload[key];
        } else {
          if (key === "reference" && payload[key][0].name === "") {
            delete payload[key];
          }
        }
      }

      const res = await editResumeDetailsAPI(payload);
      if (res.remote === "success") {
        setLoading(false);
        setData(payload);
        dispatch(setResumeData(payload));
        setOpenResume(true);
        dispatch(setSuccessToast(res?.data?.message));
      } else {
        formik.setErrors("Something went wrong");
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    },
  });

  const handleAddReference = () => {
    setReferenceCount((prevCount) => prevCount + 1);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value.slice(0, maxWordCount);
    setWord(inputText);
    formik.setFieldValue("shortSummary", inputText);
  };

  const downloadPDF = async () => {
    pdfDownloader(currentUser?.name, setIsDownloadingPDF, dispatch);
  };

  const downloadDocs = async () => {
    docsDownloader(setIsDownloadingDocs, dispatch);
  };

  useEffect(() => {
    if (currentUser?.profile) {
      const newState = {
        jobTitle: currentUser.profile.profileTitle || "",
        shortSummary: currentUser.profile.shortSummary || "",
        homeAddress: currentUser.profile.homeAddress || "",
        personalWebsite: currentUser.profile.personalWebsite || "",
        reference: currentUser.profile.references || [],
      };

      for (const key in newState) {
        formik.setFieldValue(key, newState[key]);
        if (key === "reference") {
          setReferenceCount(newState[key].length);
          newState[key]?.forEach((reference, referenceIndex) => {
            formik.setFieldValue(
              `reference[${referenceIndex}].name`,
              reference?.name || "",
            );
            formik.setFieldValue(
              `reference[${referenceIndex}].mobile_number`,
              reference?.country_code + reference?.mobile_number || "",
            );
            formik.setFieldValue(
              `reference[${referenceIndex}].email`,
              reference?.email || "",
            );
          });
        }
      }
    }
  }, [currentUser]);

  console.log({ currentUser });
  useEffect(() => {
    if (data) {
      formik.setFieldValue("jobTitle", data.profile_title || "");
      formik.setFieldValue("shortSummary", data.job_summary || "");
      formik.setFieldValue("homeAddress", data.home_address || "");
      formik.setFieldValue("personalWebsite", data.personal_website || "");
      data?.reference?.forEach((reference, referenceIndex) => {
        formik.setFieldValue(
          `reference[${referenceIndex}].name`,
          reference?.name || "",
        );
        formik.setFieldValue(
          `reference[${referenceIndex}].mobile_number`,
          reference?.country_code + reference?.mobile_number || "",
        );
        formik.setFieldValue(
          `reference[${referenceIndex}].email`,
          reference?.email || "",
        );
      });
    }
  }, [data]);

  return (
    <>
      <Box className={styles.CreateResume_Page}>
        <form onSubmit={formik.handleSubmit}>
          <h1 className={styles.heading}>Create a resume</h1>
          <Box className={styles.CreateResume_input_box}>
            <h5>Main info</h5>
            <p>
              Please, enter some key info for your resume. The rest will be
              generated based on your profile data, so make sure that it’s
              up-to-date.
            </p>
            <Box sx={{ marginBottom: "10px" }}>
              <LabeledInput
                title=""
                name="jobTitle"
                className="add-form-control"
                placeholder="Job title, e.g “Graphic designer”"
                {...formik.getFieldProps("jobTitle")}
              />
              {formik.touched.jobTitle && formik.errors.jobTitle ? (
                <ErrorMessage>{formik.errors.jobTitle}</ErrorMessage>
              ) : null}
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <LabeledInput
                name="shortSummary"
                title=""
                className="add-form-control"
                placeholder="A short summary about you"
                value={formik.values.shortSummary}
                endplaceholder={`${word.length}/${maxWordCount}`}
                onChange={(e) => handleInputChange(e)}
              />
              {formik.touched.shortSummary && formik.errors.shortSummary ? (
                <ErrorMessage>{formik.errors.shortSummary}</ErrorMessage>
              ) : null}
            </Box>
          </Box>
          <Divider
            sx={{
              margin: "10px 0px 30px 0px",
              borderColor: "#F0F0F0 !important",
            }}
          />
          <Box className={styles.CreateResume_input_box}>
            <h5>Additional contact info</h5>
            <p>Add more ways to contact you.</p>
            <Box sx={{ marginBottom: "10px" }}>
              <LabeledInput
                title=""
                name="homeAddress"
                className="add-form-control"
                placeholder="Home address"
                {...formik.getFieldProps("homeAddress")}
              />
              {formik.touched.homeAddress && formik.errors.homeAddress ? (
                <ErrorMessage>{formik.errors.homeAddress}</ErrorMessage>
              ) : null}
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <LabeledInput
                name="personalWebsite"
                title=""
                className="add-form-control"
                placeholder="Personal website"
                {...formik.getFieldProps("personalWebsite")}
              />
              {formik.touched.personalWebsite &&
              formik.errors.personalWebsite ? (
                <ErrorMessage>{formik.errors.personalWebsite}</ErrorMessage>
              ) : null}
            </Box>
          </Box>
          <Divider
            sx={{
              margin: "10px 0px 30px 0px",
              borderColor: "#F0F0F0 !important",
            }}
          />
          <Box className={styles.CreateResume_input_box}>
            <h5>References</h5>
            <p>
              Add contact info of your previous employer(s), who can recommend
              you to others.
            </p>
            {[...Array(referenceCount)].map((_, idx) => (
              <Grid
                mt={referenceCount > 1 ? 4 : 0}
                container
                spacing={2}
                key={idx}
              >
                <Grid item lg={4} xs={12}>
                  <Box sx={{ marginBottom: "10px" }}>
                    <LabeledInput
                      title=""
                      name={`reference[${idx}].name`}
                      className="add-form-control"
                      placeholder="Name"
                      {...formik.getFieldProps(`reference[${idx}].name`)}
                    />
                    {formik.errors?.reference &&
                    formik.touched?.reference &&
                    formik.touched.reference[idx]?.name &&
                    formik.errors.reference[idx]?.name ? (
                      <ErrorMessage>
                        {formik.errors.reference[idx].name}
                      </ErrorMessage>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item lg={4} xs={12}>
                  <HorizontalPhoneInput
                    placeholder="Enter mobile number"
                    onChange={(e) => {
                      const countryCode = e?.international.split(" ")[0];
                      const mobileNumber = (e?.value || "").replace(
                        countryCode,
                        "",
                      );
                      formik.setFieldValue(
                        `reference[${idx}].mobile_number`,
                        mobileNumber,
                      );
                    }}
                    defaultCountry={
                      formik.values.reference[idx]?.country_code || "IN"
                    }
                    onCountryChange={(e) =>
                      formik.setFieldValue(`reference[${idx}].country_code`, e)
                    }
                    international
                    isInvalidNumber={(isValid) => {
                      if (!isValid) {
                        formik.setFieldError(
                          `reference[${idx}].mobile_number`,
                          "Invalid Mobile Number",
                        );
                      }
                    }}
                    onBlur={formik.handleBlur}
                    name="mobile_number"
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Box sx={{ marginBottom: "10px" }}>
                    <LabeledInput
                      title=""
                      name={`reference[${idx}].email`}
                      className="add-form-control"
                      placeholder="Email address"
                      {...formik.getFieldProps(`reference[${idx}].email`)}
                    />
                    {formik.touched?.reference &&
                    formik.touched.reference[idx]?.email &&
                    formik.errors?.reference &&
                    formik.errors.reference[idx]?.email ? (
                      <ErrorMessage>
                        {formik.errors?.reference[idx]?.email}
                      </ErrorMessage>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={handleAddReference}
              className={styles.plus_more_box}
            >
              <span>+ Add one more reference</span>
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              disabled={loading}
              type="submit"
              className={styles.resume_outlined_button}
            >
              <SVG.resumeIcon style={{ marginRight: "5px" }} />
              {loading ? "Generating..." : "Generate resume"}
            </Button>
          </Box>
        </form>
        <DialogBox
          open={openResume}
          handleClose={() => {
            if (!isDownloadingPDF) setOpenResume(false);
          }}
          maxWidth="xxl"
          sx={{
            "& .MuiPaper-root": {
              width: "900px",
            },
          }}
        >
          <>
            <FilledButton
              title={isDownloadingPDF ? "Downloading PDF..." : "Download PDF"}
              onClick={downloadPDF}
              style={{ marginBottom: "10px" }}
              disabled={isDownloadingPDF || isDownloadingDocs}
            />
            <FilledButton
              sx={{
                marginLeft: "10px",
                "@media (max-width: 480px)": {
                  marginLeft: "0px",
                },
              }}
              title={
                isDownloadingDocs ? "Downloading Docs..." : "Download Docs"
              }
              onClick={downloadDocs}
              style={{ marginBottom: "10px" }}
              disabled={isDownloadingPDF || isDownloadingDocs}
            />
            <ResumeTemplate appliedJob={false} />
          </>
        </DialogBox>
      </Box>
    </>
  );
};

export default CreateResumeComponent;
