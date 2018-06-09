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

const openModal = modalType => ({
	type: OPEN_MODAL,
	payload: {
		description: OPEN_MODAL,
		modalType,
	},
});

const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export {
	editUserType,
	blockUserType,
	deleteUserType,
	openModal,
	closeModal,
};
