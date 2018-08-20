import {
	EDIT_USER,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_USER,
} from './actionsTypes';
import { GET_USERS } from '../../queries/users';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export const setUser = (
	id,
	name,
	lastName,
	phone,
	dni,
	birthDate,
	citizenship,
	role,
) => ({
	type: SET_USER,
	payload: {
		description: EDIT_USER,
		id,
		name,
		lastName,
		phone,
		dni,
		birthDate,
		citizenship,
		role,
	},
});

export const setPassword = (
	id,
	password,
	confirmation,
	paginationPage,
	resetPasswordIdUserMutation,
) =>
	async (dispatch) => {
		await resetPasswordIdUserMutation({
			variables: { id, password, confirmation },
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};

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

export const blockUser = (id, statusValue, blockUserMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockUserMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteUser = (id, statusValue, paginationPage, deleteRolMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteRolMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _user) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _user.status.id,
		name: _user.name,
		id: _user.id,
	},
});

export const createUser = (
	myValues,
	name,
	email,
	password,
	lastName,
	phone,
	dni,
	birthDate,
	role,
	citizenship,
	createUserMutation,
	paginationPage,
) => (
	async (dispatch) => {
		createUserMutation({
			variables: {
				name, email, password, lastName, phone, dni, birthDate, role, citizenship,
			},
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('users')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);

export const editUser = (
	myValues,
	id,
	name,
	lastName,
	phone,
	dni,
	birthDate,
	role,
	citizenship,
	editUserMutation,
	paginationPage,
) => (
	async (dispatch) => {
		editUserMutation({
			variables: {
				id, name, lastName, phone, dni, birthDate, role, citizenship,
			},
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('editado'));
				setTimeout(() => (window.location.assign('users')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);
