import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	SET_RESERVATION,
	PAGE_UP,
	PAGE_DOWN,
	SET_USER,
	SET_HOTEL,
} from './actionsTypes';
import {
	GET_RESERVATIONS,
	GET_USER_BY_DNI,
} from '../../queries/reservation';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};
export const changePage = (currentPage, paginationPage) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations'));
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

export const setUser = purchaseRequest => ({
	type: SET_USER,
	payload: {
		description: SET_USER,
		purchaseRequest: purchaseRequest.purchaseRequest.id,
		client: purchaseRequest.id,
		event: purchaseRequest.purchaseRequest.event.id,
		name: purchaseRequest.name,
		lastName: purchaseRequest.lastName,
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
				.catch(() => {
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
		room: reservation.room.id,
		comment: reservation.comment,
		name: reservation.client.name,
		client: reservation.client.id,
		quantity: reservation.quantity,
		hotel: reservation.room.hotel.id,
		lastName: reservation.client.lastName,
		event: reservation.purchaseRequest.event.id,
		purchaseRequest: reservation.purchaseRequest.id,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});
export const openAlert = alertType => ({
	type: OPEN_ALERT,
	payload: {
		alertType,
		description: OPEN_ALERT,
	},
});
export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: OPEN_ALERT,
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

export const openModal = (modalType, _payment) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
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
			setTimeout(() => (window.location.assign('reservation')), 2000);
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
			setTimeout(() => (window.location.assign('reservation')), 2000);
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

