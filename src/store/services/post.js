import axios from './axios';

export const getAll = () => axios.get('/posts');
