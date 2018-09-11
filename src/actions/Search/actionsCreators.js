import { SET_SEARCH } from './actionsTypes';

export const setSearch = search => ({
	type: SET_SEARCH,
	payload: {
		description: SET_SEARCH,
		search,
	},
});
