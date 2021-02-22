import axios from './axios';

export const signUp = payload => axios.post('/user/signup', payload);

export const login = payload => axios.post('/user/signin', payload);
