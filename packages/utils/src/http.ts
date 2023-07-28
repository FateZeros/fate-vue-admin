/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { merge } from 'lodash-es';

export interface HttpConfig {
	serverUrl: string;
}

/**
 * Http 响应数据
 * @public
 */
export interface HttpResponseData<T> {
	/**
	 * code 码
	 */
	code: number;
	/**
	 * 失败消息
	 */
	message: string | undefined;
	/**
	 * 结果
	 */
	data: T;
}

export interface ExpandInternalAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
	title: string;
	showTip?: boolean;
	showErrorMessage?: boolean;
}

export interface ExpandAxiosResponse<D = any> extends AxiosResponse<D> {
	code: number;
	config: ExpandInternalAxiosRequestConfig;
}

export class Http {
	constructor(config: HttpConfig) {
		const { serverUrl } = config;

		this._http = this.create(serverUrl);
	}

	/**
	 * http axios 实例
	 */
	public _http: AxiosInstance;

	/**
	 * 创建 Axios 实例
	 * @param baseURL - 基准 url
	 * @returns Axios 实例
	 */
	private create(baseURL: string): AxiosInstance {
		const instance = axios.create({
			baseURL,
			timeout: 30 * 1000,
		});
		this.useRequest(instance);
		this.useResponse(instance);

		return instance;
	}

	/**
	 * 请求拦截
	 * @param instance - Axios 实例
	 * @returns
	 */
	private useRequest(instance: AxiosInstance) {
		instance.interceptors.request.use(
			async (config: InternalAxiosRequestConfig) => {
				const { title, showTip = false, showErrorMessage = true } = config as ExpandInternalAxiosRequestConfig;
				return Promise.resolve({ ...config, title, showTip, showErrorMessage });
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	/**
	 * 响应拦截
	 * @param instance - Axios 实例
	 * @returns
	 */
	private useResponse(instance: AxiosInstance) {
		instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { code, data, config } = response as ExpandAxiosResponse;
				console.log(config, 11);
				if (code === 200) {
					if (data.hasError) {
						// if (config.showErrorMessage) {
						// 	message.error(data.message || `${config.title || '请求'}失败`);
						// }
					} else {
						// if (config.showTip) {
						// 	message.success(`${config.title || '请求'}成功`);
						// }
					}

					return data;
				}

				return this.handleError(response);
			},
			(error: AxiosError) => {
				return this.handleError(error.response, error);
			}
		);
	}

	/**
	 * 错误处理
	 * @param response - 响应
	 * @param error - 错误
	 * @returns
	 */
	private handleError(response?: AxiosResponse, error?: AxiosError) {
		if (response) {
			const { status, config } = response;

			let msg = '';
			switch (status) {
				case 302:
					msg += '接口重定向！';
					break;
				case 400:
					msg += '请求错误！';
					break;
				case 401:
					msg += '您尚未登录，或已登录超时！';
					break;
				case 403:
					msg += '拒绝访问！';
					break;
				case 404:
					msg += `请求地址${config.url ? ` ${config.url} ` : ''}不存在！`;
					break;
				case 405:
					msg += '请求方法不接受！';
					break;
				case 408:
					msg += '请求超时！';
					break;
				case 409:
					msg += '系统已存在相同数据！';
					break;
				case 500:
					msg += '服务错误！';
					break;
				case 501:
					msg += '服务未实现！';
					break;
				case 502:
					msg += '网关错误！';
					break;
				case 503:
					msg += '服务不可用！';
					break;
				case 504:
					msg += '网络超时！';
					break;
				case 505:
					msg += 'HTTP 版本不受支持！';
					break;
				default:
					msg += '请求异常，请联系管理员！';
					break;
			}

			if (status === 401) {
				console.log(401);
			}
			console.error(msg);

			return Promise.reject(msg);
		} else if (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * 合并 Axios 请求配置和 Http 提示配置
	 * @param config - Axios 请求配置
	 * @param tipConfig - Http 提示配置
	 * @returns Http 请求配置
	 */
	private mergeConfig<D>(config?: AxiosRequestConfig<D>, tipConfig?: ExpandInternalAxiosRequestConfig): ExpandInternalAxiosRequestConfig<D> {
		return merge({}, config, tipConfig);
	}

	/**
	 * get 请求
	 * @param url - 请求地址
	 * @param config - Axios 请求配置
	 * @param tipConfig - Http 提示配置
	 * @returns 请求结果
	 */
	public get<T = any, R = HttpResponseData<T>, D = any>(
		url: string,
		config?: ExpandInternalAxiosRequestConfig<D>,
		tipConfig?: ExpandInternalAxiosRequestConfig
	): Promise<R> {
		return this._http.get(url, this.mergeConfig<D>(config, tipConfig));
	}

	/**
	 * delete 请求
	 * @param url - 请求地址
	 * @param config - Axios 请求配置
	 * @param tipConfig - Http 提示配置
	 * @returns 请求结果
	 */
	public delete<T = any, R = HttpResponseData<T>, D = any>(
		url: string,
		config?: ExpandInternalAxiosRequestConfig<D>,
		tipConfig?: ExpandInternalAxiosRequestConfig
	): Promise<R> {
		return this._http.delete(url, this.mergeConfig(config, tipConfig));
	}

	/**
	 * post 请求
	 * @param url - 请求地址
	 * @param data - 请求参数
	 * @param config - Http 请求配置
	 * @returns 请求结果
	 */
	public post<T = any, R = HttpResponseData<T>, D = any>(url: string, data?: D, config?: ExpandInternalAxiosRequestConfig<D>): Promise<R> {
		return this._http.post(url, data, config);
	}

	/**
	 * put 请求
	 * @param url - 请求地址
	 * @param data - 请求参数
	 * @param config - Http 请求配置
	 * @returns 请求结果
	 */
	public put<T = any, R = HttpResponseData<T>, D = any>(url: string, data?: D, config?: ExpandInternalAxiosRequestConfig<D>): Promise<R> {
		return this._http.put(url, data, config);
	}

	/**
	 * patch 请求
	 * @param url - 请求地址
	 * @param data - 请求参数
	 * @param config - Http 请求配置
	 * @returns 请求结果
	 */
	public patch<T = any, R = HttpResponseData<T>, D = any>(url: string, data?: D, config?: ExpandInternalAxiosRequestConfig<D>): Promise<R> {
		return this._http.patch(url, data, config);
	}
}
