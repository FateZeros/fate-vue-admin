import request from '@/utils/request';

/**
 * 获取登录验证码
 * @returns
 */
export function getCapture() {
	return request({
		url: '/api/v1/getCaptcha',
		method: 'get',
	});
}

/**
 * 登录接口
 * @param data
 * @returns
 */
export function login(data: object) {
	return request({
		url: '/login',
		method: 'post',
		data,
	});
}
