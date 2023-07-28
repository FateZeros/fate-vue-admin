import axios, { AxiosInstance } from 'axios';

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// config.headers['Authorization'] = 'Bearer ' + '';
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	(response) => {
		//   const code = response.data.code
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
