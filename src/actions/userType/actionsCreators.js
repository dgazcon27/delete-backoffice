import {
	EDIT_USER_TYPE, 
	BLOCK_USER_TYPE, 
	DELETE_USER_TYPE,
	OPEN_MODAL, 
	CLOSE_MODAL,
} from './actionsTypes';

export const actionEditUserType = () => (
	
	{
	type: EDIT_USER_TYPE,
	payload:{
		description: EDIT_USER_TYPE 
	} 

});

export const actionBlockUserType = () => ({
	type: BLOCK_USER_TYPE,
	payload:{
		description: BLOCK_USER_TYPE 
	} 
});

export const actionDeleteUserType = () => ({
	type: DELETE_USER_TYPE,
	payload:{
		description: DELETE_USER_TYPE 
	} 
});


export const actionOpenModal = modalType => ({
	type: OPEN_MODAL,
	payload: {
		modalType:modalType,
		description: actionOpenModal,
	},
});

export const actionCloseModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: actionCloseModal,
	},
});

