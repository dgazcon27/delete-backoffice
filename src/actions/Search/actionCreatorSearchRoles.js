import {
	SET_SEARCH,
	SET_SEARCH_USERS,
	SET_SEARCH_ZONES,
	SET_SEARCH_INVITED,
	SET_SEARCH_PURCHASE,
} from './actionsTypesSearchRoles';

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

export const setSearchInvited = search => ({
	type: SET_SEARCH_INVITED,
	payload: {
		description: SET_SEARCH_INVITED,
		search,
	},
});

export const setSearchPurchase = search => ({
	type: SET_SEARCH_PURCHASE,
	payload: {
		description: SET_SEARCH_PURCHASE,
		search,
	},
});

export const setSearchZones = search => ({
	type: SET_SEARCH_ZONES,
	payload: {
		description: SET_SEARCH_ZONES,
		search,
	},
});
