import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./createResume.module.css";
import { HorizontalPhoneInput, LabeledInput } from "@components/input";
import { SVG } from "@assets/svg";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { validateCreateResume } from "./validator";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { setResumeData } from "@redux/slice/user";
import { editResumeDetailsAPI } from "../../../api/jobSeeker";
import { ErrorMessage } from "../../../components/caption";
import { FilledButton } from "@components/button";
import DialogBox from "@components/dialogBox";
import ResumeTemplate from "../updateProfile/resume-update/resumeTemplate/template1";
import { pdfDownloader, docsDownloader } from "@utils/fileUtils";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";

const CreateResumeComponent = () => {
  const { currentUser } = useSelector(({ auth }) => auth);
  const [loading, setLoading] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [removedReferenceIds, setRemovedReferenceIds] = useState([]);
  const dispatch = useDispatch();
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
      reference: [],
    },
    validationSchema: validateCreateResume,
    onSubmit: async (values) => {
      console.log({ values });
      setLoading(true);
      const payload = {
        profile_title: values.jobTitle,
        short_summary: values.shortSummary,
        home_address: values.homeAddress,
        personal_website: values.personalWebsite,
        reference: values.reference.map((val) => {
          const countryCode = val.mobile_number.international.split(" ")[0];
          const mobileNumber = (val.mobile_number.value || "").replace(
            countryCode,
            "",
          );
          return {
            ...val,
            mobile_number: mobileNumber,
            country_code: countryCode,
          };
        }),
        reference_remove: removedReferenceIds.map((id) => id),
      };

      if (
        payload.mobile_number === currentUser.mobileNumber ||
        !payload.mobile_number
      ) {
        delete payload.mobile_number;
        delete payload.country_code;
      }
      const res = await editResumeDetailsAPI(payload);
      if (res.remote === "success") {
        const newSate = {
          homeAddress: payload.home_address || "",
          shortSummary: payload.short_summary || "",
          profileTitle: payload.profile_title || "",
          personalWebsite: payload.personal_website || "",
          references: payload.reference || [],
        };

        setLoading(false);
        dispatch(setResumeData(newSate));
        setOpenResume(true);
        dispatch(setSuccessToast(res?.data?.message));
      } else {
        formik.setErrors("Something went wrong");
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    },
  });
  const handleInputChange = (e) => {
    const inputText = e.target.value.slice(0, maxWordCount);
    setWord(inputText);
    formik.setFieldValue("shortSummary", inputText);
  };

  const handleAddReference = () => {
    const newReference = {
      id: Date.now(),
      name: "",
      country_code: "",
      mobile_number: { national: "", international: "", value: "" },
      email: "",
    };

    formik.setFieldValue("reference", [
      ...formik.values.reference,
      newReference,
    ]);
  };

  const handleRemoveReference = (idToRemove) => {
    console.log({ idToRemove });
    const updatedReferences = formik.values.reference.filter(
      (ref) => ref.id !== idToRemove,
    );

    formik.setFieldValue("reference", updatedReferences);

    // Add removed ID to state
    setRemovedReferenceIds((prevIds) => [...prevIds, idToRemove]);
  };

  const downloadPDF = async () => {
    pdfDownloader(currentUser?.name, setIsDownloadingPDF, dispatch);
  };

  const downloadDocs = async () => {
    docsDownloader(setIsDownloadingDocs, dispatch);
  };

  useEffect(() => {
    setRemovedReferenceIds([]);
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
          newState[key]?.forEach((reference, referenceIndex) => {
            formik.setFieldValue(
              `reference[${referenceIndex}].name`,
              reference?.name || "",
            );

            formik.setFieldValue(
              `reference[${referenceIndex}].country_code`,
              reference?.country_code || "+91",
            );

            formik.setFieldValue(`reference[${referenceIndex}].mobile_number`, {
              national: reference?.mobile_number
                ? formatPhoneNumber(
                    reference.country_code + reference?.mobile_number,
                  )
                : "",
              international: reference?.mobile_number
                ? formatPhoneNumberIntl(
                    reference.country_code + reference?.mobile_number,
                  )
                : "",
              value: reference?.country_code + reference?.mobile_number,
            });

            formik.setFieldValue(
              `reference[${referenceIndex}].email`,
              reference?.email || "",
            );
          });
        }
      }
    }
  }, [currentUser]);
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
            {formik.values.reference.map((ref, idx) => (
              <Grid
                mt={formik.values.reference.length > 1 ? 4 : 0}
                container
                spacing={2}
                key={ref.id}
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
                    value={formik.values.reference[idx]?.mobile_number?.value}
                    onChange={(e) =>
                      formik.setFieldValue(`reference[${idx}].mobile_number`, e)
                    }
                    international
                    defaultCountry={formik.values.reference[idx]?.country_code}
                    onCountryChange={(e) =>
                      formik.setFieldValue(`reference[${idx}].country_code`, e)
                    }
                    isInvalidNumber={(isValid) => {
                      if (!isValid) {
                        formik.setFieldError(
                          `reference[${idx}].mobile_number`,
                          "Invalid Mobile Number",
                        );
                      }
                    }}
                    onBlur={
                      formik.getFieldProps(`reference[${idx}].mobile_number`)
                        .onBlur
                    }
                    name={`reference[${idx}].mobile_number`}
                  />
                  {formik.errors?.reference &&
                  formik.errors.reference[idx]?.mobile_number ? (
                    <ErrorMessage>
                      {formik.errors.reference[idx].mobile_number}
                    </ErrorMessage>
                  ) : null}
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      sx={{ color: "#eea23d" }}
                      variant="text"
                      onClick={() => handleRemoveReference(ref.id)}
                    >
                      Remove
                    </Button>
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
