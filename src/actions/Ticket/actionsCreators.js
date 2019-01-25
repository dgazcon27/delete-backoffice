import {
	OPEN_ASSIGN_MODAL_TICKET,
	CLOSE_ASSIGN_MODAL_TICKET,
	SET_DATA_TICKET_USER,
	SET_ALERT_ASSIGN_TICKET,
	SHOW_LOADING_ASSIGN_TICKET,
} from './actionsTypes';

import { GET_USER_BY_DNI } from '../../queries/purchaseRequest';

import { ASSIGN_TICKET } from '../../queries/ticket';

import { client } from '../../config/configStore';

export const setAlert = isAlert => ({
	type: SET_ALERT_ASSIGN_TICKET,
	payload: {
		isAlert,
		description: SET_ALERT_ASSIGN_TICKET,
	},
});

export const showLoading = isLoading => ({
	type: SHOW_LOADING_ASSIGN_TICKET,
	payload: {
		isLoading,
		description: SHOW_LOADING_ASSIGN_TICKET,
	},
});

export const openTicketModal = (modalType, data) => ({
	type: OPEN_ASSIGN_MODAL_TICKET,
	payload: {
		modalType,
		purchase: data.id,
		description: OPEN_ASSIGN_MODAL_TICKET,
	},
});

export const setDataTicket = data => ({
	type: SET_DATA_TICKET_USER,
	payload: {
		name: `${data.name} ${data.lastName}`,
		email: data.email,
		phone: data.phone,
		id: data.id,
		existUser: data.existUser,
	},
});

export const closeTicketModal = modalType => ({
	type: CLOSE_ASSIGN_MODAL_TICKET,
	payload: {
		modalType,
		description: CLOSE_ASSIGN_MODAL_TICKET,
	},
});

export const assingTicket = data => (
	async (dispatch) => {
		dispatch(closeTicketModal('assign_ticket'));
		dispatch(showLoading(true));
		client
			.mutate({
				mutation: ASSIGN_TICKET,
				variables: data,
			})
			.then(() => {
				dispatch(setAlert(true));
				setTimeout(() => (window.location.reload()), 2000);
			})
			.catch(() => {
			});
	}
);

export const getUserByDNI = dni => (
	async (dispatch) => {
		if (dni) {
			client
				.query({
					query: GET_USER_BY_DNI,
					variables: { dni },
				})
				.then((res) => {
					dispatch(setDataTicket({
						...res.data.purchaseRequestAutocomplete,
						existUser: true,
					}));
				})
				.catch(() => {
				});
		}
	}
);
