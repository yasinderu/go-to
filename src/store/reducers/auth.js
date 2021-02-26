import * as actionTypes from '../actions/actiontypes';

const initialState = {
	userId: null,
	token: null,
	isLoading: false,
	error: null,
	isAuth: false,
	authRedirectPath: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SIGNUP_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.AUTH_SIGNUP_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.AUTH_SIGNUP_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case actionTypes.AUTH_SIGNIN_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.AUTH_SIGNIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				userId: action.userId,
				token: action.token,
				isAuth: true,
			};
		case actionTypes.AUTH_SIGNIN_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path,
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				userId: null,
				token: null,
				isAuth: false,
				authRedirectPath: null,
			};
		default:
			return state;
	}
};

export default reducer;
