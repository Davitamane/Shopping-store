import axios from "axios";

const API_URL = "https://api.redseam.redberryinternship.ge/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function fetchData(link) {
  const response = await axios.get(`${API_URL}${link}`);
  return response.data;
}
async function fetchDataId(link, id) {
  const response = await axios.get(`${API_URL}${link}/${id}`);
  return response.data;
}

async function postData(link, data, id = false) {
  const url = id ? `${API_URL}${link}/${id}` : `${API_URL}${link}`;

  const response = await axios.post(url, data);

  return response.data;
}

async function patchData(link, data, id) {
  const response = await axios.patch(`${API_URL}${link}/${id}`, data);
  return response.data;
}
async function deleteData(link, data, id) {
  const response = await axios.delete(`${API_URL}${link}/${id}`, {
    data,
  });
  return response.data;
}

export const getProducts = (params = {}) => {
  return axios.get(`${API_URL}/products`, { params }).then((res) => res.data);
};

export const getProduct = (id) => fetchDataId("/products", id);
export const getCart = () => fetchData("/cart");

export const postLogin = (data) => postData("/login", data);
export const postRegister = (data) => postData("/register", data);
export const postCheckout = (data) => postData("/cart/checkout", data);
export const postProduct = (data, id) => postData("/cart/products", data, id);

export const patchRemoval = (id, data) => patchData("/cart/products", data, id);

export const deleteItem = (id, data) => deleteData("/cart/products", data, id);
