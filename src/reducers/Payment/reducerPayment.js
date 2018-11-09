import {
	SET_PAYMENT,
	OPEN_MODAL_PAYMENT,
	OPEN_ALERT_PAYMENT,
	CLOSE_MODAL_PAYMENT,
	CLOSE_ALERT_PAYMENT,
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
};

const ReducerPayment = (state = initialState, action = {}) => {
	switch (action.type) {
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
		case OPEN_MODAL_PAYMENT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_PAYMENT:
			return ({
				...state,
				isOpen: false,
				id: 0,
			});
		case OPEN_ALERT_PAYMENT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_PAYMENT:
			return ({
				...state,
				alertOpen: false,
			});
		default:
			return state;
	}
};

export default ReducerPayment;
