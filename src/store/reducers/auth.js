import * as actionTypes from '../actions/actiontypes';

const initialState = {
	user: {},
	token: '',
	isLoading: false,
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action) {
		case actionTypes.AUTH_SIGNUP_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.AUTH_SIGNUP_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
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
				user: action.payload,
			};
		case actionTypes.AUTH_SIGNIN_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
