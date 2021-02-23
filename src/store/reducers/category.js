import * as actionTypes from '../actions/actiontypes';

const initialState = {
	categories: null,
	isLoading: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CATEGORY_START:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.FETCH_CATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				categories: action.payload,
			};
		case actionTypes.FETCH_CATEGORY_FALIED:
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
