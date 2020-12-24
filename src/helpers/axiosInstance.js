import axios from "axios";

const fetchClient = () => {
  const baseURL = "http://localhost:8082/api";

  // const baseURL = "http://192.168.0.173:3000/api";
  let headers = {};

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    headers.Authorization = user.token;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  return axiosInstance;
};

export default fetchClient;
