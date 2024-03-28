import html2pdf from "html2pdf.js";
import { mimeTypes } from "./constants/constants";
import { setErrorToast, setSuccessToast } from "../redux/slice/toast.js";
import { KoorLogo } from "@assets/base64/index";
import { DownloadResumeAPI } from "@api/jobSeeker";
import { generateFileUrl } from "./generateFileUrl";

// mime type
export function fileTypeExtractor(url) {
  const extension = "." + url.split(".").pop().toLowerCase();
  return mimeTypes[extension] || "";
}

// url and element
export function downloadUrlCreator(fileType, base64String) {
  const fileName = "attachment" + fileType;
  // Convert base64 string to Blob
  const byteCharacters = atob(base64String);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArrays], {
    type: fileType || "",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = downloadUrl;
  a.download = fileName || "file";
  a.target = "_blank";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(downloadUrl);
}

// pdf download
export const pdfDownloader = async (name, state, action) => {
  const element = document.getElementById("div-to-pdf");
  const options = {
    margin: [20, 0],
    filename: `${name || "Resume"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "Portrait" },
    pagebreak: {
      before: "#page-break",
    },
  };

  const footerContent = "This resume is generated with";
  const imageWidth = 13;
  const imageHeight = 5;
  try {
    state(true);
    await html2pdf()
      .from(element)
      .set(options)
      .toPdf()
      .get("pdf")
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
      })
      .save();
    state(false);
    action(setSuccessToast("File saved successfully"));
  } catch (err) {
    state(false);
    action(setErrorToast("Something went wrong"));
  }
};

export const docsDownloader = async (state, action) => {
  try {
    const res = await DownloadResumeAPI();
    if (res.remote === "success") {
      window.open(generateFileUrl(res.data.url), "_blank");
    }
    state(false);
    action(setSuccessToast("File saved successfully"));
  } catch (err) {
    console.error(err);
    state(false);
    action(setErrorToast("Something went wrong"));
  }
};

export const cleanHtmlContent = (html) => {
  return html?.replace(/<[^>]*>/g, "").trim();
};
