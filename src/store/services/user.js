import axiosProtect from './axios-protect';

export const findById = userId => axiosProtect.get(`/user/${userId}`);
