import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./createResume.module.css";
import { LabeledInput } from "@components/input";
import { SVG } from "@assets/svg";
import { setErrorToast } from "../../../redux/slice/toast";
import { validateCreateResume } from "./validator";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, useFormik } from "formik";
import { editResumeDetailsAPI } from "../../../api/jobSeeker";

const CreateResumeComponent = () => {
  const { currentUser } = useSelector(({ auth }) => auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const [referenceCount, setReferenceCount] = useState(1);
  const [word, setWord] = useState("");
  const maxWordCount = 300;

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobSummary: "",
      homeAddress: "",
      personalWebsite: "",
      refPhone: "",
      refName: "",
      refEmail: "",
    },
    validationSchema: validateCreateResume,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        job_title: values.jobTitle,
        job_summary: values.jobSummary,
        home_address: values.homeAddress,
        personal_website: values.personalWebsite,
        ref_phone: values.refPhone,
        ref_name: values.refName,
        ref_email: values.refEmail,
      };

      const res = await editResumeDetailsAPI(payload);
      if (res.remote === "success") {
        setData(payload);
        setLoading(false);
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
    formik.setFieldValue("jobSummary", inputText);
  };

  useEffect(() => {
    const newState = {
      jobTitle: currentUser?.resume?.job_title,
      jobSummary: currentUser?.resume?.job_summary,
      homeAddress: currentUser?.resume?.home_address,
      personalWebsite: currentUser?.resume?.personal_website,
      refPhone: currentUser?.resume?.ref_phone,
      refName: currentUser?.resume?.ref_name,
      refEmail: currentUser?.resume?.ref_email,
    };
    for (const key in newState) {
      formik.setFieldValue(key, newState[key]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("jobTitle", data.jobTitle);
      formik.setFieldValue("jobSummary", data.jobSummary);
      formik.setFieldValue("homeAddress", data.homeAddress);
      formik.setFieldValue("personalWebsite", data.personalWebsite);
      formik.setFieldValue("refName", data.refaddress);
      formik.setFieldValue("refPhone", data.refPhone);
      formik.setFieldValue("refEmail", data.refEmail);
    }
  }, [data]);
  console.log(formik);
  return (
    <>
      <Box className={styles.CreateResume_Page}>
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
              required
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
              required
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
              required
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
              required
              {...formik.getFieldProps("personalWebsite")}
            />
            {formik.touched.personalWebsite && formik.errors.personalWebsite ? (
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
            Add contact info of your previous employer(s), who can recommend you
            to others.
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
                    name="name"
                    className="add-form-control"
                    placeholder="Name"
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <ErrorMessage>{formik.errors.name}</ErrorMessage>
                  ) : null}
                </Box>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Box sx={{ marginBottom: "10px" }}>
                  <LabeledInput
                    title=""
                    name="moblieNumber"
                    className="add-form-control"
                    placeholder="Mobile number"
                    required
                  />
                  {formik.touched.moblieNumber && formik.errors.moblieNumber ? (
                    <ErrorMessage>{formik.errors.moblieNumber}</ErrorMessage>
                  ) : null}
                </Box>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Box sx={{ marginBottom: "10px" }}>
                  <LabeledInput
                    title=""
                    className="add-form-control"
                    placeholder="Email address"
                    name="refEmail"
                    required
                  />
                  {formik.touched.refEmail && formik.errors.refEmail ? (
                    <ErrorMessage>{formik.errors.refEmail}</ErrorMessage>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          ))}
          <Button onClick={handleAddReference} className={styles.plus_more_box}>
            <span>+ Add one more reference</span>
          </Button>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button disabled={loading} className={styles.resume_outlined_button}>
            <SVG.resumeIcon style={{ marginRight: "5px" }} />
            {loading ? "Generating..." : "Generate resume"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateResumeComponent;
