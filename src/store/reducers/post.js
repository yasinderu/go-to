import * as actionTypes from '../actions/actiontypes';

const initialState = {
	posts: null,
	error: null,
	isLoading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_POSTS_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.FETCH_POSTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				posts: action.payload,
			};
		case actionTypes.FETCH_POSTS_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case actionTypes.FETCH_POSTS_BY_USER_ID_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.FETCH_POSTS_BY_USER_ID_SUCCESS:
			return {
				...state,
				isLoading: false,
				posts: action.payload,
			};
		case actionTypes.FETCH_POSTS_BY_USER_ID_FAILED:
			return {
				...state,
				isLoading: false,
				posts: null,
				error: action.payload,
			};
		case actionTypes.FETCH_POST_BY_CATEGORY_AND_USER_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.FETCH_POST_BY_CATEGORY_AND_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				posts: action.payload,
			};
		case actionTypes.FETCH_POST_BY_CATEGORY_AND_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				posts: null,
			};
		default:
			return state;
	}
};

export default reducer;
