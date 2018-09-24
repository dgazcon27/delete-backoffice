import {
	PAGE_UP,
	PAGE_DOWN,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
} from '../../actions/List/actionsTypes';

const initialState = {
	paginationPage: 0,
	currentPage: 0,
	paginationPageSearch: 0,
	currentPageSearch: 0,
};

const ReducerPagination = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case PAGE_DOWN:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case SEARCH_PAGE_UP:
			return ({
				...state,
				paginationPageSearch: action.payload.paginationPageSearch,
				currentPageSearch: action.payload.currentPageSearch,
			});
		case SEARCH_PAGE_DOWN:
			return ({
				...state,
				paginationPageSearch: action.payload.paginationPageSearch,
				currentPageSearch: action.payload.currentPageSearch,
			});
		default:
			return state;
	}
};

export default ReducerPagination;
