import { Http } from '@tiger/utils';

export default new Http({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});
