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

const ReducerUserType = (state = initialState, action = {} ) => {

	switch(action.type) {
		case EDIT_USER_TYPE:
			console.log('edit');
			return({
					...state,
					openModal:true,
					alfa : 'EDIT_USER_TYPE'
					})
		case BLOCK_USER_TYPE:
			console.log('block');
			return({
					...state,
					openModal:true,
					alfa : 'BLOCK_USER_TYPE'
				})		
		case DELETE_USER_TYPE:
			console.log('delete');
			return({
					...state,
					openModal:true,
					alfa:'DELETE_USER_TYPE'
				})
		case OPEN_MODAL:

		console.log(action);
			console.log('OPEN_MODAL');
			return({
					...state,
					modalType:action.payload.modalType,
					openModal:true,
					alfa : 'OPEN_MODAL'
				})

		case CLOSE_MODAL:
			console.log('CLOSE_MODAL');
			return({
					...state,
					openModal:false,
					alfa : 'CLOSE_MODAL'
				})	

		default:
			return state;
	}
}

export default ReducerUserType;