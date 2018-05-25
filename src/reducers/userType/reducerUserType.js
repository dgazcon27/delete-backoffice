import {
	EDIT_USER_TYPE, 
	BLOCK_USER_TYPE, 
	DELETE_USER_TYPE
} from '../../actions/userType/actionsTypes';

const initialState = {
	alfa : ''
} 

const ReducerUserType = (state = initialState, action = {} ) => {

	switch(action.type) {
		case EDIT_USER_TYPE:
			console.log('edit');
			return({
					...state,
					alfa : 'EDIT_USER_TYPE'

				})
		case BLOCK_USER_TYPE:
			console.log('block');
			return({
					...state,
					alfa : 'BLOCK_USER_TYPE'
				})		
		case DELETE_USER_TYPE:
			console.log('delete');
			return({
					...state,
					alfa:'DELETE_USER_TYPE'
				})
		default:
			return state;
	}
}

export default ReducerUserType;