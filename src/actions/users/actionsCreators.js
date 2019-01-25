import {
	EDIT_USER,
	OPEN_MODAL_USER,
	OPEN_ALERT_USER,
	CLOSE_ALERT_USER,
	CLOSE_MODAL_USER,
	SET_USER,
} from './actionsTypes';

import { GET_USERS, GET_USER_BY_ID } from '../../queries/users';
import { client } from '../../config/configStore';
import { closeUserModal } from '../PurchaseRequest/actionsCreators';
import {
	showUserForm,
	showMessageFailed,
} from '../Ticket/actionsCreators';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const closeModal = () => ({
	type: CLOSE_MODAL_USER,
	payload: {
		description: CLOSE_MODAL_USER,
	},
});

export const setUser = user => ({
	type: SET_USER,
	payload: {
		description: EDIT_USER,
		id: user.id,
		name: user.name,
		lastName: user.lastName,
		phone: user.phone,
		dni: user.dni,
		birthDate: user.birthDate,
		citizenship: user.citizenship.id,
		role: user.role.id,
	},
});

export const getUserById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_USER_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { user } = res.data;
				dispatch(setUser(user));
			});
	}
);

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
	type: OPEN_ALERT_USER,
	payload: {
		alertType,
		description: OPEN_ALERT_USER,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_USER,
	payload: {
		description: CLOSE_ALERT_USER,
	},
});

export const blockUser = (obj, blockUserMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;

	return async (dispatch) => {
		await blockUserMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _user) => ({
	type: OPEN_MODAL_USER,
	payload: {
		modalType,
		description: OPEN_MODAL_USER,
		statusValue: _user.active,
		name: _user.name,
		id: _user.id,
	},
});

export const deleteUser = (obj, paginationPage, deleteRolMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deleteRolMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(closeModal());
				window.location.reload();
			})
			.catch((err) => {
				if (err.graphQLErrors[0].message.indexOf('FOREIGN KEY') > 0) {
					dispatch(openModal('foreign_key', { id, active: false, name: '' }));
				}
			});
	};
};

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
	createdBy,
	updatedBy,
	createUserMutation,
	paginationPage,
) => (
	async (dispatch) => {
		createUserMutation({
			variables: {
				name,
				email,
				password,
				lastName,
				phone,
				dni,
				birthDate,
				role,
				citizenship,
				createdBy,
				updatedBy,
			},
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				dispatch(closeUserModal());
				setTimeout(() => (window.history.back()), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);
export const newCreateUser = (
	myValues,
	name,
	email,
	lastName,
	phone,
	dni,
	birthDate,
	citizenship,
	updatedBy,
	createNewUserMutation,
	reload = false,
) => (
	async (dispatch) => {
		createNewUserMutation({
			variables: {
				...myValues,
				name,
				email,
				lastName,
				phone,
				dni,
				birthDate,
				citizenship,
				createdBy: updatedBy,
				updatedBy,
			},
		})
			.then(() => {
				dispatch(openAlert('creado'));
				if (!reload) {
					setTimeout(() => {
						dispatch(closeUserModal());
						window.location.reload();
					}, 2000);
				} else {
					setTimeout(() => {
						dispatch(showUserForm(true, true, false));
						dispatch(showMessageFailed(false));
					}, 1000);
				}
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
	updatedBy,
	editUserMutation,
	paginationPage,
) => (
	async (dispatch) => {
		editUserMutation({
			variables: {
				id, name, lastName, phone, dni, birthDate, role, citizenship, updatedBy,
			},
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('editado'));
				setTimeout(() => (window.location.assign('/users')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);
