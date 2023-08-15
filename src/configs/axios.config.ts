import axios from 'axios';

const api = axios.create({
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*',
	},
});

api.interceptors.request.use(function (config) {
	return config;
});

export default api;
