import {
	SET_RESERVATION,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	DELETE_RESERVATION,
	SET_USER,
	SET_HOTEL,
} from '../../actions/Reservation/actionsTypes';

const initialState = {
	id: 0,
	room: 0,
	days: 0,
	name: '',
	event: 0,
	hotel: 0,
	client: 0,
	quantity: 0,
	comment: '',
	lastName: '',
	isOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	alertOpen: false,
	paginationPage: 0,
	purchaseRequest: 0,
	currentPageSearch: 0,
};

const ReducerReservation = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_RESERVATION:
			return ({
				...state,
				id: action.payload.id,
				room: action.payload.room,
				days: action.payload.days,
				name: action.payload.name,
				hotel: action.payload.hotel,
				event: action.payload.event,
				client: action.payload.client,
				comment: action.payload.comment,
				lastName: action.payload.lastName,
				quantity: action.payload.quantity,
				purchaseRequest: action.payload.purchaseRequest,
			});
		case SET_USER:
			return ({
				...state,
				name: action.payload.name,
				event: action.payload.event,
				client: action.payload.client,
				lastName: action.payload.lastName,
				purchaseRequest: action.payload.purchaseRequest,
			});
		case SET_HOTEL:
			return ({
				...state,
				hotel: action.payload.hotel,
			});
		case DELETE_RESERVATION:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL:
			return ({
				...state,
				isOpen: false,
				id: 0,
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
		default:
			return state;
	}
};

export default ReducerReservation;
