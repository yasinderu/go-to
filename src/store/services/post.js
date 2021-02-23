import axios from './axios';

export const getAll = () => axios.get('/posts');

export const getByCategoryId = categoryId =>
	axios.get(`/posts/getByCategory?categoryId=${categoryId}`);
