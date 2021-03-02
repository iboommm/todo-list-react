import axios from 'axios';

axios.defaults.baseURL = 'https://candidate.neversitup.com/todo';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const apiGet = async (path) => {
  return await axios.get(path);
};

export const apiPost = async (path, data) => {
  return await axios.post(path, data);
};

export const apiPut = (path, data) => {
  return axios.put(path, data);
};

export const apiDelete = (path, data) => {
  return axios.delete(path + '/' + data);
};

export const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = token;
};
