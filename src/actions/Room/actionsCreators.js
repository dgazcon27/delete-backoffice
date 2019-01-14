import {
	OPEN_MODAL_ROOM,
	OPEN_ALERT_ROOM,
	CLOSE_ALERT_ROOM,
	CLOSE_MODAL_ROOM,
	CLEAN_STATE_ROOM,
	SET_ROOM,
	SET_EVENT_ROOM,
} from './actionsTypes';

import { client } from '../../config/configStore';

import { GET_ROOMS, GET_ROOM_BY_ID } from '../../queries/room';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const openAlert = alertType => ({
	type: OPEN_ALERT_ROOM,
	payload: {
		alertType,
		description: OPEN_ALERT_ROOM,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE_ROOM,
	payload: {
		description: CLEAN_STATE_ROOM,
	},
});

export const openModal = (modalType, room) => {
	const statusValue = room.active ? 1 : 2;
	return {
		type: OPEN_MODAL_ROOM,
		payload: {
			modalType,
			description: OPEN_MODAL_ROOM,
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

export const getRoomById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_ROOM_BY_ID,
				variables: { id },
			})
			.then((res) => {
				dispatch(setRoom(res.data.roomsById));
			})
			.catch(() => {});
	}
);

export const closeModal = () => ({
	type: CLOSE_MODAL_ROOM,
	payload: {
		description: CLOSE_MODAL_ROOM,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_ROOM,
	payload: {
		description: CLOSE_ALERT_ROOM,
	},
});

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
				setTimeout(() => (window.location.assign('/room')), 2000);
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

export const deleteRoom = (obj, paginationPage, deleteRoomMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteRoomMutation({
			variables: { id },
			refetchQueries: [{ query: GET_ROOMS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
	};
};

export const blockRoom = (obj, blockRoomMutation) => {
	const { id } = obj;
	const status = obj.statusValue === 1 ? 0 : 1;
	return async (dispatch) => {
		await blockRoomMutation({
			variables: { id, status },
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const getHotels = (event) => {
	const hotel = 0;
	return ({
		type: SET_EVENT_ROOM,
		payload: {
			description: SET_EVENT_ROOM,
			event,
			hotel,
		},
	});
};
