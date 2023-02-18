import { FILE_BASE_URL } from "./constants/serverUrl";

export const generateFileUrl = (fileUrl) => {
  if (fileUrl.includes("http://") || fileUrl.include("https://")) {
    return fileUrl;
  } else {
    const newUrl = FILE_BASE_URL + fileUrl;
    return newUrl;
  }
};
