import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./createResume.module.css";
import { HorizontalPhoneInput, LabeledInput } from "@components/input";
import { SVG } from "@assets/svg";
import { setErrorToast } from "@redux/slice/toast";
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
      jobSummary: "",
      homeAddress: "",
      personalWebsite: "",
      reference: Array.from({ length: referenceCount }, () => ({
        email: "",
        moblieNumber: "",
        countryCode: "",
        name: "",
      })),
    },
    validationSchema: validateCreateResume,
    onSubmit: async (values) => {
      console.log({ values });
      setLoading(true);
      const payload = {
        profile_title: values.jobTitle,
        job_summary: values.jobSummary,
        home_address: values.homeAddress,
        personal_website: values.personalWebsite,
        reference: JSON.stringify(values.reference),
      };
      console.log({ payload });
      const res = await editResumeDetailsAPI(payload);
      if (res.remote === "success") {
        setLoading(false);
      } else {
        setData(payload);
        dispatch(setResumeData(payload));
        setOpenResume(true); // for demo
        // formik.setErrors("Something went wrong");
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
    formik.setFieldValue("jobSummary", inputText);
  };

  const downloadPDF = async () => {
    pdfDownloader(currentUser?.name, setIsDownloadingPDF, dispatch);
  };

  const downloadDocs = async () => {
    docsDownloader(setIsDownloadingDocs, dispatch);
  };

  useEffect(() => {
    if (formik && currentUser?.resume) {
      const newState = {
        jobTitle: currentUser.resume.profile_title || "",
        jobSummary: currentUser.resume.job_summary || "",
        homeAddress: currentUser.resume.home_address || "",
        personalWebsite: currentUser.resume.personal_website || "",
        reference: currentUser.resume.reference || [],
      };

      for (const key in newState) {
        formik.setFieldValue(key, newState[key]);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("jobTitle", data.profile_title || "");
      formik.setFieldValue("jobSummary", data.job_summary || "");
      formik.setFieldValue("homeAddress", data.home_address || "");
      formik.setFieldValue("personalWebsite", data.personal_website || "");

      try {
        JSON.parse(data.reference)?.forEach((reference, referenceIndex) => {
          formik.setFieldValue(
            `reference[${referenceIndex}].name`,
            reference?.name || "",
          );
          formik.setFieldValue(
            `reference[${referenceIndex}].moblieNumber`,
            reference?.moblieNumber || "",
          );
          formik.setFieldValue(
            `reference[${referenceIndex}].countryCode`,
            reference?.countryCode || "",
          );
          formik.setFieldValue(
            `reference[${referenceIndex}].email`,
            reference?.email || "",
          );
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [data]);
  console.log({ formik });
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
                name="jobSummary"
                title=""
                className="add-form-control"
                placeholder="A short summary about you"
                value={formik.values.jobSummary}
                endplaceholder={`${word.length}/${maxWordCount}`}
                onChange={(e) => handleInputChange(e)}
              />
              {formik.touched.jobSummary && formik.errors.jobSummary ? (
                <ErrorMessage>{formik.errors.jobSummary}</ErrorMessage>
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
                  <Box sx={{ marginBottom: "10px" }}>
                    <HorizontalPhoneInput
                      label="Mobile Number"
                      onChange={(e) => {
                        const countryCode = e?.international.split(" ")[0];
                        const mobileNumber = (e?.value || "").replace(
                          countryCode,
                          "",
                        );
                        console.log({ mobileNumber });
                        formik.setFieldValue(
                          `reference[${idx}].moblieNumber`,
                          mobileNumber,
                        );
                        formik.setFieldValue(
                          `reference[${idx}].countryCode`,
                          countryCode,
                        );
                      }}
                      defaultCountry={
                        formik.values.reference[idx]?.countryCode || "IN"
                      }
                      international
                      isInvalidNumber={(isValid) => {
                        if (!isValid) {
                          formik.setFieldError(
                            `reference[${idx}].moblieNumber`,
                            "Invalid Mobile Number",
                          );
                        }
                      }}
                      onBlur={formik.handleBlur}
                      name="mobileNumber"
                    />
                    {formik.errors?.reference &&
                    formik.errors.reference[idx]?.moblieNumber ? (
                      <ErrorMessage>
                        {formik.errors.reference[idx].moblieNumber}
                      </ErrorMessage>
                    ) : null}
                  </Box>
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
