import {
	EDIT_USER_TYPE, 
	BLOCK_USER_TYPE, 
	DELETE_USER_TYPE,
	OPEN_MODAL,
	CLOSE_MODAL,
} from '../../actions/userType/actionsTypes';

const initialState = {
	openModal:false,
	modalType:null,
} 

const ReducerUserType = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_USER_TYPE:
			return({
				...state,
				openModal: true,
			});
		case BLOCK_USER_TYPE:
			return({
				...state,
				openModal: true,
			});		
		case DELETE_USER_TYPE:
			return({
				...state,
				openModal: true,
			});
		case OPEN_MODAL:
			return({
				...state,
				modalType: action.payload.modalType,
				openModal: true,
			});
		case CLOSE_MODAL:
			return({
				...state,
				openModal:false,
			});	
		default:
			return state;
	}
};

export default ReducerUserType;
