// 后端请求返回
export type BaseApiResponse<T> = {
	code: number;
	message: string;
	result: T;
};

export interface RequestOptions {
	// 是否全局展示请求 错误信息
	globalErrorMessage?: boolean;
	// 是否全局展示请求 成功信息
	globalSuccessMessage?: boolean;
}
