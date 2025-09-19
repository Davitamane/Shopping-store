import axios from "axios";

const API_URL = "https://api.redseam.redberryinternship.ge/api";

async function fetchData(link) {
  const response = await axios.get(`${API_URL}${link}`);
  return response.data;
}

async function postData(link, data) {
  const response = await axios.post(`${API_URL}${link}`, data);
  return response.data;
}

export const postLogin = (data) => postData("/login", data);
export const postRegister = (data) => postData("/register", data);
