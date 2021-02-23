import * as actionTypes from './actiontypes';
import { getAllCategory } from '../services/category';

export const fetchAllCategory = () => async dispatch => {
	try {
		dispatch({ type: actionTypes.FETCH_CATEGORY_START });
		const res = await getAllCategory();
		if (res.status === 200) {
			dispatch({ type: actionTypes.FETCH_CATEGORY_SUCCESS, payload: res.data.value });
		} else {
			console.log('error', res.data.message);
			dispatch({ type: actionTypes.FETCH_CATEGORY_FALIED, payload: res.data.message });
		}
	} catch (err) {
		console.log('error', err.message);
		dispatch({ type: actionTypes.FETCH_CATEGORY_FALIED, payload: err.message });
	}
};
