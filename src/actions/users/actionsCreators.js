import {
	EDIT_USER,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_USER,
	PAGE_UP,
	PAGE_DOWN,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
} from './actionsTypes';
import { GET_USERS } from '../../queries/users';

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
		type: currentPage < paginationPageUsers ? PAGE_UP : PAGE_DOWN,
		payload: {
			description: currentPage < paginationPageUsers ? PAGE_UP : PAGE_DOWN,
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
				setTimeout(() => (window.location.assign('users')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);
