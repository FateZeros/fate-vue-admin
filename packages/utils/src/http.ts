/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { merge } from 'lodash-es';

/**
 * Http 响应数据
 * @public
 */
export interface HttpResponse<T> {
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

/**
 * 拦截器钩子
 */
export interface InterceptorHooks {
	beforeRequestCallback?: (request: ExpandAxiosRequestConfig) => void;
	beforeResponseCallback?: (response: ExpandAxiosResponse) => void;
}

/**
 * 拓展自定义请求配置
 */
export interface ExpandAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
	interceptorHooks?: InterceptorHooks;
	// api title
	title?: string;
	// 是否展示 loading 动画
	showLoading?: boolean;
	// 是否展示异常消息
	showErrorMessage?: boolean;
	// 是否数据转换
	transform?: boolean;
}

/**
 * 拓展 axios 请求配置
 */
export interface ExpandInternalAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
	interceptorHooks?: InterceptorHooks;
	// httpOptions?: HttpOptions;
	// 是否展示 loading 动画
	showLoading?: boolean;
	// 是否展示异常消息
	showErrorMessage?: boolean;
	// 是否数据转换
	transform?: boolean;
}

/**
 * 拓展 axios 返回配置
 */
export interface ExpandAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {
	config: ExpandInternalAxiosRequestConfig<D>;
}

export class Http {
	private defaultConfig: ExpandAxiosRequestConfig = {
		// 请求超时时间
		timeout: 30 * 1000,
	};

	/**
	 * http axios 实例
	 */
	private _http: AxiosInstance;

	constructor(config: ExpandAxiosRequestConfig = {}) {
		const axiosConfig = merge(this.defaultConfig, config);
		this._http = axios.create(axiosConfig);

		this.interceptRequest();
		this.interceptResponse();
	}

	/**
	 * 请求拦截
	 * @param instance - Axios 实例
	 * @returns
	 */
	private interceptRequest(): void {
		this._http.interceptors.request.use(
			async (config: ExpandInternalAxiosRequestConfig) => {
				// hook
				if (config.interceptorHooks?.beforeRequestCallback) {
					config.interceptorHooks.beforeRequestCallback(config);
				}

				return config;
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
	private interceptResponse(): void {
		this._http.interceptors.response.use(
			async (response: ExpandAxiosResponse) => {
				// hook
				if (response.config.interceptorHooks?.beforeResponseCallback) {
					response.config.interceptorHooks.beforeResponseCallback(response);
				}
				// transform data
				if (response.config?.transform) {
					return response;
				}

				const { status } = response;

				if (status === 200) {
					return response.data;
				} else {
					if (response.config?.showErrorMessage) {
						console.log(response.data?.title);
						return;
					}
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
	 * get 请求
	 * @param url
	 * @param config
	 * @returns
	 */
	public get<D = any, R = any>(url: string, config: ExpandAxiosRequestConfig<D> = {}): Promise<HttpResponse<R>> {
		return this._http.get(url, config);
	}

	/**
	 * delete 请求
	 * @param url
	 * @param data
	 * @param config
	 * @returns
	 */
	public delete<D = any, R = any>(url: string, config: ExpandAxiosRequestConfig<D> = {}): Promise<HttpResponse<R>> {
		return this._http.delete(url, config);
	}

	/**
	 * post 请求
	 * @param url
	 * @param data
	 * @param config
	 * @returns
	 */
	public post<D = any, R = any>(url: string, data?: D, config: ExpandAxiosRequestConfig<D> = {}): Promise<HttpResponse<R>> {
		return this._http.post(url, data, config);
	}

	/**
	 * put 请求
	 * @param url - 请求地址
	 * @param data - 请求参数
	 * @param config - Http 请求配置
	 * @returns 请求结果
	 */
	public put<D = any, R = any>(url: string, data?: D, config?: ExpandAxiosRequestConfig<D>): Promise<HttpResponse<R>> {
		return this._http.put(url, data, config);
	}

	/**
	 * patch 请求
	 * @param url - 请求地址
	 * @param data - 请求参数
	 * @param config - Http 请求配置
	 * @returns 请求结果
	 */
	public patch<D = any, R = any>(url: string, data?: D, config?: ExpandAxiosRequestConfig<D>): Promise<HttpResponse<R>> {
		return this._http.patch(url, data, config);
	}
}
