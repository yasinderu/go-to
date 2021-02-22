import * as actiontypes from '../actions/actiontypes';

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actiontypes.FIND_USER_BY_ID_START:
			return {
				...state,
				isLoading: true,
			};
		case actiontypes.FIND_USER_BY_ID_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};
		case actiontypes.FIND_USER_BY_ID_FAILED:
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
