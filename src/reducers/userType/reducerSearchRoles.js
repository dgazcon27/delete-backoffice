import { SET_SEARCH } from '../../actions/Search/actionsTypesSearchRoles';

const initialState = {
	query: '',
};

const ReducerSearchRoles = (state = initialState, action = {}) => {
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

export default ReducerSearchRoles;
