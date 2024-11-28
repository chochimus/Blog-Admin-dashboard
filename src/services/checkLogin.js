import axios from "./axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/check-login";

export const checkLogin = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
