import {
	PAGE_UP,
	PAGE_DOWN,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
	RESET_PAGINATION,
} from './actionsTypes';

export const changePage = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.userType = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
		payload: {
			description: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
			paginationPage,
			currentPage: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const changePageSearch = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.zoneSearch = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;
	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPage ? SEARCH_PAGE_UP : SEARCH_PAGE_DOWN,
		payload: {
			description: currentPage < paginationPage ? SEARCH_PAGE_UP : SEARCH_PAGE_DOWN,
			paginationPageSearch: paginationPage,
			currentPageSearch: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const resetPagination = () => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.zoneSearch = 0;
	paginations.userType = 0;
	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: RESET_PAGINATION,
		paginationPage: 0,
		currentPage: 0,
		paginationPageSearch: 0,
		currentPageSearch: 0,
	});
}