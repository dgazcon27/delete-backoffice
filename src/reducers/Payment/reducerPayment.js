import {
	SET_PAYMENT,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP_PAY,
	PAGE_DOWN_PAY,
	EDIT_PAYMENT,
	DELETE_PAYMENT,
} from '../../actions/Payment/actionsTypes';

const initialState = {
	id: 0,
	purchaseRequest: 0,
	amount: '',
	reference: '',
	comment: '',
	type: '',
	bankAccount: 0,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	paginationPagePay: 0,
	currentPageSearch: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPagePay = JSON.parse(localStorage.getItem('paginations')).payment || 0;
	initialState.currentPagePay = JSON.parse(localStorage.getItem('paginations')).payment || 0;
} else {
	initialState.paginationPagePay = 0;
	initialState.currentPagePay = 0;
}

const ReducerPayment = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_PAY:
			return ({
				...state,
				paginationPagePay: action.payload.paginationPagePay,
				currentPagePay: action.payload.currentPagePay,
			});
		case PAGE_DOWN_PAY:
			return ({
				...state,
				paginationPagePay: action.payload.paginationPagePay,
				currentPagePay: action.payload.currentPagePay,
			});
		case EDIT_PAYMENT:
			return ({
				...state,
			});
		case SET_PAYMENT:
			return ({
				...state,
				id: action.payload.id,
				purchaseRequest: action.payload.purchaseRequest,
				amount: action.payload.amount,
				reference: action.payload.reference,
				comment: action.payload.comment,
				type: action.payload.type,
				bankAccount: action.payload.bankAccount,
			});
		case DELETE_PAYMENT:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL:
			return ({
				...state,
				isOpen: false,
				id: 0,
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
		default:
			return state;
	}
};

export default ReducerPayment;
