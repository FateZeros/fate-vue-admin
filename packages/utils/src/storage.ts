import { cloneDeep, isObjectLike } from 'lodash-es';

const localStorage = import('localforage').then(async (localforage) => {
	if (typeof window === 'object') {
		await localforage.default.ready();
	}

	return localforage.default;
});

/**
 * 存储参数
 * @public
 */
export interface StorageOption {
	/**
	 * 存储天数
	 */
	expire?: number;
	/**
	 * 是否加密
	 */
	isCrypto?: boolean;
}

/**
 * 存储值
 * @public
 */
export interface StorageValue<T> extends Required<StorageOption> {
	/**
	 * 存储值
	 */
	value: T;
	/**
	 * 是否为对象
	 */
	isObject?: boolean;
}

export class Storage {
	/**
	 * 存储引擎
	 */
	private _localStorage = localStorage;

	/**
	 * 默认过期时间
	 */
	private detaultExpires = 1000 * 60 * 60 * 24;

	/**
	 * 获取存储键
	 * @param key - 存储键
	 * @returns 存储键
	 */
	private getKey(key: string): string {
		return `${location.origin}/${key}`;
	}

	/**
	 * 加密
	 * @param value - 存储值
	 * @param isObject - 是否为对象
	 * @returns 加密值
	 */
	private encryptString<T>(value: T, isObject?: boolean): string {
		let data = value as unknown as string;

		if (isObject) {
			try {
				// data = crypto.encrypt(JSON.stringify(value));
				data = JSON.stringify(value);
			} catch (error) {
				console.log(error);
			}
		} else if (typeof value === 'string') {
			// data = crypto.encrypt(value);
			data = value;
		}

		return data;
	}

	/**
	 * 保存数据
	 * @param key - 存储键
	 * @param value - 存储值
	 * @param option - 参数
	 * @returns
	 * @public
	 */
	public async set<T>(key: string, value: T, option?: StorageOption): Promise<StorageValue<T>> {
		const localStorage = await this._localStorage;

		// 存储数据
		let val = cloneDeep(value);

		// 是否是对象
		const isObject = isObjectLike(val);

		// 存储天数
		let expire = option?.expire ?? 0;
		if (expire > 0) {
			expire = Date.now() + expire * this.detaultExpires;
		}

		// 是否加密
		const isCrypto = option?.isCrypto ?? false;
		if (isCrypto) {
			val = this.encryptString<T>(val, isObject) as unknown as T;
		}

		return localStorage.setItem(this.getKey(key), { value: val, expire, isObject, isCrypto });
	}

	/**
	 * 获取数据
	 * @param key - 存储键
	 * @returns
	 * @public
	 */
	public async get<T>(key: string): Promise<T | undefined> {
		try {
			const localStorage = await this._localStorage;

			const result = await localStorage.getItem<StorageValue<T>>(this.getKey(key));
			if (result) {
				const { value, expire, isCrypto } = result;
				if (expire > 0 && Date.now() > Number(expire)) {
					console.error(`该 ${key} 的 storage 已经过期!`);

					await this.remove(key);
				} else {
					const val = value;
					if (isCrypto) {
						// val = this.decryptString(val as unknown as string, isObject);
						console.log(val);
					}

					return Promise.resolve(val);
				}
			}

			return Promise.resolve(undefined);
		} catch (error) {
			Promise.reject(error);
		}
	}

	/**
	 * 删除数据
	 * @param key - 存储键
	 * @returns
	 * @public
	 */
	public async remove(key: string): Promise<void> {
		try {
			const localStorage = await this._localStorage;

			return localStorage.removeItem(this.getKey(key));
		} catch (error) {
			Promise.reject(error);
		}
	}

	/**
	 * 清空数据
	 * @returns
	 * @public
	 */
	public async clear(): Promise<void> {
		try {
			const localStorage = await this._localStorage;

			return localStorage.clear();
		} catch (error) {
			Promise.reject(error);
		}
	}
}
