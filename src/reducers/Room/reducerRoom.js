import {
	OPEN_MODAL_ROOM,
	OPEN_ALERT_ROOM,
	CLOSE_MODAL_ROOM,
	CLOSE_ALERT_ROOM,
	CLEAN_STATE_ROOM,
	SET_ROOM,
	SET_EVENT_ROOM,
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

const ReducerRoom = (state = initialState, action = {}) => {
	switch (action.type) {
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
		case OPEN_MODAL_ROOM:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_ROOM:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_ROOM:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_ROOM:
			return ({
				...state,
				alertOpen: false,
			});
		case CLEAN_STATE_ROOM:
			return ({
				...state,
				id: 0,
				name: '',
				rolDescription: '',
			});
		case SET_EVENT_ROOM:
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
