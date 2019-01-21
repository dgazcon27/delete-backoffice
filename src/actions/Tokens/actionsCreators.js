import { SEND_TOKENS, SEND_TOKENS_RESERVATION } from '../../queries/tokens';
import { TK_SET_STATUS, TK_SET_ALERT, PAGE_UP_TOKENS, PAGE_DOWN_TOKENS } from './actionsTypes';
import { client } from '../../config/configStore';


export const changePage = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.tokens = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;
	localStorage.setItem('paginations', JSON.stringify(paginations));
	return ({
		type: currentPage < paginationPage ? PAGE_UP_TOKENS : PAGE_DOWN_TOKENS,
		payload: {
			description: currentPage < paginationPage ? PAGE_UP_TOKENS : PAGE_UP_TOKENS,
			paginationPage,
			currentPage: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};


export const setStatus = load => ({
	type: TK_SET_STATUS,
	payload: {
		load,
	},
});

export const setAlert = open => ({
	type: TK_SET_ALERT,
	payload: {
		open,
	},
});

export const sendTokens = () => (
	async (dispatch) => {
		dispatch(setStatus('sending'));
		client
			.query({
				query: SEND_TOKENS,
			})
			.then(() => {
				dispatch(setStatus('sent'));
				dispatch(setAlert(true));
				setTimeout(() => (window.location.reload('/tokens')), 2000);
			});
	}
);

export const sendTokensReservation = () => (
	async (dispatch) => {
		dispatch(setStatus('sending'));
		client
			.query({
				query: SEND_TOKENS_RESERVATION,
			})
			.then(() => {
				dispatch(setStatus('sent'));
				dispatch(setAlert(true));
				setTimeout(() => (window.location.reload('/tokens-reservation')), 2000);
			});
	}
);
