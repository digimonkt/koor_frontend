import { FilledButton, OutlinedButton } from "../../../../components/button";
import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import DialogBox from "../../../../components/dialogBox";
import ResumeTemplate from "./resumeTemplate/template1";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import { DownloadResumeAPI } from "../../../../api/jobSeeker";
import { generateFileUrl } from "../../../../utils/generateFileUrl";
import { Capacitor } from "@capacitor/core";
const ResumeUpdate = ({
  title,
  bgcolor,
  color,
  description,
  buttonWidth,
  toggle,
  fun,
}) => {
  const [openResume, setOpenResume] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isDownloadingDocs, setIsDownloadingDocs] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const platform = Capacitor.getPlatform();

  const downloadPDF = async () => {
    setIsDownloadingPDF(true);
    const element = document.getElementById("div-to-pdf");
    const images = document.getElementById("profile-avatar");

    if (images) {
      console.log({ images });
      const options = {
        margin: [5, 5],
        filename: `${currentUser.name || "Resume"}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(options).from(element).save();
    } else {
      console.log("loading");
    }
    setIsDownloadingPDF(false);
  };

  const downloadDocs = async () => {
    setIsDownloadingDocs(true);
    const res = await DownloadResumeAPI();
    if (res.remote === "success") {
      window.open(generateFileUrl(res.data.url), "_blank");
      // const response = await fetch(generateFileUrl(res.data.url));
      // const blob = await response.blob();
      // // const newFileName = `${currentUser.name || "Resume"}.docx`;
      // const downloadLink = document.createElement("a");
      // downloadLink.href = URL.createObjectURL(blob);
      // // downloadLink.downtload = newFileName;
      // downloadLink.target = "_blank";
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
      // document.body.removeChild(downloadLink);
    }
    setIsDownloadingDocs(false);
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
                <Stack direction={"row"} spacing={2} className="mt-4">
                  <IconButton
                    sx={{
                      "&.MuiIconButton-root": {
                        backgroundColor: bgcolor,
                        width: "60px",
                        height: "60px",
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
                  <div className="description">{description}</div>
                </Stack>
                <div className="my-4 text-center">
                  <OutlinedButton
                    style={{ width: "100%" }}
                    title={
                      <>
                        <span className="me-2 d-inline-flex">
                          <SVG.DownloadIcon />
                        </span>
                        DOWNLOAD YOUR RESUME
                      </>
                    }
                    onClick={() => setOpenResume(true)}
                    sx={{
                      "&.MuiButton-outlined": {
                        border: "1px solid #EEA23D !important",
                        color: "#EEA23D !important",
                        fontWeight: "500",
                        fontSize:
                          platform === "android" || platform === "ios"
                            ? "15px !important"
                            : "16px",
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
              <div className="description">{description}</div>
            </Stack>
            <div className="my-4 text-center">
              <OutlinedButton
                style={{ width: "100%" }}
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.DownloadIcon />
                    </span>
                    DOWNLOAD YOUR RESUME
                  </>
                }
                onClick={() => setOpenResume(true)}
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
          </div>
        )}

        {/* <Divider />
        <div className="text-resume  text-center mt-3 pb-1">
          Don’t have a resume?
        </div>
        <div className="text-worry">
          Don't worry if you don't have one yet,{" "}
          <span>create resume from Jobseeker's</span>
        </div> */}
      </div>
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
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={1}
            flexWrap={"wrap"}
            useFlexGap
          >
            <FilledButton
              title={isDownloadingPDF ? "Downloading PDF..." : "Download PDF"}
              onClick={downloadPDF}
              style={{ marginBottom: "10px" }}
              disabled={isDownloadingPDF || isDownloadingDocs}
            />
            <FilledButton
              title={
                isDownloadingDocs ? "Downloading Docs..." : "Download Docs"
              }
              onClick={downloadDocs}
              style={{ marginBottom: "10px" }}
              disabled={isDownloadingPDF || isDownloadingDocs}
            />
          </Stack>
          <ResumeTemplate />
        </>
      </DialogBox>
    </>
  );
};
export default ResumeUpdate;
