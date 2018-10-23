import SET_SEARCH from '../../actions/Search/actionsTypes';

const initialState = {
	query: '',
};

const ReducerSearch = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_SEARCH:
			return ({
				...state,
				query: action.payload.search,
			});
		default:
			return state;
	}
};

export default ReducerSearch;
