import {
	SET_NAME,
	OPEN_MODAL,
	CLOSE_MODAL,
	EDIT_USER_TYPE,
	SET_DESCRIPTION,
} from './actionsTypes';

import { GET_ROLES } from '../../queries/userType';

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export const editUserType = () => ({
	type: EDIT_USER_TYPE,
	payload: {
		description: EDIT_USER_TYPE,
	},
});

export const blockUserType = (id, statusValue, blockRolMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockRolMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteUserType = (id, statusValue, paginationPage, deleteRolMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteRolMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
		});
		dispatch(closeModal());
	};
};

export const openModal = (modalType, _rol) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _rol.status.id,
		name: _rol.name,
		id: _rol.id,
	},
});

export const setName = name => ({
	type: SET_NAME,
	payload: {
		description: SET_NAME,
		name,
	},
});

export const setDescription = descripcion => ({
	type: SET_DESCRIPTION,
	payload: {
		description: SET_DESCRIPTION,
		descripcion,
	},
});

export const createRol = (name, descripcion, paginationPage, createRolMutation) =>
	async (dispatch) => {
		if (name !== '' && descripcion !== '') {
			await createRolMutation({
				variables: { name, descripcion },
				refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
			});
			dispatch(closeModal());
		}
	};
