import axios from './axios';
import axiosProtect from './axios-protect';

export const getAll = () => axios.get('/posts');

export const getByCategoryId = categoryId =>
	axios.get(`/posts/getByCategory?categoryId=${categoryId}`);

export const getByUserId = userId =>
	axiosProtect.get(`/posts/getByUser?userId=${userId}`);

export const getByCategoryIdAndUserId = (categoryId, userId) =>
	axiosProtect.get(
		`/posts/getByCategoryAndUserId?categoryId=${categoryId}&userId=${userId}`
	);

export const getById = postId => axiosProtect.get(`/posts/getById/${postId}`);
