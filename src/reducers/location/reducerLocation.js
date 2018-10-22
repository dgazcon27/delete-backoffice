import {
	SET_LOCATION,
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	EDIT_LOCATION,
	SET_DESCRIPTION,
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

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
/* if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).userType;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).userType;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
} */

const ReducerLocation = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_LOCATION:
			return ({
				...state,
			});
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
		case SET_NAME:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION:
			return ({
				...state,
				rolDescription: action.payload.rolDescription,
			});
		case CLEAN_STATE:
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
