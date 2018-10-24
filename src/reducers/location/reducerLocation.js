import {
	SET_LOCATION,
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	PAGE_UP_LOC,
	PAGE_DOWN_LOC,
	EDIT_LOCATION,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
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
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPageLoc = JSON.parse(localStorage.getItem('paginations')).location || 0;
	initialState.currentPageLoc = JSON.parse(localStorage.getItem('paginations')).location || 0;
} else {
	initialState.paginationPageLoc = 0;
	initialState.currentPageLoc = 0;
}

const ReducerLocation = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_LOC:
			return ({
				...state,
				paginationPageLoc: action.payload.paginationPageLoc,
				currentPageLoc: action.payload.currentPageLoc,
			});
		case PAGE_DOWN_LOC:
			return ({
				...state,
				paginationPageLoc: action.payload.paginationPageLoc,
				currentPageLoc: action.payload.currentPageLoc,
			});
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
