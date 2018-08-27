import { SET_SEARCH_USERS } from '../../actions/Search/actionsTypesSearchRoles';

const initialState = {
	query: '',
};

const ReducerSearchUsers = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_SEARCH_USERS:
			return ({
				...state,
				query: action.payload.search,
			});
		default:
			return state;
	}
};

export default ReducerSearchUsers;
