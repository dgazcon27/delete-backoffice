import {
	SET_NAME_BANK,
	SET_ROL_BANK,
	OPEN_MODAL_BANK,
	OPEN_ALERT_BANK,
	CLOSE_MODAL_BANK,
	CLOSE_ALERT_BANK,
	CLEAN_STATE_BANK,
	EDIT_BANK,
	SET_DESCRIPTION_BANK,
	BLOCK_BANK,
	DELETE_BANK,
	SET_BANK,
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

const ReducerBank = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_BANK:
			return ({
				...state,
				paginationPageBank: action.payload.paginationPageBank,
				currentPageBank: action.payload.currentPageBank,
			});
		case SET_ROL_BANK:
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
		case BLOCK_BANK:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case DELETE_BANK:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_BANK:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_BANK:
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

export default ReducerBank;
