import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_ZONE,
	PAGE_UP,
	PAGE_DOWN,
} from './actionsTypes';
import { GET_ZONES } from '../../queries/zone';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};
export const changePage = (currentPage, paginationPage) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations'));
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

export const setZone = (id, name, maxCapacity, capacity) => ({
	type: SET_ZONE,
	payload: {
		description: SET_ZONE,
		id,
		name,
		maxCapacity,
		capacity,
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
export const blockZone = (id, statusValue, blockZoneMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockZoneMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteZone = (id, statusValue, paginationPage, deleteZoneMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteZoneMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_ZONES, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _zone) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _zone.status.id,
		name: _zone.name,
		id: _zone.id,
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

export const createZone = (
	name,
	capacity,
	maxCapacity,
	paginationPage,
	createZoneMutation,
) => async (dispatch) => {
	createZoneMutation({
		variables: {
			name, capacity, maxCapacity,
		},
		refetchQueries: [{ query: GET_ZONES, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			setTimeout(() => (window.location.assign('Departments')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};


export const editZone = (
	id,
	name,
	capacity,
	maxCapacity,
	paginationPage,
	editZoneMutation,
) => async (dispatch) => {
	await editZoneMutation({
		variables: {
			id, name, capacity, maxCapacity,
		},
		refetchQueries: [{ query: GET_ZONES, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('edit'));
			setTimeout(() => (window.location.assign('Departments')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
