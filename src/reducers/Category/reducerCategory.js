import {
	OPEN_ALERT_CATEGORY,
	CLOSE_ALERT_CATEGORY,
	CLEAN_STATE_CATEGORY,
	BLOCK_CATEGORY,
	EDIT_CATEGORY,
	SET_CATEGORY,
	OPEN_MODAL_CATEGORY,
	CLOSE_MODAL_CATEGORY,
	SET_ALERT_CATEGORY,
} from '../../actions/Category/actionsTypes';

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

const ReducerCategory = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_CATEGORY:
			return ({
				...state,
				paginationPageCurrency: action.payload.paginationPageCurrency,
				currentPageCurrency: action.payload.currentPageCurrency,
			});
		case SET_CATEGORY:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.categoryDescription,
			});
		case BLOCK_CATEGORY:
			return ({
				...state,
				id: action.payload.id,
				statusValue: action.payload.status,
			});
		case OPEN_MODAL_CATEGORY:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_CATEGORY:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_CATEGORY:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_CATEGORY:
			return ({
				...state,
				alertOpen: false,
			});
		case CLEAN_STATE_CATEGORY:
			return ({
				...state,
				id: 0,
				name: '',
				rolDescription: '',
			});
		case SET_ALERT_CATEGORY:
			return ({
				...state,
				isOpen: action.payload.isOpen,
			});
		default:
			return state;
	}
};

export default ReducerCategory;
