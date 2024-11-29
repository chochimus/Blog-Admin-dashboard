import axios from "./axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/check-login";

export const checkLogin = async () => {
  try {
    const response = await axios.get(baseUrl);
    if (response.data && response.data.loggedIn) return response.data.loggedIn;
    return false;
  } catch (err) {
    return false;
  }
};
