import axios from 'axios';
import queryString from 'query-string';

export const axiosClientAdmin = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const axiosClientEmployee = axios.create({
  baseURL: process.env.REACT_APP_EMPLOYEE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const axiosClientProfile = axios.create({
  baseURL: process.env.REACT_APP_PROFILE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClientAdmin.interceptors.request.use(async (config) => {
  return config;
});

axiosClientAdmin.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);

axiosClientEmployee.interceptors.request.use(async (config) => {
  return config;
});

axiosClientEmployee.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);

axiosClientProfile.interceptors.request.use(async (config) => {
  return config;
});

axiosClientProfile.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);

export const axiosClientAuth = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClientAuth.interceptors.request.use(async (config) => {
  return config;
});

axiosClientAuth.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);

export const axiosClientProduct = axios.create({
  baseURL: process.env.REACT_APP_FOOD_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClientProduct.interceptors.request.use(async (config) => {
  return config;
});

axiosClientProduct.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);
