import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP_HOTEL,
	PAGE_DOWN_HOTEL,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
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

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPageHotel = JSON.parse(localStorage.getItem('paginations')).hotel || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).hotel || 0;
} else {
	initialState.paginationPageHotel = 0;
	initialState.currentPage = 0;
}

const ReducerHotel = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_HOTEL:
			return ({
				...state,
				paginationPageHotel: action.payload.paginationPageHotel,
				currentPage: action.payload.currentPage,
			});
		case PAGE_DOWN_HOTEL:
			return ({
				...state,
				paginationPageHotel: action.payload.paginationPageHotel,
				currentPage: action.payload.currentPage,
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
