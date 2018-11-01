import {
	SET_NAME_BANK_ACCOUNT,
	SET_ROL_BANK_ACCOUNT,
	OPEN_MODAL_BANK_ACCOUNT,
	OPEN_ALERT_BANK_ACCOUNT,
	CLOSE_MODAL_BANK_ACCOUNT,
	CLOSE_ALERT_BANK_ACCOUNT,
	CLEAN_STATE_BANK_ACCOUNT,
	EDIT_BANK_ACCOUNT,
	SET_DESCRIPTION_BANK_ACCOUNT,
	BLOCK_BANK_ACCOUNT,
	DELETE_BANK_ACCOUNT,
	SET_BANK_ACCOUNT,
} from '../../actions/BankAccount/actionsTypes';

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
};

const ReducerBankAccount = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_BANK_ACCOUNT:
			return ({
				...state,
				paginationPageAc: action.payload.paginationPageAc,
				currentPageAc: action.payload.currentPageAc,
			});
		case SET_ROL_BANK_ACCOUNT:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				rolDescription: action.payload.rolDescription,
			});
		case SET_BANK_ACCOUNT:
			return ({
				...state,
				bank: action.payload.bank,
				owner: action.payload.owner,
				id: action.payload.id,
				accountNumber: action.payload.accountNumber,
				currency: action.payload.currency,
				type: action.payload.type,
				comment: action.payload.comment,
			});
		case BLOCK_BANK_ACCOUNT:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case DELETE_BANK_ACCOUNT:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_BANK_ACCOUNT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_BANK_ACCOUNT:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_BANK_ACCOUNT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_BANK_ACCOUNT:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME_BANK_ACCOUNT:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION_BANK_ACCOUNT:
			return ({
				...state,
				rolDescription: action.payload.rolDescription,
			});
		case CLEAN_STATE_BANK_ACCOUNT:
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

export default ReducerBankAccount;
