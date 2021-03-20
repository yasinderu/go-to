import * as actionTypes from './actiontypes';
import { findById } from '../services/user';

export const findUserById = userId => async dispatch => {
	try {
		dispatch({ type: actionTypes.FIND_USER_BY_ID_START });
		const res = await findById(userId);
		if (res.status === 200) {
			dispatch({ type: actionTypes.FIND_USER_BY_ID_SUCCESS, payload: res.data.value });
			return res.data.value;
		} else {
			dispatch({ type: actionTypes.FIND_USER_BY_ID_FAILED, payload: res.data.message });
		}
	} catch (err) {
		dispatch({ type: actionTypes.FIND_USER_BY_ID_FAILED, payload: err.message });
	}
};
