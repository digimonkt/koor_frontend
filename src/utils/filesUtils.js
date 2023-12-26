import { mimeTypes } from "./constants/constants.js";

export function fileTypeExtactor(url) {
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
