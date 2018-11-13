import {
	SET_NAME_HOTEL,
	OPEN_MODAL_HOTEL,
	OPEN_ALERT_HOTEL,
	CLOSE_MODAL_HOTEL,
	CLOSE_ALERT_HOTEL,
	HT_SET_HOTEL,
} from '../../actions/Hotel/actionsTypes';

const initialState = {
	statusValue: false,
	paginationPage: 0,
	paginationPageHotel: 0,
	currentPage: 0,
	currentPagePreq: 0,
	paginationPageSearch: 0,
	currentPageSearch: 0,
	id: 0,
	name: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
};

const ReducerHotel = (state = initialState, action = {}) => {
	switch (action.type) {
		case OPEN_MODAL_HOTEL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_HOTEL:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_HOTEL:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_HOTEL:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME_HOTEL:
			return ({
				...state,
				name: action.payload.name,
			});
		case HT_SET_HOTEL:
			return ({
				...state,
				id: action.payload.id,
				event: action.payload.event,
				provider: action.payload.provider,
			});
		default:
			return state;
	}
};

export default ReducerHotel;
