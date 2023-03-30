import {
  Card,
  CardContent,
  FormControl,
  FormGroup,
  Grid,
  Select,
  Stack,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";

import { OutlinedButton } from "@components/button";
import UploadFile from "@pages/jobSeeker/updateProfile/uploadfile";
import UpdateInfo from "@pages/jobSeeker/updateProfile/update-info";
import DialogBox from "@components/dialogBox";
import { IMAGES } from "@assets/images";
import { CheckboxInput, LabeledInput, SelectInput } from "@components/input";
import { SVG } from "@assets/svg";
import { FormControlReminder } from "@components/style";
export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    letter-spacing: 0.02em;

    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;

function MyProfile() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="uploadimg">
      <img
        alt=""
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <>
      <Stack direction="row" spacing={3} className="mb-3" alignItems={"center"}>
        <h1 className="heading m-0">Add info to complete your profile</h1>
        <span className="later" style={{ color: "#274593" }}>
          Do it later
        </span>
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <div className="add-content">
                <h2 className="mb-4">About</h2>
                <form>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">Organization name</label>
                    <div className="w-70">
                      <LabeledInput
                        className="add-form-control"
                        type="text"
                        placeholder="Lotus's Employment Group LLC"
                      />
                    </div>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">Type of the organization</label>
                    <div className="w-70">
                      <FormControl fullWidth size="small">
                        <SelectInput
                          value=""
                          options={[
                            {
                              value: "",
                              label: (
                                <em
                                  style={{
                                    color: "#848484",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                  }}
                                >
                                  Select a type of your company
                                </em>
                              ),
                            },
                            { value: "1", label: "Business" },
                            { value: "2", label: "NGO" },
                            { value: "3", label: "Government" },
                          ]}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">Website domain </label>
                    <div className="w-70">
                      <LabeledInput
                        className="add-form-control"
                        type="text"
                        placeholder="https://"
                      />
                    </div>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">Business license</label>
                    <div className="w-70">
                      <LabeledInput
                        className="add-form-control"
                        type="text"
                        placeholder="138-DAI-82J-HA7"
                        readOnly
                      />
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    className="dashedborder mb-3"
                    alignItems="center"
                  >
                    <div className="img-view">{thumbs}</div>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="w-100 py-2"
                    >
                      <input {...getInputProps()} />
                      <p className="mb-0 p-0">
                        Drag here or{" "}
                        <strong className="color-blue">
                          upload a license photo
                        </strong>
                      </p>
                    </div>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">Registration certificate</label>
                    <div className="w-70">
                      <FormControl fullWidth size="small">
                        <SelectInput
                          value=""
                          options={[
                            {
                              value: "",
                              label: (
                                <em
                                  style={{
                                    color: "#848484",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                  }}
                                >
                                  Certificate number
                                </em>
                              ),
                            },
                            { value: "1", label: "Certificate" },
                          ]}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    className="dashedborder mb-3"
                    alignItems="center"
                  >
                    <div className="docpreveiw">
                      {!files.length ? (
                        <img src={IMAGES.Doc} alt="" />
                      ) : (
                        <>{thumbs}</>
                      )}
                    </div>

                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="w-100"
                    >
                      <input {...getInputProps()} />
                      <p>
                        Drag here or{" "}
                        <strong className="color-blue">
                          upload another a certificate photo
                        </strong>
                      </p>
                    </div>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">Years of operating</label>
                    <div className="w-70">
                      <LabeledInput
                        className="add-form-control"
                        type="text"
                        placeholder="5"
                      />
                    </div>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 2, lg: 2 }}
                    alignItems={{ xs: "start", lg: "center" }}
                    className="mb-3"
                  >
                    <label className="w-30">No. of jobs as experience</label>
                    <div className="w-70">
                      <LabeledInput
                        className="add-form-control"
                        type="text"
                        placeholder="15"
                      />
                    </div>
                  </Stack>
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      value="wish"
                      control={<CheckboxInput />}
                      label=" I wish to receive notifications and other related information from Koor"
                    />
                  </FormGroup>
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      value="wish"
                      control={<CheckboxInput />}
                      label=" I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                    />
                  </FormGroup>
                  <div className="text-center mt-3">
                    <OutlinedButton
                      onClick={handleClickOpen}
                      variant="outlined"
                      title="update info"
                    />
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <UploadFile
                title="Your organization logo"
                textcolor="#274593"
                color="#274593"
                bgcolor="rgba(40, 71, 146, 0.1)"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DialogBox open={open} handleClose={handleClose}>
        <UpdateInfo
          title="Great!"
          color="#274593"
          bgcolor="#D5E3F6"
          description={[
            <>
              <p>
                Thank you for adding this important information. Our team will
                review it and activate your account within 24 hours.{" "}
              </p>
              <p>Psst, it may happen even faster, stay tuned 😉</p>
            </>,
          ]}
          buttonHover="rgba(40, 71, 146, 0.1)"
          handleClose={handleClose}
          buttontext="Got it"
          icon={<SVG.AlertCheckICon />}
        />
      </DialogBox>
    </>
  );
}

export default MyProfile;
