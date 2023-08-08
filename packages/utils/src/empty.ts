/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlainObject } from 'lodash-es';
/**
 * 判断是否为空文本
 * @param text - 文本
 * @returns 是否为空
 * @public
 */
export function isEmptyText(text: any): text is null | undefined {
	return text === null || typeof text === 'undefined' || text === 'null' || text === 'undefined' || text === '';
}

/**
 * 判断是否为空对象
 * @param obj - 对象
 * @returns 是否为空
 * @public
 */
export function isEmptyObject(obj: any): boolean {
	return isPlainObject(obj) && Reflect.ownKeys(obj).length === 0;
}
