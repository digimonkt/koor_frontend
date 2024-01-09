import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./coverLetter.module.css";
import { HorizontalLabelInput, LabeledInput } from "@components/input";
import { OutlinedButton } from "@components/button";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";
import { useFormik } from "formik";
import { updateCoverLetterAPI } from "@api/job";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch, useSelector } from "react-redux";
import { setCoverLetterData } from "@redux/slice/user";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const CreateCoverLetter = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(({ auth }) => auth);
  const [data, setData] = useState({});
  const [word, setWord] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const maxWordCount = 300;
  const { jobId } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.slice(0, 1).map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 1,
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFiles([
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        }),
      ]);
    }
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value.slice(0, maxWordCount);
    setWord(inputText);
    formik.setFieldValue("coverLetter", inputText);
  };

  const thumbs = files.length > 0 && (
    <Fragment key={files[0].name}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          color: "#CACACA",
          "&.MuiAvatar-circular": {
            background: "#F0F0F0",
          },
        }}
        src={files[0].preview}
        onLoad={() => {
          URL.revokeObjectURL(files[0].preview);
        }}
      />
    </Fragment>
  );

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      addressee: "",
      coverLetter: "",
      signature: [],
    },
    onSubmit: async (values) => {
      console.log({ values });
      setLoading(true);
      const payload = {
        profile_title: values.jobTitle,
        name_or_address: values.addressee,
        cover_letter: values.coverLetter,
        signature_file: files,
      };
      console.log({ payload });
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "signature_file") {
          payload.signature_file.forEach((attachment) => {
            console.log(attachment, key);
            newFormData.append(key, attachment);
          });
        } else {
          newFormData.append(key, payload[key]);
        }
      }
      console.log({ newFormData });
      const res = await updateCoverLetterAPI(newFormData, jobId);
      if (res.remote === "success") {
        setData(payload);
        dispatch(setCoverLetterData(payload));
        setLoading(false);
        dispatch(setSuccessToast("Cover letter updated successfully"));
      } else {
        formik.setErrors("Something went wrong");
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (currentUser?.resume) {
      const newState = {
        jobTitle: currentUser?.coverLetterData?.profile_title,
        addressee: currentUser?.coverLetterData?.name_or_address,
        coverLetter: currentUser?.coverLetterData?.coverLetter,
        signature: currentUser?.coverLetterData?.signature,
      };

      for (const key in newState) {
        formik.setFieldValue(key, newState[key]);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("jobTitle", data.profile_title || "");
      formik.setFieldValue("addressee", data.name_or_address || "");
      formik.setFieldValue("coverLetter||", data.coverLetter || "");
      formik.setFieldValue("signature", data.signature || "");
    }
  }, [data]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box className={styles.createCoverLetter_box}>
          <h1 className={styles.heading}>Create a cover letter</h1>
          <Typography className={styles.letter_desc}>
            Create a personalized cover letter and then click “Generate”. You
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
                {!files.length ? (
                  <Avatar
                    src={IMAGES.CoverLetterImg}
                    className={styles.coverletter_avatar}
                  />
                ) : (
                  <>{thumbs}</>
                )}
              </Grid>
              <Grid item lg={10.9} md={10.8} sm={10.4} xs={8}>
                <Box
                  className={styles.coverletter_drag_box}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    {...getInputProps()}
                    {...formik.getFieldProps("signature")}
                    onChange={handleFileChange}
                  />
                  <Typography className={styles.coverletter_drag}>
                    Drag here or <span>upload a signature</span>
                  </Typography>
                  <Typography className={styles.coverletter_drag_drop}>
                    PNG, JPEN and PDF files are supported
                  </Typography>
                </Box>
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
