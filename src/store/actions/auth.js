import * as actionTypes from './actiontypes';
import { signUp, login } from '../services/auth';

export const authSignUp = payload => async dispatch => {
	try {
		dispatch({ action: actionTypes.AUTH_SIGNUP_START });
		const res = await signUp(payload);
		if (res.status === 200) {
			dispatch({ action: actionTypes.AUTH_SIGNUP_SUCCESS, payload: res.data.value });
		} else {
			dispatch({ action: actionTypes.AUTH_SIGNUP_FAILED, payload: res.data.message });
		}
	} catch (err) {
		dispatch({ action: actionTypes.AUTH_SIGNUP_FAILED, payload: err.message });
	}
};

export const authLogin = payload => async dispatch => {
	try {
		dispatch({ type: actionTypes.AUTH_SIGNIN_START });
		const res = await login(payload);
		if (res.status === 200) {
			dispatch({ type: actionTypes.AUTH_SIGNIN_SUCCESS, payload: res.data.value });
		} else {
			dispatch({ type: actionTypes.AUTH_SIGNIN_FAILED, payload: res.data.message });
		}
	} catch (err) {
		dispatch({ type: actionTypes.AUTH_SIGNIN_FAILED, payload: err.message });
	}
};
