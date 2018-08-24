import { SET_SEARCH, SET_SEARCH_USERS } from './actionsTypesSearchRoles';

export const setSearch = search => ({
	type: SET_SEARCH,
	payload: {
		description: SET_SEARCH,
		search,
	},
});

export const setSearchUsers = search => ({
	type: SET_SEARCH_USERS,
	payload: {
		description: SET_SEARCH_USERS,
		search,
	},
});
