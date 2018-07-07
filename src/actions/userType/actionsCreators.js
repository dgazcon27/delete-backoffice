import {
	SET_NAME,
	OPEN_MODAL,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_ROL,
} from './actionsTypes';
import { GET_ROLES } from '../../queries/userType';

export const setRol = (id, name, descripcion) => ({
	type: SET_ROL,
	payload: {
		description: SET_ROL,
		id,
		name,
		descripcion,
	},
});
export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export const editRol = (name, descripcion, paginationPage, editRolMutation) =>
	async (dispatch) => {
		if (name !== '' && descripcion !== '') {
			await editRolMutation({
				variables: { name, descripcion },
				refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
			});
			dispatch(cleanState());
		}
	};

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
			dispatch(cleanState());
		}
	};
