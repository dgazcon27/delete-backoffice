import {
	SET_ZONE,
	SET_NAME_ZONE,
	OPEN_MODAL_ZONE,
	OPEN_ALERT_ZONE,
	CLOSE_MODAL_ZONE,
	CLOSE_ALERT_ZONE,
	CLEAN_STATE_ZONE,
	EDIT_ZONE,
	SET_DESCRIPTION_ZONE,
	BLOCK_ZONE,
	DELETE_ZONE,
} from '../../actions/zone/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	maxcapacity: 0,
	capacity: 0,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	paginationPage: 0,
	currentPageSearch: 0,
};

const ReducerZone = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_ZONE:
			return ({
				...state,
			});
		case SET_ZONE:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				maxcapacity: action.payload.maxcapacity,
				capacity: action.payload.capacity,
			});
		case BLOCK_ZONE:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case DELETE_ZONE:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_ZONE:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_ZONE:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_ZONE:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_ZONE:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME_ZONE:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION_ZONE:
			return ({
				...state,
				rolDescription: action.payload.rolDescription,
			});
		case CLEAN_STATE_ZONE:
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

export default ReducerZone;
