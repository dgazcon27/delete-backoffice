import {
	TK_SET_STATUS,
	TK_SET_ALERT,
} from '../../actions/Tokens/actionsTypes';

const initialState = {
	id: 0,
	currentPageTokens: 0,
	paginationTokens: 0,
	pagSearchTokens: 0,
	currentPageSearchTokens: 0,
	load: 'list',
	description: '',
	open: false,
};

if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationTokens = JSON.parse(localStorage.getItem('paginations')).tokens || 0;
	initialState.currentPageTokens = JSON.parse(localStorage.getItem('paginations')).tokens || 0;
} else {
	initialState.paginationTokens = 0;
	initialState.currentPageTokens = 0;
}
const ReducerTokens = (state = initialState, action = {}) => {
	switch (action.type) {
		case TK_SET_STATUS:
			return ({
				...state,
				load: action.payload.load,
			});
		case TK_SET_ALERT:
			return ({
				...state,
				open: action.payload.open,
			});
		default:
			return state;
	}
};
export default ReducerTokens;
