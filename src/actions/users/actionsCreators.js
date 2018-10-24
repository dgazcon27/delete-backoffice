import {
	EDIT_USER,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_USER,
	PAGE_UP_USER,
	PAGE_DOWN_USER,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
	US_OPEN_MODAL,
} from './actionsTypes';

import { GET_USERS, GET_USER_BY_ID } from '../../queries/users';
import { client } from '../../config/configStore';
import { closeUserModal } from '../PurchaseRequest/actionsCreators';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const changePage = (currentPage, paginationPageUsers) => {
	const paginations = JSON.parse(localStorage.getItem('paginationsUsers')) || {};
	paginations.users = currentPage < paginationPageUsers ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginationsUsers', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPageUsers ? PAGE_UP_USER : PAGE_DOWN_USER,
		payload: {
			description: currentPage < paginationPageUsers ? PAGE_UP_USER : PAGE_DOWN_USER,
			paginationPageUsers,
			currentPageUsers: currentPage < paginationPageUsers ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const changePageSearch = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.users = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;
	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPage ? SEARCH_PAGE_UP : SEARCH_PAGE_DOWN,
		payload: {
			description: currentPage < paginationPage ? SEARCH_PAGE_UP : SEARCH_PAGE_DOWN,
			paginationPageSearch: paginationPage,
			currentPageSearch: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const openModal = (modalType, _user) => ({
	type: US_OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _user.active,
		name: _user.name,
		id: _user.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
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
	const status = !statusValue;
	return async (dispatch) => {
		await blockUserMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const deleteUser = (id, statusValue, paginationPage, deleteRolMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteRolMutation({
			variables: { id, status },
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
				setTimeout(() => (window.location.replace('/users')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);
