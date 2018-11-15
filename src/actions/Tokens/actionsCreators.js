import { SEND_TOKENS, SEND_TOKENS_RESERVATION } from '../../queries/tokens';
import { TK_SET_STATUS, TK_SET_ALERT } from './actionsTypes';
import { client } from '../../config/configStore';

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
