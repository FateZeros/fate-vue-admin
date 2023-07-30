import { Http } from '@tiger/utils';

const request = new Http({
	serverUrl: import.meta.env.API_BASE_URL,
});

export default request;
