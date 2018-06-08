import {
	EDIT_USER, 
	BLOCK_USER, 
	DELETE_USER
} from '../../actions/users/actionsTypes';

const initialState = {
}
const ReducerUser = (state = initialState, action = {} ) => {
	switch(action.type) {
		case EDIT_USER:
			return ({
				...state,
			});
		case BLOCK_USER:
			return ({
				...state,
			});		
		case DELETE_USER:
			return ({
				...state,
			});
		default:
			return state;
		}
};

export default ReducerUser;
