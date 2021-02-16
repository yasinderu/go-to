import * as actionTypes from '../actions/actiontypes';

const initialState = {
	posts: [],
	error: '',
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
		default:
			return state;
	}
};

export default reducer;
