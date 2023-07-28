import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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
export declare class Http {
    constructor(config: HttpConfig);
    /**
     * http axios 实例
     */
    _http: AxiosInstance;
    /**
     * 创建 Axios 实例
     * @param baseURL - 基准 url
     * @returns Axios 实例
     */
    private create;
    /**
     * 请求拦截
     * @param instance - Axios 实例
     * @returns
     */
    private useRequest;
    /**
     * 响应拦截
     * @param instance - Axios 实例
     * @returns
     */
    private useResponse;
    /**
     * 错误处理
     * @param response - 响应
     * @param error - 错误
     * @returns
     */
    private handleError;
    /**
     * 合并 Axios 请求配置和 Http 提示配置
     * @param config - Axios 请求配置
     * @param tipConfig - Http 提示配置
     * @returns Http 请求配置
     */
    private mergeConfig;
    /**
     * get 请求
     * @param url - 请求地址
     * @param config - Axios 请求配置
     * @param tipConfig - Http 提示配置
     * @returns 请求结果
     */
    get<T = any, R = HttpResponseData<T>, D = any>(url: string, config?: ExpandInternalAxiosRequestConfig<D>, tipConfig?: ExpandInternalAxiosRequestConfig): Promise<R>;
    /**
     * delete 请求
     * @param url - 请求地址
     * @param config - Axios 请求配置
     * @param tipConfig - Http 提示配置
     * @returns 请求结果
     */
    delete<T = any, R = HttpResponseData<T>, D = any>(url: string, config?: ExpandInternalAxiosRequestConfig<D>, tipConfig?: ExpandInternalAxiosRequestConfig): Promise<R>;
    /**
     * post 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - Http 请求配置
     * @returns 请求结果
     */
    post<T = any, R = HttpResponseData<T>, D = any>(url: string, data?: D, config?: ExpandInternalAxiosRequestConfig<D>): Promise<R>;
    /**
     * put 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - Http 请求配置
     * @returns 请求结果
     */
    put<T = any, R = HttpResponseData<T>, D = any>(url: string, data?: D, config?: ExpandInternalAxiosRequestConfig<D>): Promise<R>;
    /**
     * patch 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - Http 请求配置
     * @returns 请求结果
     */
    patch<T = any, R = HttpResponseData<T>, D = any>(url: string, data?: D, config?: ExpandInternalAxiosRequestConfig<D>): Promise<R>;
}
