// src/api/axios.js
import axios from "axios";

const API_KEY = "KsVJNMSeLQjzsxtWvU5NjtaxsMUBLADb0w90jPEMpTv0PHrqX9qBaIXPUBQz8q2o";

const api = axios.create({
  baseURL: "https://api.stockwiz.in/api/v2/strykex/",
  headers: {
    "api-key": API_KEY,
    "accept-language": "en",
    "Content-Type": "text/plain",
  },
  // You can set timeout, interceptors, etc. here too
});

export default api;
