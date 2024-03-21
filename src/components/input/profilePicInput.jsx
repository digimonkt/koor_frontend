import { OutlinedButton } from "../../components/button";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "../../assets/svg";
import ImageCropper from "../../components/imageCropper";
import { useSelector, useDispatch } from "react-redux";
import { USER_ROLES } from "../../utils/enum";
import { setErrorToast } from "../../redux/slice/toast";
import { Capacitor } from "@capacitor/core";

const ProfilePicInputComponent = ({
  title,
  handleSave,
  image,
  loading,
  fun,
  toggle,
}) => {
  const platform = Capacitor.getPlatform();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [files, setFiles] = useState([]);
  const [newImage, setNewImage] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  useEffect(() => {
    setNewImage(image);
  }, [image]);

  const handleUpdateImage = (file) => {
    setNewImage(file);
    setFiles([]);
  };

  const handleSaveImage = () => {
    if (newImage instanceof File) {
      handleSave(newImage);
    } else {
      dispatch(setErrorToast("Upload photo require"));
    }
  };

  const thumbs = (
    <Avatar
      sx={{
        width: 100,
        height: 100,
        color: "#CACACA",
        "&.MuiAvatar-circular": {
          background: "#F0F0F0",
          borderRadius: "0px",
        },
      }}
      src={newImage instanceof File ? URL.createObjectURL(newImage) : newImage}
      onLoad={() => {
        URL.revokeObjectURL(newImage);
      }}
    />
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <>
      {platform === "android" || platform === "ios" ? (
        <div className="add-content">
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h2>{title}</h2>
            {platform === "android" || platform === "ios" ? (
              toggle ? (
                <IconButton size="large" onClick={() => fun()}>
                  <SVG.ArrowUpIcon />
                </IconButton>
              ) : (
                <IconButton size="large" onClick={() => fun()}>
                  <SVG.Downarrow />
                </IconButton>
              )
            ) : null}
          </Stack>
          {toggle ? (
            <>
              <Stack
                direction="column"
                spacing={2}
                className="mt-4"
                alignItems={"center"}
                sx={{ border: "2px solid #F0F0F0", borderRadius: "8px", p: 2 }}
              >
                {!newImage ? (
                  <Avatar
                    alt="profileImage"
                    sx={{
                      width: 100,
                      height: 100,
                      color: "#CACACA",
                      "&.MuiAvatar-colorDefault": {
                        background: "#F0F0F0",
                        borderRadius: "0px",
                      },
                    }}
                  >
                    <SVG.UserIcon />
                  </Avatar>
                ) : (
                  <>{thumbs}</>
                )}
                <Stack
                  direction="column"
                  spacing={4}
                  sx={{
                    background: "#FEEFD3",
                    padding: "8px 16px",
                    borderRadius: "59px",
                    color: "#EEA23D",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                    "& p": { color: "#EEA23D" },
                  }}
                >
                  <div>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} disabled={loading} />
                      <Typography variant="caption">
                        Upload another photo
                      </Typography>
                    </div>
                  </div>
                </Stack>
              </Stack>
              <div className="text-center">
                <OutlinedButton
                  title={
                    <>
                      {loading ? (
                        "Saving..."
                      ) : (
                        <>
                          <span className="me-2 d-inline-flex">
                            <SVG.CheckIcon />
                          </span>
                          Save photo
                        </>
                      )}
                    </>
                  }
                  sx={{
                    "&.MuiButton-outlined": {
                      border: "1px solid #EEA23D !important",
                      color: "#EEA23D !important",
                      fontWeight: "500",
                      fontSize: "16px",
                      padding: "10px 30px",
                      width: "185px",
                      height: "42px",
                      "@media (max-width: 480px)": {
                        width: "169px",
                        height: "42px",
                        padding: "10px 10px !important",
                        marginTop: "10px",
                      },
                    },
                  }}
                  disabled={loading}
                  onClick={handleSaveImage}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="add-content">
          <h2>{title}</h2>
          <Stack direction="row" spacing={2} className="mt-4">
            {!newImage ? (
              <Avatar
                alt="profileImage"
                sx={{
                  width: 100,
                  height: 100,
                  color: "#CACACA",
                  "&.MuiAvatar-colorDefault": {
                    background: "#F0F0F0",
                  },
                }}
              >
                <SVG.UserIcon />
              </Avatar>
            ) : (
              <>{thumbs}</>
            )}
            <Stack direction="column" spacing={4}>
              <div className="dropimg-userprofile">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} disabled={loading} />
                  <p>
                    Drag here or{" "}
                    <span
                      style={{
                        color:
                          role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593",
                      }}
                    >
                      upload a photo
                    </span>
                  </p>
                </div>
              </div>
            </Stack>
          </Stack>
          <div className="text-center">
            <OutlinedButton
              title={
                <>
                  {loading ? (
                    "Saving..."
                  ) : (
                    <>
                      <span className="me-2 d-inline-flex">
                        <SVG.CheckIcon />
                      </span>
                      Save photo
                    </>
                  )}
                </>
              }
              sx={{
                "&.MuiButton-outlined": {
                  border: "1px solid #EEA23D !important",
                  color: "#EEA23D !important",
                  fontWeight: "500",
                  fontSize: "16px",
                  padding: "10px 30px",
                  width: "185px",
                  height: "42px",
                  "@media (max-width: 480px)": {
                    width: "169px",
                    height: "42px",
                    padding: "10px 10px !important",
                    marginTop: "10px",
                  },
                },
              }}
              disabled={loading}
              onClick={handleSaveImage}
            />
          </div>
        </div>
      )}

      <ImageCropper
        open={files[0]}
        handleClose={() => {
          setFiles([]);
        }}
        handleSave={handleUpdateImage}
        image={files[0]}
      />
    </>
  );
};
export default ProfilePicInputComponent;
