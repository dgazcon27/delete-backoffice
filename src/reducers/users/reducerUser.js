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
			console.log('edit');
			return({
					...state,
					alfa : 'EDIT_USER'
				})
		case BLOCK_USER:
			console.log('block');
			return({
					...state,
					alfa : 'BLOCK_USER'
				})		
		case DELETE_USER:
			console.log('delete');
			return({
					...state,
					alfa:'DELETE_USER'
				})
		default:
			return state;
	}
}

export default ReducerUser;