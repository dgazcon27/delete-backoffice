import { SET_SEARCH_ZONES } from '../../actions/Search/actionsTypesSearchRoles';

const initialState = {
	query: '',
};

const ReducerSearchZone = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_SEARCH_ZONES:
			return ({
				...state,
				query: action.payload.search,
			});
		default:
			return state;
	}
};

export default ReducerSearchZone;
