import axios from "axios";

axios.defaults.baseURL = "https://api.realworld.io/api";

function getParams(query) {
  if (!query) return null;

  const params = [];
  Object.entries(query).map((param) => params.push(param.join("=")));

  return params.join("&");
}

const request = {
  get: async (url, query) => {
    const params = getParams(query);
    if (params) url = url + `?${params}`;

    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },

  post: async (url, data) => {
    try {
      const res = await axios.post(url, data);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },

  put: async (url, data) => {
    try {
      const res = await axios.put(url, data);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },

  delete: async (url) => {
    try {
      const res = await axios.delete(url);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
};

export default request;
