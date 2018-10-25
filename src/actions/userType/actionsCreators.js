import {
	SET_NAME_USER_TYPE,
	OPEN_MODAL_USER_TYPER,
	OPEN_ALERT_USER_TYPE,
	CLOSE_ALERT_USER_TYPE,
	CLOSE_MODAL_USER_TYPE,
	SET_DESCRIPTION,
	CLEAN_STATE_USER_TYPE,
	SET_ROL_USER_TYPE,
} from './actionsTypes';
import { client } from '../../config/configStore';
import { GET_ROLES, GET_ROL_BY_ID } from '../../queries/userType';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const setRol = role => ({
	type: SET_ROL_USER_TYPE,
	payload: {
		description: SET_ROL_USER_TYPE,
		id: role.id,
		name: role.name,
		rolDescription: role.description,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE_USER_TYPE,
	payload: {
		description: CLEAN_STATE_USER_TYPE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_USER_TYPE,
	payload: {
		description: CLOSE_MODAL_USER_TYPE,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_USER_TYPE,
	payload: {
		alertType,
		description: OPEN_ALERT_USER_TYPE,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_USER_TYPE,
	payload: {
		description: CLOSE_ALERT_USER_TYPE,
	},
});

export const getUserTypeById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_ROL_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { role } = res.data;
				dispatch(setRol(role));
			})
			.catch(() => {});
	}
);

export const blockUserType = (obj, blockRolMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;

	return async (dispatch) => {
		await blockRolMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteUserType = (obj, paginationPage, deleteRolMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deleteRolMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};

export const openModal = (modalType, _rol) => ({
	type: OPEN_MODAL_USER_TYPER,
	payload: {
		modalType,
		description: OPEN_MODAL_USER_TYPER,
		statusValue: _rol.active,
		name: _rol.name,
		id: _rol.id,
	},
});
export const setName = name => ({
	type: SET_NAME_USER_TYPE,
	payload: {
		description: SET_NAME_USER_TYPE,
		name,
	},
});

export const setDescription = rolDescription => ({
	type: SET_DESCRIPTION,
	payload: {
		description: SET_DESCRIPTION,
		rolDescription,
	},
});

export const createRol = (name, rolDescription, paginationPage, createRolMutation) =>
	async (dispatch) => {
		if (name !== '' && rolDescription !== '') {
			createRolMutation({
				variables: { name, rolDescription },
				refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
			})
				.then(() => {
					dispatch(openAlert('creado'));
					setTimeout(() => (window.location.replace('/user-type')), 2000);
				})
				.catch((res) => {
					const message = checkMessageError(res);
					dispatch(openAlert(message));
				});
		}
	};

export const editRol = (id, name, rolDescription, paginationPage, editRolMutation) =>
	async (dispatch) => {
		if (name !== '' && rolDescription !== '') {
			await editRolMutation({
				variables: { id, name, rolDescription },
				refetchQueries: [{ query: GET_ROLES, variables: { paginationPage } }],
			})
				.then(() => {
					dispatch(setRol({ id, name, description: rolDescription }));
					dispatch(openAlert('edit'));
					setTimeout(() => (window.location.replace('/user-type')), 2000);
				})
				.catch((res) => {
					const message = checkMessageError(res);
					dispatch(openAlert(message));
				});
		}
	};
