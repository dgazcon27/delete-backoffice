import {
	OPEN_ASSIGN_MODAL_TICKET,
	CLOSE_ASSIGN_MODAL_TICKET,
	SET_DATA_TICKET_USER,
	SET_ALERT_ASSIGN_TICKET,
	SHOW_LOADING_ASSIGN_TICKET,
	SET_EXISTING_USER_TICKET,
	SHOW_USER_TICKET_FORM,
	SHOW_MESSAGE_FAILED_TICKET,
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

export const showMessageFailed = searcherFailed => ({
	type: SHOW_MESSAGE_FAILED_TICKET,
	payload: {
		searcherFailed,
		description: SHOW_MESSAGE_FAILED_TICKET,
	},
});

export const setExistingUser = (existUser, viewlist) => ({
	type: SET_EXISTING_USER_TICKET,
	payload: {
		existUser,
		viewlist,
		description: SET_EXISTING_USER_TICKET,
	},
});

export const showLoading = isLoading => ({
	type: SHOW_LOADING_ASSIGN_TICKET,
	payload: {
		isLoading,
		description: SHOW_LOADING_ASSIGN_TICKET,
	},
});

export const showUserForm = (noModal, viewlist, existUser) => ({
	type: SHOW_USER_TICKET_FORM,
	payload: {
		noModal,
		viewlist,
		existUser,
		description: SHOW_USER_TICKET_FORM,
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
					dispatch(setExistingUser(true, true));
					dispatch(setDataTicket(res.data.purchaseRequestAutocomplete));
				})
				.catch(() => {
					dispatch(showMessageFailed(true));
				});
		}
	}
);
