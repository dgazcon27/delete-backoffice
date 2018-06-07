import {
	EDIT_USER_TYPE,
	BLOCK_USER_TYPE,
	DELETE_USER_TYPE,
} from './actionsTypes';

const actionEditUserType = () => ({
	type: EDIT_USER_TYPE,
	payload: {
		description: EDIT_USER_TYPE,
	},
});

const actionBlockUserType = () => ({
	type: BLOCK_USER_TYPE,
	payload: {
		description: BLOCK_USER_TYPE,
	},
});

const actionDeleteUserType = () => ({
	type: DELETE_USER_TYPE,
	payload: {
		description: DELETE_USER_TYPE,
	},
});

export { actionEditUserType, actionBlockUserType, actionDeleteUserType };
