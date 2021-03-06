import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVICE_BASE;

const instance = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

export default instance;
