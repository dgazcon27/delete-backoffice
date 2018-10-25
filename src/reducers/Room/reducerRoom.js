import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	PAGE_UP,
	PAGE_DOWN,
	SET_ROOM,
	SET_EVENT,
} from '../../actions/Room/actionsTypes';


const initialState = {
	id: 0,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	name: '',
	type: '',
	capacity: 0,
	quantityAvariableSell: 0,
	stockReserve: 0,
	costPurchaseNight: 0,
	costNight: 0,
	startNumbering: 0,
	endNumbering: 0,
	active: 1,
	hotelE: 0,
	hotel: 0,
	event: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).purchaseReq || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).purchaseReq || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerRoom = (state = initialState, action = {}) => {
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
		case SET_ROOM:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				type: action.payload.type,
				capacity: action.payload.capacity,
				quantityAvailableSell: action.payload.quantityAvailableSell,
				stockReserve: action.payload.stockReserve,
				costPurchaseNight: action.payload.costPurchaseNight,
				costNight: action.payload.costNight,
				startNumbering: action.payload.startNumbering,
				endNumbering: action.payload.endNumbering,
				hotel: action.payload.hotel,
				event: action.payload.event,
				active: action.payload.active,
			});
		case OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
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
		case CLEAN_STATE:
			return ({
				...state,
				id: 0,
				name: '',
				rolDescription: '',
			});
		case SET_EVENT:
			return ({
				...state,
				event: action.payload.event,
				hotel: action.payload.hotel,
			});
		default:
			return state;
	}
};

export default ReducerRoom;
