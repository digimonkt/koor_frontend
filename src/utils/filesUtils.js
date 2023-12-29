import { mimeTypes } from "./constants/constants.js";
import { Filesystem, Directory } from "@capacitor/filesystem";

export function fileTypeExtractor(url) {
  const extension = "." + url.split(".").pop().toLowerCase();
  return mimeTypes[extension] || "application/octet-stream";
}

export function downloadUrlCreator(blob) {
  const fileName = "attachment";

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

export const fileDownloader = async (filename, file) => {
  try {
    const base64Data = file.split("base64,")[1];
    await Filesystem.writeFile({
      path: filename || "attachment",
      data: base64Data,
      directory: Directory.Documents,
      recursive: true,
    });
  } catch (err) {
    console.log(err);
  }
};
