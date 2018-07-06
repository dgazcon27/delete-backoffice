import {
	SET_NAME,
	OPEN_MODAL,
	CLOSE_MODAL,
	CLEAN_STATE,
	EDIT_USER_TYPE,
	SET_DESCRIPTION,
	BLOCK_USER_TYPE,
	DELETE_USER_TYPE,
} from '../../actions/userType/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	isOpen: false,
	modalType: '',
	descripcion: '',
	statusValue: 0,
	paginationPage: 1,
};

const ReducerUserType = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_USER_TYPE:
			return ({
				...state,
				isOpen: true,
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
			});
		case SET_NAME:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_DESCRIPTION:
			return ({
				...state,
				descripcion: action.payload.descripcion,
			});
		case CLEAN_STATE:
			return ({
				...state,
				id: 0,
				name: '',
				descripcion: '',
			});
		default:
			return state;
	}
};

export default ReducerUserType;
