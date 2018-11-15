import {
	SET_RESERVATION,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP,
	PAGE_DOWN,
	RST_CLEAN_STATE,
	DELETE_RESERVATION,
	SET_USER_RESERVATION,
	SET_HOTEL,
	RST_SET_MODAL,
	RST_SET_LOAD,
} from '../../actions/Reservation/actionsTypes';

const initialState = {
	id: 0,
	room: 0,
	days: 0,
	open: '',
	load: false,
	name: '',
	event: 0,
	hotel: 0,
	client: 0,
	quantity: 0,
	comment: '',
	lastName: '',
	nameAccess: '',
	isOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	alertOpen: false,
	paginationPage: 0,
	purchaseRequest: 0,
	currentPageSearch: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).reservation || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).reservation || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerReservation = (state = initialState, action = {}) => {
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
				currentPage: action.payload.currentPage,
				paginationPage: action.payload.paginationPage,
			});
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
		case SET_USER_RESERVATION:
			return ({
				...state,
				name: action.payload.name,
				event: action.payload.event,
				client: action.payload.client,
				lastName: action.payload.lastName,
				purchaseRequest: action.payload.purchaseRequest,
				nameAccess: action.payload.nameAccess,
			});
		case RST_SET_MODAL:
			return ({
				...state,
				open: action.payload.open,
				isOpen: action.payload.isOpen,
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
		case RST_SET_LOAD:
			return ({
				...state,
				load: action.payload.load,
			});
		case RST_CLEAN_STATE:
			return ({
				...state,
				id: 0,
				room: 0,
				days: 0,
				open: '',
				name: '',
				event: 0,
				hotel: 0,
				load: false,
				client: 0,
				quantity: 0,
				comment: '',
				lastName: '',
				nameAccess: '',
				isOpen: false,
				alertType: '',
				modalType: '',
				statusValue: 0,
				alertOpen: false,
				paginationPage: 0,
				purchaseRequest: 0,
				currentPageSearch: 0,
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
