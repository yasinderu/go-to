import * as actionTypes from './actiontypes';
import { signUp, login } from '../services/auth';

export const authSignUp = payload => async dispatch => {
	try {
		dispatch({ type: actionTypes.AUTH_SIGNUP_START });
		const res = await signUp(payload);
		if (res.status === 200) {
			dispatch({ type: actionTypes.AUTH_SIGNUP_SUCCESS, payload: res.data.value });
		} else {
			console.log('error', res.data);
			dispatch({ type: actionTypes.AUTH_SIGNUP_FAILED, payload: res.data.message });
		}
	} catch (err) {
		console.log(err);
		dispatch({ type: actionTypes.AUTH_SIGNUP_FAILED, payload: err.message });
	}
};

export const authLogin = payload => async dispatch => {
	try {
		dispatch({ type: actionTypes.AUTH_SIGNIN_START });
		const res = await login(payload);
		if (res.status === 200) {
			dispatch({
				type: actionTypes.AUTH_SIGNIN_SUCCESS,
				userId: res.data.value.id,
				token: res.data.token.value,
			});
			const expirationDate = new Date(
				new Date().getTime() + res.data.token.expiresIn * 1000
			);
			localStorage.setItem('token', res.data.token.value);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', res.data.value.id);
		} else {
			dispatch({ type: actionTypes.AUTH_SIGNIN_FAILED, payload: res.data.message });
		}
	} catch (err) {
		dispatch({ type: actionTypes.AUTH_SIGNIN_FAILED, payload: err.message });
	}
};

export const setAuthRedirect = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const logout = () => {
	console.log('loging out');
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expiresTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expiresTime * 1000);
	};
};

export const authCheckState = () => dispatch => {
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	if (!token) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (expirationDate <= new Date()) {
			dispatch(logout());
		} else {
			dispatch({
				type: actionTypes.AUTH_SIGNIN_SUCCESS,
				userId: userId,
				token: token,
			});
			dispatch(
				checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
			);
		}
	}
};
