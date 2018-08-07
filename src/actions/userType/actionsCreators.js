import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_ROL,
	PAGE_UP,
	PAGE_DOWN,
} from './actionsTypes';
import { GET_ROLES } from '../../queries/userType';

export const changePage = (currentPage, paginationPage) => ({
	type: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
	payload: {
		description: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
		paginationPage,
		currentPage: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
	},
});

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

export const editRol = (id, name, descripcion, paginationPage, editRolMutation) =>
	async (dispatch) => {
		if (name !== '' && descripcion !== '') {
			await editRolMutation({
				variables: { id, name, descripcion },
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
		window.location.reload();
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
export const openAlert = alertType => ({
	type: OPEN_ALERT,
	payload: {
		alertType,
		description: OPEN_ALERT,
	},
});
export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: OPEN_ALERT,
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
			createRolMutation({
				variables: { name, descripcion },
				refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
			})
				.then(() => {
					dispatch(openAlert('creado'));
					setTimeout(() => (window.location.assign('user-type')), 2000);
				})
				.catch((res) => {
					const a = res.graphQLErrors[0].message;
					switch (a) {
						case 'Variable "$descripcion" of required type "String!" was not provided.':
							dispatch(openAlert('descripcion'));
							break;
						case 'Variable "$name" of required type "String!" was not provided.':
							dispatch(openAlert('nombre'));
							break;
						case 'validation':
							dispatch(openAlert('validation'));
							break;
						default:
							dispatch(cleanState());
							break;
					}
				});
		}
	};
