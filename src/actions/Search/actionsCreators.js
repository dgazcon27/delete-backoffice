import SET_SEARCH from './actionsTypes';

const setSearch = search => ({
	type: SET_SEARCH,
	payload: {
		description: SET_SEARCH,
		search,
	},
});

export default setSearch;
