import {
	SET_ROL,
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	PAGE_UP,
	PAGE_DOWN,
	EDIT_USER_TYPE,
	SET_DESCRIPTION,
	BLOCK_USER_TYPE,
	SET_PURCHASE_REQ,
	SET_TO_PAY,
} from '../../actions/PurchaseRequest/actionsTypes';


const initialState = {
	id: 0,
	name: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	rolDescription: '',
	statusValue: 0,
	accountNumber: '',
	user: 0,
	access: 0,
	event: 0,
	status: 0,
	comment: 0,
	totalPrice: 0,
	pendingPayment: 0,
	totalPaid: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).purchaseReq || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).purchaseReq || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerPurchaseRequest = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case PAGE_DOWN:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
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
		case SET_PURCHASE_REQ:
			return ({
				...state,
				id: action.payload.id,
				user: action.payload.user,
				access: action.payload.access,
				event: action.payload.event,
				status: action.payload.status,
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

export default ReducerPurchaseRequest;
