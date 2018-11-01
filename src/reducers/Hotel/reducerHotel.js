import {
	SET_ROL,
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	PAGE_UP_HOTEL,
	PAGE_DOWN_HOTEL,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
	EDIT_USER_TYPE,
	SET_DESCRIPTION,
	BLOCK_USER_TYPE,
	DELETE_USER_TYPE,
} from '../../actions/Hotel/actionsTypes';

const initialState = {
	statusValue: false,
	paginationPage: 0,
	paginationPageHotel: 0,
	currentPage: 0,
	currentPagePreq: 0,
	paginationPageSearch: 0,
	currentPageSearch: 0,
	newUserModal: false,
	id: 0,
	idUser: 0,
	name: '',
	nameUser: '',
	lastName: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	rolDescription: '',
	accountNumber: '',
	user: 0,
	access: [],
	event: 0,
	status: 0,
	comment: 0,
	totalPrice: 0,
	pendingPayment: 0,
	totalPaid: 0,
	dni: 0,
	phone: '',
	email: '',
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).hotel;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).hotel;
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
		case EDIT_USER_TYPE:
			return ({
				...state,
			});
		case SET_ROL:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				rolDescription: action.payload.rolDescription,
			});
		case BLOCK_USER_TYPE:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case DELETE_USER_TYPE:
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

export default ReducerHotel;
