import axios from "./axios";

export const registerRequest = async (data) => {
  const response = await axios.post(`api/sessions/register`, data);
  return response.data;
};

export const loginRequest = (user) => axios.post(`api/sessions/login`, user);

export const verifyToken = (token) => {
  return axios.get(`api/sessions/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
