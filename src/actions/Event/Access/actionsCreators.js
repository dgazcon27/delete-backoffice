import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	PAGE_UP,
	PAGE_DOWN,
	CLEAN_STATE,
	SET_ACCESS_EVENT,
	SET_WITH_ROOM,
	SET_WITH_TICKET,
	ADD_ACCESS,
	SET_HOTEL,
} from './actionsTypes';

import { GET_ACCESS } from '../../../queries/event';

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

export const openModal = (modalType, event) => {
	const statusValue = event.active ? 1 : 2;
	return {
		type: OPEN_MODAL,
		payload: {
			modalType,
			description: OPEN_MODAL,
			id: event.id,
			statusValue,
		},
	};
};

export const setAccess = (access) => {
	const withRoom = access.withRoom ? 'true' : 'false';
	const withTickets = access.withTickets ? 'true' : 'false';
	let hotel = 0;
	let room = 0;
	let roomE = 0;
	let hotelE = 0;

	if (withRoom === 'false') {
		hotel = 1;
		room = 1;
		hotelE = null;
		roomE = null;
	} else {
		hotel = access.hotel.id;
		hotelE = access.hotel.id;
		room = access.room.id;
		roomE = access.room.id;
	}

	return {
		type: SET_ACCESS_EVENT,
		payload: {
			description: SET_ACCESS_EVENT,
			id: access.id,
			withRoom,
			withTickets,
			numberRooms: access.numberRooms,
			numberTickets: access.numberTickets,
			access: access.access.id,
			price: access.price,
			hotel,
			room,
			hotelE,
			roomE,
		},
	};
};

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

export const addAccess = event => ({
	type: ADD_ACCESS,
	payload: {
		description: ADD_ACCESS,
		event,
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

export const createAccessEvent = (
	withRoomA,
	withTicketsA,
	numberRooms = 0,
	numberTickets = 0,
	price,
	event,
	access,
	hotel = null,
	room = null,
	paginationPage,
	createAccessEventMutation,
) => {
	const withRoom = withRoomA === 'true';
	const withTickets = withTicketsA === 'true';
	const events = event;
	let hotelE = hotel;
	let roomE = room;

	if (!withRoom) {
		hotelE = null;
		roomE = null;
	}

	return (
		async (dispatch) => {
			createAccessEventMutation({
				variables: {
					withRoom,
					withTickets,
					numberRooms,
					numberTickets,
					price,
					event,
					access,
					hotelE,
					roomE,
				},
				refetchQueries: [{
					query: GET_ACCESS, variables: { events, paginationPage },
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
		});
};

export const editAccessEvent = (
	id,
	withRoomA,
	withTicketsA,
	numberRooms = 0,
	numberTickets = 0,
	price,
	event,
	access,
	hotel,
	room,
	paginationPage,
	editAccessEventMutation,
) => {
	const withRoom = withRoomA === 'true';
	const withTickets = withTicketsA === 'true';
	const events = event;
	let hotelE = hotel;
	let roomE = room;

	if (!withRoom) {
		hotelE = null;
		roomE = null;
	}

	return (
		async (dispatch) => {
			editAccessEventMutation({
				variables: {
					id,
					withRoom,
					withTickets,
					numberRooms,
					numberTickets,
					price,
					event,
					access,
					roomE,
					hotelE,
				},
				refetchQueries: [{
					query: GET_ACCESS, variables: { events, paginationPage },
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
		});
};

export const setWithRooms = withRoom => ({
	type: SET_WITH_ROOM,
	payload: {
		withRoom,
		description: SET_WITH_ROOM,
	},
}
);

export const setWithTickets = withTickets => ({
	type: SET_WITH_TICKET,
	payload: {
		withTickets,
		description: SET_WITH_TICKET,
	},
});

export const deleteAccess = (id, events, paginationPage, deleteAccessMutation) => (
	async (dispatch) => {
		await deleteAccessMutation({
			variables: { id },
			refetchQueries: [{ query: GET_ACCESS, variables: { events, paginationPage } }],
		});
		dispatch(closeModal());
	});

export const blockAccess = (id, events, statusValue, paginationPage, blockAccessMutation) => {
	const status = statusValue === 1 ? 0 : 1;
	return async (dispatch) => {
		await blockAccessMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_ACCESS, variables: { events, paginationPage } }],
		});
		dispatch(closeModal());
	};
};

export const getRooms = (hotel) => {
	const roomE = undefined;

	return ({
		type: SET_HOTEL,
		payload: {
			description: SET_HOTEL,
			hotel,
			roomE,
		},
	});
};
