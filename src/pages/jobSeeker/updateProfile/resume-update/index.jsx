import { OutlinedButton } from "../../../../components/button";
import { Box, IconButton, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import { SVG } from "../../../../assets/svg";
import { Capacitor } from "@capacitor/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uploadResumeAPI } from "@api/jobSeeker";
import { setSuccessToast, setErrorToast } from "@redux/slice/toast";
import { generateFileUrl } from "@utils/generateFileUrl";

const ResumeUpdate = ({
  title,
  bgcolor,
  color,
  description,
  buttonWidth,
  toggle,
  fun,
}) => {
  const { role, currentUser } = useSelector((state) => state.auth);
  const platform = Capacitor.getPlatform();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];
    setLoading(true);
    if (selectedFile) {
      const res = await uploadResumeAPI({ resume: selectedFile });
      if (res.remote === "success") {
        dispatch(setSuccessToast("File Uploaded Successfully"));
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-content">
        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <h2 className="mb-0">{title}</h2>
          {platform === "android" || platform === "ios" ? (
            <IconButton
              size="small"
              onClick={() => fun()}
              sx={{ "& svg": { width: "18px", height: "11px" } }}
            >
              {toggle ? <SVG.ArrowUpIcon /> : <SVG.Downarrow />}
            </IconButton>
          ) : null}
        </Stack>
        {platform === "android" || platform === "ios" ? (
          <>
            {toggle ? (
              <div>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  spacing={2}
                  className="mt-4"
                >
                  <IconButton
                    sx={{
                      "&.MuiIconButton-root": {
                        backgroundColor: bgcolor,
                        width: "101px",
                        height: "101px",
                        color,
                        "@media (max-width:540px)": {
                          margin: "auto",
                        },
                        cursor: "default",
                      },
                    }}
                  >
                    <SVG.ResumeIcon />
                  </IconButton>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <div>
                      {currentUser?.resume?.map((resume) => (
                        <Link
                          key={resume.id}
                          to={generateFileUrl(resume.filePath?.path)}
                          target="_blank"
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              color: "#EEA23D",
                            }}
                          >
                            <SVG.AttachIcon style={{ color: "#EEA23D" }} /> Your
                            Resume
                          </span>{" "}
                        </Link>
                      ))}
                    </div>
                    <div className="description">{description}</div>
                  </div>
                </Stack>
                <div className="mt-4 mb-3 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <OutlinedButton
                    style={{ width: "100%" }}
                    disabled={loading}
                    title={
                      <>
                        <span className="me-2 d-inline-flex">
                          <SVG.DownloadIcon />
                        </span>
                        {loading ? "Loading..." : "UPLOAD YOUR RESUME"}
                      </>
                    }
                    onClick={() => handleFileUpload()}
                    sx={{
                      "&.MuiButton-outlined": {
                        border: "1px solid #EEA23D !important",
                        color: "#EEA23D !important",
                        fontWeight: "500",
                        fontSize: "16px",
                        padding: "6px 30px",
                        width: buttonWidth,
                        height: "42px",
                        "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                        "@media (max-width: 992px)": {
                          padding: "10px 16px",
                        },
                        "@media (max-width: 480px)": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  />
                </div>
                <hr style={{ borderColor: "#CACACA" }} />
                <Box className="create_resume_div">
                  <h3>Don’t have a resume?</h3>
                  <p>
                    Don't worry if you don't have one yet,{" "}
                    <Link to={`/${role}/my-profile/create-resume`}>
                      create it with our free tool!
                    </Link>
                  </p>
                </Box>{" "}
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={2}
              className="mt-4"
            >
              <IconButton
                sx={{
                  "&.MuiIconButton-root": {
                    backgroundColor: bgcolor,
                    width: "101px",
                    height: "101px",
                    color,
                    "@media (max-width:540px)": {
                      margin: "auto",
                    },
                    cursor: "default",
                  },
                }}
              >
                <SVG.ResumeIcon />
              </IconButton>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div>
                  {currentUser?.resume?.map((resume) => (
                    <Link
                      key={resume.id}
                      to={generateFileUrl(resume.filePath?.path)}
                      target="_blank"
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          color: "#EEA23D",
                        }}
                      >
                        <SVG.AttachIcon style={{ color: "#EEA23D" }} /> Your
                        Resume
                      </span>{" "}
                    </Link>
                  ))}
                </div>
                <div className="description">{description}</div>
              </div>
            </Stack>
            <div className="mt-4 mb-3 text-center">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <OutlinedButton
                style={{ width: "100%" }}
                disabled={loading}
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.DownloadIcon />
                    </span>
                    {loading ? "Loading..." : "UPLOAD YOUR RESUME"}
                  </>
                }
                onClick={() => handleFileUpload()}
                sx={{
                  "&.MuiButton-outlined": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "6px 30px",
                    width: buttonWidth,
                    height: "42px",
                    "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                    },
                    "@media (max-width: 480px)": {
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </div>
            <hr style={{ borderColor: "#CACACA" }} />
            <Box className="create_resume_div">
              <h3>Don’t have a resume?</h3>
              <p>
                Don't worry if you don't have one yet,{" "}
                <Link to={`/${role}/my-profile/create-resume`}>
                  create it with our free tool!
                </Link>
              </p>
            </Box>
          </div>
        )}
      </div>
    </>
  );
};
export default ResumeUpdate;
