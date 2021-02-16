import * as actionTypes from './actiontypes';
import { getAll } from '../services/post';

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
