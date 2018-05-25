import {
	EDIT_USER_TYPE, 
	BLOCK_USER_TYPE, 
	DELETE_USER_TYPE
} from './actionsTypes';

const editUserType = () => ({
	type: EDIT_USER_TYPE,
	payload:{
		description: EDIT_USER_TYPE 
	} 

});

const blockUserType = () => ({
	type: BLOCK_USER_TYPE,
	payload:{
		description: BLOCK_USER_TYPE 
	} 
});

const deleteUserType = () => ({
	type: DELETE_USER_TYPE,
	payload:{
		description: DELETE_USER_TYPE 
	} 
});

export {editUserType, blockUserType, deleteUserType}