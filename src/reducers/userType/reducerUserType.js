import {
	EDIT_USER_TYPE,
	BLOCK_USER_TYPE,
	DELETE_USER_TYPE,
	OPEN_MODAL,
	CLOSE_MODAL,
} from '../../actions/userType/actionsTypes';

const initialState = {
	isOpen: false,
	modalType: '',
	name: '',
	id: 0,
	statusValue: 0,
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
		default:
			return state;
	}
};

export default ReducerUserType;
