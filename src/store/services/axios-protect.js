import axios from 'axios';
import { getCookie } from '../../utils/Cookies';

// window.location.reload();

const token = getCookie('token');
// if (!token) {
// 	window.location.reload();
// }
const baseUrl = process.env.REACT_APP_SERVICE_BASE;

const instance = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Authorization: token,
	},
});

export default instance;
