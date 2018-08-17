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
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
} from './actionsTypes';
import { GET_ROLES } from '../../queries/userType';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const changePage = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.userType = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
		payload: {
			description: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
			paginationPage,
			currentPage: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const changePageSearch = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.userTypeSearch = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;
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

export const setRol = (id, name, rolDescription) => ({
	type: SET_ROL,
	payload: {
		description: SET_ROL,
		id,
		name,
		rolDescription,
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
export const setName = name => ({
	type: SET_NAME,
	payload: {
		description: SET_NAME,
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
					setTimeout(() => (window.location.assign('user-type')), 2000);
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
					dispatch(openAlert('edit'));
					setTimeout(() => (window.location.assign('user-type')), 2000);
				})
				.catch((res) => {
					const message = checkMessageError(res);
					dispatch(openAlert(message));
				});
		}
	};
