import {
	OPEN_MODAL_RESERVATION,
	OPEN_ALERT_RESERVATION,
	CLOSE_ALERT_RESERVATION,
	CLOSE_MODAL_RESERVATION,
	RST_CLEAN_STATE,
	SET_RESERVATION,
	SET_USER_RESERVATION,
	RST_SET_MODAL,
	SET_HOTEL,
	RST_SET_LOAD,
} from './actionsTypes';
import {
	GET_RESERVATIONS,
	GET_USER_BY_DNI,
	GET_RESERVATION_BY_ID,
} from '../../queries/reservation';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const setUser = purchaseRequest => ({
	type: SET_USER_RESERVATION,
	payload: {
		description: SET_USER_RESERVATION,
		purchaseRequest: purchaseRequest.purchaseRequest.id,
		nameAccess: purchaseRequest.purchaseRequest.access.name,
		client: purchaseRequest.id,
		event: purchaseRequest.purchaseRequest.event.id,
		name: purchaseRequest.name,
		lastName: purchaseRequest.lastName,
	},
});

export const setModal = (open, isOpen) => ({
	type: RST_SET_MODAL,
	payload: {
		open,
		isOpen,
	},
});


export const getUserByDNI = dni => (
	async (dispatch) => {
		if (dni) {
			client
				.query({
					query: GET_USER_BY_DNI,
					variables: { dni },
				})
				.then((res) => {
					const aux = res.data.reservationAutocomplete;
					dispatch(setUser(aux));
				})
				.catch((err) => {
					if (err) {
						const { message } = err.graphQLErrors[0];
						if (message.indexOf('Cannot return null') >= 0) {
							dispatch(setModal('non_payment', true));
						} else if (message.indexOf('Trying to get property') >= 0) {
							dispatch(setModal('non_exist', true));
						}
					}
				});
		}
	}
);

export const setReservation = reservation => ({
	type: SET_RESERVATION,
	payload: {
		description: SET_RESERVATION,
		id: reservation.id,
		days: reservation.days,
		room: reservation.room.name,
		comment: reservation.comment,
		name: reservation.client.name,
		client: reservation.client.id,
		quantity: reservation.quantity,
		hotel: reservation.room.hotel.provider.name,
		lastName: reservation.client.lastName,
		event: reservation.purchaseRequest.event.id,
		purchaseRequest: reservation.purchaseRequest.id,
	},
});

export const cleanState = () => ({
	type: RST_CLEAN_STATE,
	payload: {
		description: RST_CLEAN_STATE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_RESERVATION,
	payload: {
		description: CLOSE_MODAL_RESERVATION,
	},
});


export const openAlert = alertType => ({
	type: OPEN_ALERT_RESERVATION,
	payload: {
		alertType,
		description: OPEN_ALERT_RESERVATION,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_RESERVATION,
	payload: {
		description: CLOSE_ALERT_RESERVATION,
	},
});

export const setLoad = load => ({
	type: RST_SET_LOAD,
	payload: {
		load,
	},
});

export const blockReservation = (id, statusValue, blockReservationMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockReservationMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteReservation = (id, statusValue, paginationPage, deleteReservationMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteReservationMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_RESERVATIONS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const getReservationById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_RESERVATION_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { reservationId } = res.data;
				dispatch(setReservation(reservationId[0]));
			})
			.catch(() => {
			});
	}
);

export const openModal = (modalType, _payment) => ({
	type: OPEN_MODAL_RESERVATION,
	payload: {
		modalType,
		description: OPEN_MODAL_RESERVATION,
		statusValue: 1,
		name: _payment.id,
		id: _payment.id,
	},
});

export const createReservation = (
	comment,
	clientId,
	purchaseRequest,
	room,
	days,
	quantity,
	paginationPage,
	createReservationMutation,
) => async (dispatch) => {
	dispatch(setLoad(true));
	createReservationMutation({
		variables: {
			comment,
			clientId,
			purchaseRequest,
			room,
			days,
			quantity,
		},
		refetchQueries: [{ query: GET_RESERVATIONS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			dispatch(setLoad(false));
			setTimeout(() => {
				dispatch(cleanState());
				window.location.reload('/reservation');
			}, 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};

export const editReservation = (
	id,
	comment,
	clientId,
	purchaseRequest,
	room,
	days,
	quantity,
	paginationPage,
	editReservationMutation,
) => async (dispatch) => {
	await editReservationMutation({
		variables: {
			id,
			comment,
			clientId,
			purchaseRequest,
			room,
			days,
			quantity,
		},
		refetchQueries: [{ query: GET_RESERVATIONS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('edit'));
			setTimeout(() => (window.location.reload('/reservation')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};

export const getRooms = hotel => ({
	type: SET_HOTEL,
	payload: {
		description: SET_HOTEL,
		hotel,
	},
});

export const createPaymentReservation = (
	reservation,
	amount,
	reference,
	comment,
	type,
	bankAccount,
	createdBy,
	updatedBy,
	paginationPage,
	createReservationPayMutation,
) => async (dispatch) => {
	createReservationPayMutation({
		variables: {
			reservation,
			amount,
			reference,
			comment,
			type,
			bankAccount,
			createdBy,
			updatedBy,
		},
		refetchQueries: [{ query: GET_RESERVATIONS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			setTimeout(() => (window.location.assign('reservation')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
