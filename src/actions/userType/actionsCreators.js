import {
	EDIT_USER_TYPE,
	DELETE_USER_TYPE,
	OPEN_MODAL,
	CLOSE_MODAL,
} from './actionsTypes';
// import fetch from 'isomorphic-fetch';

const editUserType = () => ({
	type: EDIT_USER_TYPE,
	payload: {
		description: EDIT_USER_TYPE,
	},
});

const blockUserType = (id, statusValue, blockRolMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async () => {
		await blockRolMutation({ variables: { id, status } });
	};
};

const deleteUserType = () => ({
	type: DELETE_USER_TYPE,
	payload: {
		description: DELETE_USER_TYPE,
	},
});


const openModal = (modalType, _rol) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: openModal,
		statusValue: _rol.status.id,
		_name: _rol.name,
		id: _rol.id,
	},
});

const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export {
	openModal,
	closeModal,
	editUserType,
	blockUserType,
	deleteUserType,
};
