import {
	EDIT_USER, 
	BLOCK_USER, 
	DELETE_USER,
} from './actionsTypes';

const actionEditUser = () => (
	
	{
	type: EDIT_USER,
	payload:{
		description: EDIT_USER 
	} 
});

const actionBlockUser = () => ({
	type: BLOCK_USER,
	payload:{
		description: BLOCK_USER 
	} 
});

const actionDeleteUser = () => ({
	type: DELETE_USER,
	payload:{
		description: DELETE_USER 
	} 
});

export {actionEditUser, actionBlockUser, actionDeleteUser}