import { ILoginData } from '@/types';
import request from '@/utils/request';

/**
 * 获取登录验证码
 * @returns
 */
export function getCapture<T>() {
	return request.get<T>('/v1/getCaptcha', { title: '获取登录验证码' });
}

/**
 * 登录接口
 * @param data
 * @returns
 */
export function login<T>(data: ILoginData) {
	return request.post<ILoginData, T>('/login', data, { title: '登录' });
}
