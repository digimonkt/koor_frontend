import api from ".";

export const updateJobSeekerAboutMeAPI = async (data) => {
  const res = await api.request({
    url: "/v1/users/job-seeker/about-me",
    method: "PATCH",
    data,
  });
  return res;
};
