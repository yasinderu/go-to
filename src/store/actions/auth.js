import * as actionTypes from './actiontypes';
import { signUp, login } from '../services/auth';
import { getCookie, setCookie, deleteCookie } from '../../utils/Cookies';

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
			const expirationDate = new Date(
				new Date().getTime() + res.data.token.expiresIn * 1000
			);
			setCookie('token', res.data.token.value);
			setCookie('expirationDate', expirationDate);
			setCookie('userId', res.data.value.id);
			dispatch({
				type: actionTypes.AUTH_SIGNIN_SUCCESS,
				userId: res.data.value.id,
				token: res.data.token.value,
			});
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
	deleteCookie('token');
	deleteCookie('expirationDate');
	deleteCookie('userId');
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
	const token = getCookie('token');
	const userId = getCookie('userId');
	if (!token) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(getCookie('expirationDate'));
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
