import api from ".";
import urlcat from "urlcat";
export const updateJobSeekerAboutMeAPI = async (data) => {
  const res = await api.request({
    url: "/v1/users/job-seeker/about-me",
    method: "PATCH",
    data,
  });
  return res;
};

export const addEducationDetailsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/educations"),
    method: "POST",
    data,
  });
  return res;
};

export const updateEducationDetailsAPI = async (educationId, data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/educations/:educationId", {
      educationId,
    }),
    method: "PATCH",
    data,
  });
  return res;
};
export const deleteEducationDetailsAPI = async (id) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/educations/:educationId", {
      educationId: id,
    }),
    method: "DELETE",
  });
  return res;
};

export const addLanguageDetailsAPI = async (data) => {
  const res = api.request({
    url: urlcat("/v1/users/job-seeker/language"),
    method: "POST",
    data,
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: res.data.data,
    };
  }
  return res;
};

export const updateLanguageDetailsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/language/:languageId", {
      languageId: data.id,
    }),
    method: "PATCH",
    data,
  });
  return res;
};
export const deleteLanguageDetailsAPI = async (languageId) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/language/:languageId", { languageId }),
    method: "DELETE",
  });
  return res;
};
