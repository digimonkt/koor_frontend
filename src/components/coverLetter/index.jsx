import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import styles from "./coverLetter.module.css";
import {
  AttachmentDragNDropInput,
  HorizontalLabelInput,
  LabeledInput,
} from "@components/input";
import { OutlinedButton } from "@components/button";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";
import { useFormik } from "formik";
import { editResumeDetailsAPI } from "@api/jobSeeker";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";

const CreateCoverLetter = () => {
  const [loading, setLoading] = useState(false);
  const [, setData] = useState({});
  const [word, setWord] = useState("");

  const dispatch = useDispatch();
  const maxWordCount = 300;

  const handleInputChange = (e) => {
    const inputText = e.target.value.slice(0, maxWordCount);
    setWord(inputText);
    formik.setFieldValue("coverLetter", inputText);
  };

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      addressee: "",
      coverLetter: "",
      signgature: [],
      signgatureRemove: [],
    },
    onSubmit: async (values) => {
      console.log({ values });
      setLoading(true);
      const payload = {
        profile_title: values.jobTitle,
        addressee: values.addressee,
        coverLetter: values.coverLetter,
        signgature: values.signgature,
      };

      const formData = new FormData();
      formData.append("profile_title", values.jobTitle);
      formData.append("addressee", values.addressee);
      formData.append("coverLetter", values.coverLetter);
      const signatureBlob = await fetch(values.signgature[0].preview).then(
        (res) => res.blob(),
      );
      formData.append("signgature", signatureBlob);

      console.log({ formData });
      const res = await editResumeDetailsAPI(payload);
      if (res.remote === "success") {
        setData(payload);
        setLoading(false);
        dispatch(setSuccessToast("Cover letter updated successfully"));
      } else {
        formik.setErrors("Something went wrong");
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box className={styles.createCoverLetter_box}>
          <h1 className={styles.heading}>Create a cover letter</h1>
          <Typography className={styles.letter_desc}>
            Create a personalized conver letter and then click “Generate”. You
            can attach it to your application to make it stand out more.
          </Typography>
        </Box>

        <Box className={styles.Createcover_letter_input_box}>
          <h5>Main text</h5>
          <Typography className={styles.letter_desc}>
            Please, enter some key info for your resume. The rest will be
            generated based on your profile data, so make sure that it’s
            up-to-date.
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <Box sx={{ marginBottom: "10px" }} className="coverLetter_input">
                <LabeledInput
                  title=""
                  className="add-form-control"
                  placeholder="Your preferred job title, e.g “Graphic designer”"
                  {...formik.getFieldProps("jobTitle")}
                />
              </Box>
              <Box sx={{ marginBottom: "10px" }} className="coverLetter_input">
                <LabeledInput
                  title=""
                  className="add-form-control"
                  placeholder="Name or addressee (person or a company)"
                  {...formik.getFieldProps("addressee")}
                />
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box className="coverletter_textarea_box">
                <HorizontalLabelInput
                  type="textarea"
                  value={formik.values.coverLetter}
                  endplaceholder={`${word.length}/${maxWordCount}`}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Cover letter"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider
          sx={{
            borderBottom: "1px solid #f0f0f0 !important",
            margin: "0px 0px 20px 0px",
            paddingTop: "0px",
          }}
        />
        <Box className={styles.Createcover_letter_input_box}>
          <h5>Your signature</h5>
          <Typography className={styles.letter_desc}>
            This is optional, but we recommend to add it.
          </Typography>
          <Box>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid item lg={1.1} md={1.2} sm={1.6} xs={4}>
                <Avatar
                  src={IMAGES.CoverLetterImg}
                  className={styles.coverletter_avatar}
                />
              </Grid>
              <Grid item lg={10.9} md={10.8} sm={10.4} xs={8}>
                <AttachmentDragNDropInput
                  files={formik.getFieldProps("signgature").value}
                  handleDrop={(file) => {
                    const currentAttachments = formik.values.signgature;
                    if (file.length + currentAttachments.length > 10) {
                      formik.setFieldError(
                        "signgature",
                        `Maximum 10 files allowed. you can upload only ${
                          10 - currentAttachments.length
                        } remaining`,
                      );
                    } else {
                      const filesTaken = file.slice(
                        0,
                        10 - currentAttachments.length,
                      );
                      formik.setFieldValue("signgature", [
                        ...currentAttachments,
                        ...filesTaken,
                      ]);
                    }
                  }}
                  deleteFile={(file, index) => {
                    if (file.id) {
                      formik.setFieldValue("attachmentsRemove", [
                        ...formik.values.attachmentsRemove,
                        file.id,
                      ]);
                      formik.setFieldValue(
                        "signgature",
                        formik.values.signgature.filter(
                          (attachment) => attachment.path !== file.path,
                        ),
                      );
                    } else {
                      formik.setFieldValue(
                        "signgature",
                        formik.values.signgature.filter((_, i) => i !== index),
                      );
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "26px" }}>
            <OutlinedButton
              disabled={loading}
              type="submit"
              title={[
                <>
                  <SVG.resumeIcon className="me-2" />
                  {loading ? "Saving..." : "Generate cover letter"}
                </>,
              ]}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default CreateCoverLetter;
