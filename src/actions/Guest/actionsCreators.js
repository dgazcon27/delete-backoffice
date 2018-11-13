import { checkMessageError } from '../sharedActions/sharedActions';
import {
	OPEN_MODAL_GUEST,
	OPEN_ALERT_GUEST,
	CLOSE_ALERT_GUEST,
	CLOSE_MODAL_GUEST,
	SET_GUEST,
} from './actionsTypes';

import {
	GET_GUEST_BY_ID,
	GET_GUESTS,
} from '../../queries/guest';

import { client } from '../../config/configStore';

export const setGuest = guest => ({
	type: SET_GUEST,
	payload: {
		description: SET_GUEST,
		id: guest.id,
		name: guest.user.name,
		lastName: guest.user.lastName,
		email: guest.user.email,
		phone: guest.user.phone,
		dni: guest.user.dni.toString(),
		citizenship: guest.user.citizenship.id,
		event: guest.event.id,
		status: guest.status.id,
		access: guest.access.id,
		role: guest.user.role.id,
		typeInvited: guest.typeInvited.id,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_GUEST,
	payload: {
		alertType,
		description: OPEN_ALERT_GUEST,
	},
});

export const openModal = (modalType, obj) => ({
	type: OPEN_MODAL_GUEST,
	payload: {
		modalType,
		description: OPEN_MODAL_GUEST,
		name: obj.name,
		id: obj.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_GUEST,
	payload: {
		description: CLOSE_MODAL_GUEST,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_GUEST,
	payload: {
		description: CLOSE_ALERT_GUEST,
	},
});

export const createInvited = (invited, create) => (
	async (dispatch) => {
		create({
			variables: invited,
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('/guests')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);

export const updateGuest = (guest, update) => (
	async (dispatch) => {
		update({
			variables: guest,
		})
			.then((data) => {
				dispatch(openAlert('creado'));
				dispatch(setGuest(data.data.updateInvited));
				setTimeout(() => (window.location.assign('/guests')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});

export const deleteInvited = (obj, paginationPage, deleteMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteMutation({
			variables: { id },
			refetchQueries: [{ query: GET_GUESTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const getGuestById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_GUEST_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { invited } = res.data;
				dispatch(setGuest(invited));
			})
			.catch(() => {});
	}
);
