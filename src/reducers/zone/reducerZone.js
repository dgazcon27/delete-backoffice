import {
	SET_ZONE,
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	PAGE_UP_ZONE,
	PAGE_DOWN_ZONE,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
	EDIT_ZONE,
	SET_DESCRIPTION,
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
	paginationPageZone: 0,
	currentPageSearch: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations')).zone) {
	initialState.paginationPageZone = JSON.parse(localStorage.getItem('paginations')).zone;
	initialState.currentPageZone = JSON.parse(localStorage.getItem('paginations')).zone;
} else {
	initialState.paginationPageZone = 0;
	initialState.currentPageZone = 0;
}

const ReducerZone = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_ZONE:
			return ({
				...state,
				paginationPageZone: action.payload.paginationPageZone,
				currentPageZone: action.payload.currentPageZone,
			});
		case PAGE_DOWN_ZONE:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPageZone: action.payload.currentPageZone,
			});
		case SEARCH_PAGE_UP:
			return ({
				...state,
				paginationPageSearch: action.payload.paginationPageSearch,
				currentPageSearch: action.payload.currentPageSearch,
			});
		case SEARCH_PAGE_DOWN:
			return ({
				...state,
				paginationPageSearch: action.payload.paginationPageSearch,
				currentPageSearch: action.payload.currentPageSearch,
			});
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

export default ReducerZone;
