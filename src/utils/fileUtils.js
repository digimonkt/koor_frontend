import html2pdf from "html2pdf.js";
import { DownloadResumeAPI } from "@api/jobSeeker";
import { generateFileUrl } from "./generateFileUrl";
import { mimeTypes } from "./constants/constants.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { setErrorToast, setSuccessToast } from "../redux/slice/toast.js";
import { KoorLogo } from "@assets/base64/index";
import { Capacitor } from "@capacitor/core";
import { FileOpener } from "@capawesome-team/capacitor-file-opener";

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
export function isBase64Image(str) {
  const dataUriRegex = /^data:image\/(png|jpg|jpeg|gif);base64,/;

  return dataUriRegex.test(str);
}

// file downloads
export const fileDownloader = async (filename, file) => {
  try {
    let fileData;
    const filePath = `${Directory.Documents}/${filename || "attachment"}`;
    if (isBase64Image(file)) {
      fileData = await Filesystem.writeFile({
        path: filePath,
        data: file,
        directory: Directory.Documents,
        recursive: true,
      });
    } else {
      const base64Data = file.split("base64,")[1];
      fileData = await Filesystem.writeFile({
        path: filePath,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
      });
    }

    await FileOpener.openFile({
      path: fileData.uri,
    });
  } catch (err) {
    console.error("Error in fileDownloader:", err);
  }
};

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
    if (Capacitor.isNativePlatform()) {
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
              imageHeight
            );
            pdf.text(
              footerContent,
              pdf.internal.pageSize.getWidth() -
                pdf.internal.pageSize.getWidth() / 2 -
                footerContent.length,
              pdf.internal.pageSize.getHeight() - 10
            );
          }
        })
        .output("datauristring")
        .then(async function (pdf) {
          fileDownloader(options.filename, pdf);
        });
      state(false);
      action(setSuccessToast("File saved successfully"));
    } else {
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
              imageHeight
            );
            pdf.text(
              footerContent,
              pdf.internal.pageSize.getWidth() -
                pdf.internal.pageSize.getWidth() / 2 -
                footerContent.length,
              pdf.internal.pageSize.getHeight() - 10
            );
          }
        })
        .save();
      state(false);
    }
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
