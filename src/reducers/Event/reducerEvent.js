import {
	OPEN_MODAL_EVENT,
	CLOSE_MODAL_EVENT,
	OPEN_ALERT_EVENT,
	CLOSE_ALERT_EVENT,
	SET_EVENT,
	SET_BUDGET,
	SET_COUNTRIES_STATES,
	CLEAN_STATE_COUNTRY,
	SET_PRESALE,
	SET_CLOSE_PRESALE,
	SET_EVENT_START,
	SET_EVENT_CLOSE,
	SET_EVENT_NAME,
	SET_EVENT_DESCRIPTION,
	SET_EVENT_STATUS,
	SET_WITH_ROOM,
	SET_WITH_TICKET,
	OPEN_MODAL_ACCESS,
	ADD_ACCESS,
	SET_ACCESS_EVENT,
	ID_ACCESS_EVENT,
	ADD_PRODUCT,
	PUSH_PRODUCT,
} from '../../actions/Event/actionsTypes';

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
	paginationPageEv: 0,
	states: [],
	withRoom: 'true',
	withTickets: 'true',
	numberRooms: 0,
	numberTickets: 0,
	activeRooms: false,
	activeTickets: false,
	event: 0,
	access: 0,
	pendingPayment: 0,
	products: [],
	totalPaid: 0,
	totalPrice: 0,
	comment: '',
	currency: '',
	alfa: [],
	prod: 0,
	price: 0,
	quant: 0,
};

const ReducerEvent = (state = initialState, action = {}) => {
	switch (action.type) {
		case OPEN_MODAL_EVENT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_EVENT:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_EVENT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_EVENT:
			return ({
				...state,
				alertOpen: false,
			});
		case CLEAN_STATE_COUNTRY:
			return ({
				...state,
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
				state: action.payload.state,
				country: action.payload.country,
				createdBy: action.payload.createdBy,
			});
		case SET_BUDGET:
			return ({
				...state,
				id: action.payload.id,
				pendingPayment:	action.payload.pendingPayment,
				comment: action.payload.comment,
				currency: action.payload.currency,
				products: action.payload.products,
				totalPaid: action.payload.totalPaid,
				totalPrice: action.payload.totalPrice,
			});
		case SET_COUNTRIES_STATES:
			return ({
				...state,
				states: action.payload.states,
			});
		case SET_EVENT_NAME:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_EVENT_DESCRIPTION:
			return ({
				...state,
				description: action.payload.description,
			});
		case SET_EVENT_STATUS:
			return ({
				...state,
				status: action.payload.status,
			});
		case SET_PRESALE:
			return ({
				...state,
				presaleStart: action.payload.presaleStart,
			});
		case ADD_PRODUCT:
			return ({
				...state,
				alfa: action.payload.alfa,
				prod: action.payload.prod,
				price: action.payload.price,
				quant: action.payload.quant,
			});
		case PUSH_PRODUCT:
			return ({
				...state,
			});
		case SET_CLOSE_PRESALE:
			return ({
				...state,
				presaleClosure: action.payload.presaleClosure,
			});
		case SET_EVENT_START:
			return ({
				...state,
				eventStart: action.payload.eventStart,
			});
		case SET_EVENT_CLOSE:
			return ({
				...state,
				eventClosure: action.payload.eventClosure,
			});
		case SET_WITH_ROOM:
			return ({
				...state,
				withRoom: action.payload.withRoom,
				activeRooms: action.payload.activeRooms,
			});
		case SET_WITH_TICKET:
			return ({
				...state,
				withTickets: action.payload.withTickets,
				activeTickets: action.payload.activeTickets,
			});
		case OPEN_MODAL_ACCESS:
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
		case ID_ACCESS_EVENT:
			return ({
				...state,
				idAccessEvent: action.payload.idAccessEvent,
			});
		case SET_ACCESS_EVENT:
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
			});
		default:
			return state;
	}
};

export default ReducerEvent;
