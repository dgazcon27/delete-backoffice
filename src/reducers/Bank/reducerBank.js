import {
	SET_ROL,
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	CLEAN_STATE,
	PAGE_UP_BANK,
	PAGE_DOWN_BANK,
	SET_BANK,
	SET_BANK_ACCOUNT,
} from '../../actions/Bank/actionsTypes';

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

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations')).bank) {
	initialState.paginationPageBank = JSON.parse(localStorage.getItem('paginations')).bank || 0;
	initialState.currentPageBank = JSON.parse(localStorage.getItem('paginations')).bank || 0;
} else {
	initialState.paginationPageBank = 0;
	initialState.currentPageBank = 0;
}
const ReducerBank = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_BANK:
			return ({
				...state,
				paginationPageBank: action.payload.paginationPageBank,
				currentPageBank: action.payload.currentPageBank,
			});
		case PAGE_DOWN_BANK:
			return ({
				...state,
				paginationPageBank: action.payload.paginationPageBank,
				currentPageBank: action.payload.currentPageBank,
			});
		case SET_ROL:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				rolDescription: action.payload.rolDescription,
			});
		case SET_BANK:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				currency: action.payload.currency,
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

export default ReducerBank;
