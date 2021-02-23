import axios from './axios';

export const getAllCategory = () => axios.get('/categories');
