import {
	SET_NAME_BANK,
	OPEN_ALERT_BANK,
	CLOSE_ALERT_BANK,
	CLEAN_STATE_BANK,
	SET_DESCRIPTION_BANK,
	BLOCK_BANK,
} from '../../actions/Bank/actionsTypes';

import {
	EDIT_CURRENCY,
	DELETE_CURRENCY,
	OPEN_MODAL_CURRENCY,
	SET_CURRENCY,
	CLOSE_MODAL_CURRENCY,
} from '../../actions/Currency/actionsTypes';


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
	description: '',
};

const ReducerCurrency = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_CURRENCY:
			return ({
				...state,
				paginationPageCurrency: action.payload.paginationPageCurrency,
				currentPageCurrency: action.payload.currentPageCurrency,
			});
		case SET_CURRENCY:
			return ({
				...state,
				id: action.payload.id,
				description: action.payload.description,
			});
		case BLOCK_BANK:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case DELETE_CURRENCY:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_CURRENCY:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_CURRENCY:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_BANK:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_BANK:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME_BANK:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION_BANK:
			return ({
				...state,
				rolDescription: action.payload.rolDescription,
			});
		case CLEAN_STATE_BANK:
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

export default ReducerCurrency;
