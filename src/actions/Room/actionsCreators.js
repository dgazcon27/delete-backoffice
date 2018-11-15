import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	PAGE_UP,
	PAGE_DOWN,
	CLEAN_STATE,
	SET_ROOM,
	SET_EVENT,
} from './actionsTypes';

import { GET_ROOMS } from '../../queries/room';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const openAlert = alertType => ({
	type: OPEN_ALERT,
	payload: {
		alertType,
		description: OPEN_ALERT,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const openModal = (modalType, room) => {
	const statusValue = room.active ? 1 : 2;
	return {
		type: OPEN_MODAL,
		payload: {
			modalType,
			description: OPEN_MODAL,
			id: room.id,
			name: room.name,
			statusValue,
		},
	};
};

export const setRoom = room => ({
	type: SET_ROOM,
	payload: {
		description: SET_ROOM,
		id: room.id,
		name: room.name,
		type: room.type,
		capacity: room.capacity,
		quantityAvailableSell: room.quantityAvailableSell,
		stockReserve: room.stockReserve,
		costPurchaseNight: room.costPurchaseNight,
		costNight: room.costNight,
		startNumbering: room.startNumbering,
		endNumbering: room.endNumbering,
		hotel: room.hotel.id,
		event: room.event.id,
		active: room.active,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: CLOSE_ALERT,
	},
});

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

export const createRoom = (
	name,
	type,
	quantityAvailableSell,
	stockReserve,
	costPurchaseNight,
	costNight,
	startNumbering,
	endNumbering,
	hotel,
	event,
	paginationPage,
	createRoomMutation,
) => {
	let capacity;
	switch (type) {
		case 'Individual':
			capacity = 1;
			break;
		case 'Double':
			capacity = 2;
			break;
		case 'Triple':
			capacity = 3;
			break;
		case 'Quadruple':
			capacity = 4;
			break;
		default:
			break;
	}
	return async (dispatch) => {
		createRoomMutation({
			variables: {
				name,
				type,
				capacity,
				quantityAvailableSell,
				stockReserve,
				costPurchaseNight,
				costNight,
				startNumbering,
				endNumbering,
				hotel,
				event,
			},
			refetchQueries: [{
				query: GET_ROOMS, variables: { paginationPage },
			}],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.history.assign('/room')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
};

export const editRoom = (
	id,
	name,
	type,
	quantityAvailableSell,
	stockReserve,
	costPurchaseNight,
	costNight,
	startNumbering,
	endNumbering,
	hotel,
	event,
	paginationPage,
	editRoomMutation,
) => {
	let capacity;
	switch (type) {
		case 'Individual':
			capacity = 1;
			break;
		case 'Double':
			capacity = 2;
			break;
		case 'Triple':
			capacity = 3;
			break;
		case 'Quadruple':
			capacity = 4;
			break;
		default:
			break;
	}
	return async (dispatch) => {
		editRoomMutation({
			variables: {
				id,
				name,
				type,
				capacity,
				quantityAvailableSell,
				stockReserve,
				costPurchaseNight,
				costNight,
				startNumbering,
				endNumbering,
				hotel,
				event,
			},
			refetchQueries: [{
				query: GET_ROOMS, variables: { paginationPage },
			}],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.history.back()), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
};
export const deleteRoom = (id, events, paginationPage, deleteRoomMutation) => (
	async (dispatch) => {
		await deleteRoomMutation({
			variables: { id },
			refetchQueries: [{ query: GET_ROOMS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
	});

export const blockRoom = (id, statusValue, paginationPage, blockRoomMutation) => {
	const status = statusValue === 1 ? 0 : 1;
	return async (dispatch) => {
		await blockRoomMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_ROOMS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
	};
};

export const getHotels = (event) => {
	const hotel = 0;
	return ({
		type: SET_EVENT,
		payload: {
			description: SET_EVENT,
			event,
			hotel,
		},
	});
};
