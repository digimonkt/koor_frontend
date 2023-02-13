import api from ".";

export const CreateUserAPI = async (data) => {
  const response = await api.request({
    url: "/v1/users",
    method: "POST",
    data,
  });
  return response;
};
