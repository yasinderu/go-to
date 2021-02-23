import * as actionTypes from './actiontypes';
import { getAll, getByCategoryId, getByUserId } from '../services/post';

export const fetchAllPosts = () => async dispatch => {
	try {
		dispatch({ type: actionTypes.FETCH_POSTS_START });
		const res = await getAll();
		if (res.status === 200) {
			dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: res.data.value });
		} else {
			dispatch({ type: actionTypes.FETCH_POSTS_FAILED, payload: res.data.message });
		}
	} catch (err) {
		dispatch({ type: actionTypes.FETCH_POSTS_FAILED, payload: err });
	}
};

export const fetchPostsByCategory = categoryId => async dispatch => {
	try {
		dispatch({ type: actionTypes.FETCH_POSTS_START });
		const res = await getByCategoryId(categoryId);
		if (res.status === 200) {
			dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: res.data.value });
		} else {
			dispatch({ type: actionTypes.FETCH_POSTS_FAILED, payload: res.data.message });
		}
	} catch (err) {
		dispatch({ type: actionTypes.FETCH_POSTS_FAILED, payload: err });
	}
};

export const fetchPostsByUserId = userId => async dispatch => {
	try {
		dispatch({ type: actionTypes.FETCH_POSTS_BY_USER_ID_START });
		const res = await getByUserId(userId);
		if (res.status === 200) {
			dispatch({
				type: actionTypes.FETCH_POSTS_BY_USER_ID_SUCCESS,
				payload: res.data.value,
			});
		} else {
			dispatch({
				type: actionTypes.FETCH_POSTS_BY_USER_ID_FAILED,
				payload: res.data.message,
			});
		}
	} catch (err) {
		dispatch({ type: actionTypes.FETCH_POSTS_BY_USER_ID_FAILED, payload: err.message });
	}
};
