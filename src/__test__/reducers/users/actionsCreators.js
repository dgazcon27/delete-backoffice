import {
	EDIT_USER,
	BLOCK_USER,
	DELETE_USER,
} from './actionsTypes';

const editUser = () => ({
	type: EDIT_USER,
	payload: {
		description: EDIT_USER,
	},
});

const blockUser = () => ({
	type: BLOCK_USER,
	payload: {
		description: BLOCK_USER,
	},
});

const deleteUser = () => ({
	type: DELETE_USER,
	payload: {
		description: DELETE_USER,
	},
});

export { editUser, blockUser, deleteUser };
