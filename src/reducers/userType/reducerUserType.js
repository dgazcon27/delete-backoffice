import {
	SET_ROL_USER_TYPE,
	SET_NAME_USER_TYPE,
	OPEN_MODAL_USER_TYPER,
	OPEN_ALERT_USER_TYPE,
	CLOSE_MODAL_USER_TYPE,
	CLOSE_ALERT_USER_TYPE,
	CLEAN_STATE_USER_TYPE,
	EDIT_USER_TYPE,
	SET_DESCRIPTION,
	BLOCK_USER_TYPE,
	DELETE_USER_TYPE,
} from '../../actions/userType/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	rolDescription: '',
	statusValue: false,
	paginationPage: 0,
	currentPage: 0,
	paginationPageSearch: 0,
	currentPageSearch: 0,
};

const ReducerUserType = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_USER_TYPE:
			return ({
				...state,
			});
		case SET_ROL_USER_TYPE:
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
		case OPEN_MODAL_USER_TYPER:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_USER_TYPE:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_USER_TYPE:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_USER_TYPE:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_NAME_USER_TYPE:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION:
			return ({
				...state,
				rolDescription: action.payload.rolDescription,
			});
		case CLEAN_STATE_USER_TYPE:
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

export default ReducerUserType;
