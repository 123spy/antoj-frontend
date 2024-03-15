import axios from "axios";
import {message} from "antd";

const isDev = process.env.NODE_ENV === 'development';

axios.defaults.baseURL = isDev ? 'http://localhost:8080' : "线上地址";

axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.status != 200) {
    message.error("网络请求错误");
  }
  return response?.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;
