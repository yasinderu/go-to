import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Authorization: token,
	},
});

export default instance;
