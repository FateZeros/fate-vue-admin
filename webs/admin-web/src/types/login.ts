/**
 * login 接口入参
 */
export interface ILoginData {
	userName: string;
	password: string;
	code: string;
}

/**
 * 验证码
 */
export interface ICaptureData {
	data: string;
}
