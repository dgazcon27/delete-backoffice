import {
	SET_LOCATION,
	SET_NAME_LOCATION,
	OPEN_MODAL_LOCATION,
	CLOSE_MODAL_LOCATION,
	OPEN_ALERT_LOCATION,
	CLOSE_ALERT_LOCATION,
	CLEAN_STATE_LOCATION,
	SET_DESCRIPTION_LOCATION,
	BLOCK_LOCATION,
	DELETE_LOCATION,
} from '../../actions/location/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	locationDescription: '',
	fullcapacity: 0,
	capacity: 0,
	status: 0,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	paginationPageSearch: 0,
	currentPageSearch: 0,
};

const ReducerLocation = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_LOCATION:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				locationDescription: action.payload.locationDescription,
				fullcapacity: action.payload.fullcapacity,
				capacity: action.payload.capacity,
				status: action.payload.status,
			});
		case BLOCK_LOCATION:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case DELETE_LOCATION:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_LOCATION:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_LOCATION:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_LOCATION:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_LOCATION:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME_LOCATION:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION_LOCATION:
			return ({
				...state,
				rolDescription: action.payload.rolDescription,
			});
		case CLEAN_STATE_LOCATION:
			return ({
				...state,
				id: 0,
				name: '',
				rolDescription: '',
			});
		default:
			return state;
	}
};

export default ReducerLocation;
