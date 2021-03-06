import {
	SET_ROL,
	SET_NAME,
	OPEN_MODAL_PURCHASE_REQ,
	OPEN_ALERT_PURCHASE_REQ,
	CLOSE_MODAL_PURCHASE_REQ,
	CLOSE_ALERT_PURCHASE_REQ,
	CLEAN_STATE,
	EDIT_USER_TYPE,
	SET_DESCRIPTION,
	BLOCK_USER_TYPE,
	SET_PURCHASE_REQ,
	SET_TO_PAY,
	SET_ACCESS_EVENT,
	PR_SET_USER,
	MODAL_USER,
	CLOSE_MODAL_USER,
	SET_PAGINATION_PURCHASE,
} from '../../actions/PurchaseRequest/actionsTypes';

import { SET_SEARCH_PURCHASE } from '../../actions/Search/actionsTypesSearchRoles';

const initialState = {
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
	statusValue: 0,
	accountNumber: '',
	user: 0,
	access: [],
	event: 0,
	status: 0,
	comment: ' ',
	totalPrice: 0,
	pendingPayment: 0,
	totalPaid: 0,
	dni: 0,
	phone: '',
	email: '',
	query: '',
	currentPageSearch: 0,
	paginationPageSearch: 0,
	paginationPage: 0,
	currentPage: 0,
};

if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).purchase || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).purchase || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerPurchaseRequest = (state = initialState, action = {}) => {
	switch (action.type) {
		case MODAL_USER:
			return ({
				...state,
				newUserModal: true,
			});
		case CLOSE_MODAL_USER:
			return ({
				...state,
				newUserModal: false,
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
		case SET_SEARCH_PURCHASE:
			return ({
				...state,
				query: action.payload.search,
			});
		case SET_PURCHASE_REQ:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				lastName: action.payload.lastName,
				phone: action.payload.phone,
				email: action.payload.email,
				user: action.payload.user,
				accessName: action.payload.access,
				event: action.payload.event,
				comment: action.payload.comment,
			});
		case SET_TO_PAY:
			return ({
				...state,
				id: action.payload.id,
			});
		case BLOCK_USER_TYPE:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case OPEN_MODAL_PURCHASE_REQ:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
			});
		case CLOSE_MODAL_PURCHASE_REQ:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_PURCHASE_REQ:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_PURCHASE_REQ:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME:
			return ({
				...state,
				name: action.payload.name,
			});
		case PR_SET_USER:
			return ({
				...state,
				idUser: action.payload.aux.id,
				nameUser: action.payload.aux.name,
				lastName: action.payload.aux.lastName,
				phone: action.payload.aux.phone,
				dni: action.payload.aux.dni,
				email: action.payload.aux.email,
			});
		case SET_ACCESS_EVENT:
			return ({
				...state,
				access: action.payload.access,
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

		case SET_PAGINATION_PURCHASE:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		default:
			return state;
	}
};

export default ReducerPurchaseRequest;
