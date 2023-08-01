import { Http } from '@tiger/utils';

export default new Http({
	baseURL: import.meta.env.API_BASE_URL,
});
