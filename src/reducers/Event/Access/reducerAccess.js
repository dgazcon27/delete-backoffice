import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP,
	PAGE_DOWN,
	SET_EVENT,
	SET_COUNTRIES_STATES,
	SET_WITH_ROOM,
	SET_WITH_TICKET,
	ADD_ACCESS,
	SET_HOTEL,
	AE_SET_NUMBER_ROOM,
	AE_SET_NUMBER_TICKET,
	AE_SET_ACCESS_EVENT,
} from '../../../actions/Event/Access/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	description: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	rolDescription: '',
	statusValue: 0,
	paginationPage: 0,
	states: [],
	withRoom: 'true',
	withTickets: 'true',
	numberRooms: 0,
	numberTickets: 0,
	activeRooms: false,
	activeTickets: false,
	hotel: 0,
	event: 0,
	access: 0,
	room: 0,
	hotelE: null,
	roomE: null,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage


if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).accessEvent || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).accessEvent || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerEventAccess = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case PAGE_DOWN:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case CLOSE_MODAL:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_EVENT:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.description,
				presaleStart: action.payload.presaleStart,
				presaleClosure: action.payload.presaleClosure,
				eventStart: action.payload.eventStart,
				eventClosure: action.payload.eventClosure,
				status: action.payload.status,
				state: action.payload.state,
				country: action.payload.country,
				createdBy: action.payload.createdBy,
			});
		case SET_COUNTRIES_STATES:
			return ({
				...state,
				states: action.payload.states,
			});
		case SET_WITH_ROOM:
			return ({
				...state,
				withRoom: action.payload.withRoom,
				activeRooms: action.payload.activeRooms,
			});
		case AE_SET_NUMBER_TICKET:
			return ({
				...state,
				numberTickets: action.payload.numberTickets,
			});
		case AE_SET_NUMBER_ROOM:
			return ({
				...state,
				numberRooms: action.payload.numberRooms,
				days: action.payload.numberRooms,
			});
		case SET_WITH_TICKET:
			return ({
				...state,
				withTickets: action.payload.withTickets,
				activeTickets: action.payload.activeTickets,
			});
		case SET_HOTEL:
			return ({
				...state,
				hotel: action.payload.hotel,
				roomE: action.payload.roomE,
			});
		case OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case ADD_ACCESS:
			return ({
				...state,
				event: action.payload.event,
			});
		case AE_SET_ACCESS_EVENT:
			return ({
				...state,
				id: action.payload.id,
				withRoom: action.payload.withRoom,
				withTickets: action.payload.withTickets,
				numberRooms: action.payload.numberRooms,
				numberTickets: action.payload.numberTickets,
				access: action.payload.access,
				activeRooms: action.payload.activeRooms,
				activeTickets: action.payload.activeTickets,
				price: action.payload.price,
				days: action.payload.days,
				hotel: action.payload.hotel,
				room: action.payload.room,
				hotelE: action.payload.hotelE,
				roomE: action.payload.roomE,
			});
		default:
			return state;
	}
};

export default ReducerEventAccess;
