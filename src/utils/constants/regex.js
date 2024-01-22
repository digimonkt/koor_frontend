export const REGEX = Object.freeze({
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  mobile: /^[6-9]\d{9}$/,
  website:
    /^((ftp|http|https):\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/[\w#-]+)*)?$/gm,
});
