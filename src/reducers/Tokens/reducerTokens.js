import {
	TK_SET_STATUS,
	TK_SET_ALERT,
	PAGE_UP_TOKENS,
	PAGE_DOWN_TOKENS,
} from '../../actions/Tokens/actionsTypes';

const initialState = {
	id: 0,
	currentPage: 0,
	paginationPage: 0,
	pagSearchTokens: 0,
	currentPageSearchTokens: 0,
	load: 'list',
	description: '',
	open: false,
};

if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).tokens || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).tokens || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
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
		case PAGE_UP_TOKENS:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case PAGE_DOWN_TOKENS:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		default:
			return state;
	}
};
export default ReducerTokens;
