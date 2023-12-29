import { FilledButton, OutlinedButton } from "../../../../components/button";
import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import DialogBox from "../../../../components/dialogBox";
import ResumeTemplate from "./resumeTemplate/template1";
import html2pdf from "html2pdf.js";
import { useSelector, useDispatch } from "react-redux";
import { DownloadResumeAPI } from "../../../../api/jobSeeker";
import { generateFileUrl } from "@utils/generateFileUrl";
import { fileDownloader } from "@utils/filesUtils";
import { Capacitor } from "@capacitor/core";
import { setSuccessToast, setErrorToast } from "@redux/slice/toast";
import { KoorLogo } from "@assets/base64/index";

const ResumeUpdate = ({
  title,
  bgcolor,
  color,
  description,
  buttonWidth,
  toggle,
  appliedJob,
  fun,
}) => {
  const [openResume, setOpenResume] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isDownloadingDocs, setIsDownloadingDocs] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const platform = Capacitor.getPlatform();
  const dispatch = useDispatch();

  const downloadPDF = async () => {
    setIsDownloadingPDF(true);
    const element = document.getElementById("div-to-pdf");
    const options = {
      margin: [20, 0],
      filename: `${currentUser.name || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "Portrait" },
      pagebreak: {
        before: "#page-break",
      },
    };

    const footerContent = "This resume is generated with";
    const imageWidth = 13; // Set the desired width
    const imageHeight = 5;
    try {
      if (Capacitor.isNativePlatform) {
        await html2pdf()
          .from(element)
          .set(options)
          .toPdf()
          .get("pdf")
          .output("datauristring")
          .then(async function (pdf) {
            fileDownloader(options.filename, pdf);
          });
        setIsDownloadingPDF(false);
        dispatch(setSuccessToast("File saved successfully"));
      } else {
        await html2pdf()
          .from(element)
          .set(options)
          .toPdf()
          .get("pdf")
          .output("datauristring")
          .then(async function (pdf) {
            const totalPages = pdf.internal.getNumberOfPages();

            for (let i = 1; i <= totalPages; i++) {
              pdf.setPage(i);
              pdf.setFontSize(10);
              pdf.setTextColor(150);
              const imageX =
                pdf.internal.pageSize.getWidth() -
                pdf.internal.pageSize.getWidth() / 2 +
                footerContent.length -
                10;
              pdf.addImage(
                KoorLogo,
                "PNG",
                imageX,
                pdf.internal.pageSize.getHeight() - 14,
                imageWidth,
                imageHeight,
              );
              pdf.text(
                footerContent,
                pdf.internal.pageSize.getWidth() -
                  pdf.internal.pageSize.getWidth() / 2 -
                  footerContent.length,
                pdf.internal.pageSize.getHeight() - 10,
              );
            }
          });
        setIsDownloadingPDF(false);
        dispatch(setSuccessToast("File saved successfully"));
      }
    } catch (err) {
      console.log(err);
      dispatch(setErrorToast("Something went wrong"));
    }
  };
  const downloadDocs = async () => {
    setIsDownloadingDocs(true);
    const res = await DownloadResumeAPI();
    if (res.remote === "success") {
      window.open(generateFileUrl(res.data.url), "_blank");
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
            title={isDownloadingDocs ? "Downloading Docs..." : "Download Docs"}
            onClick={downloadDocs}
            style={{ marginBottom: "10px" }}
            disabled={isDownloadingPDF || isDownloadingDocs}
          />
          <ResumeTemplate appliedJob={appliedJob} />
        </>
      </DialogBox>
    </>
  );
};
export default ResumeUpdate;
