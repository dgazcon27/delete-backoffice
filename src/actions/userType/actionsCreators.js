import {
	EDIT_USER_TYPE, 
	BLOCK_USER_TYPE, 
	DELETE_USER_TYPE,
	OPEN_MODAL, 
	CLOSE_MODAL,
} from './actionsTypes';

const editUserType = () => ({
	type: EDIT_USER_TYPE,
	payload: {
		description: EDIT_USER_TYPE,
	},
});

const blockUserType = () => ({
	type: BLOCK_USER_TYPE,
	payload: {
		description: BLOCK_USER_TYPE,
	},
});

const deleteUserType = () => ({
	type: DELETE_USER_TYPE,
	payload: {
		description: DELETE_USER_TYPE,
	},
});

const actionOpenModal = modalType => ({
	type: OPEN_MODAL,
	payload: {
		modalType:modalType,
		description: actionOpenModal,
	},
});

const actionCloseModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: actionCloseModal,
	},
});

export { 
	editUserType,
	blockUserType,
	deleteUserType,
	actionOpenModal,
	actionCloseModal,
};
