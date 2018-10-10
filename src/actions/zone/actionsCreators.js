import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_ZONE,
	PAGE_UP_ZONE,
	PAGE_DOWN_ZONE,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
} from './actionsTypes';
import { GET_ZONES, GET_ZONE_BY_ID } from '../../queries/zone';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};
export const changePage = (currentPage, paginationPageZone) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).zone;
	paginations.zone = currentPage < paginationPageZone ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPageZone ? PAGE_UP_ZONE : PAGE_DOWN_ZONE,
		payload: {
			description: currentPage < paginationPageZone ? PAGE_UP_ZONE : PAGE_DOWN_ZONE,
			paginationPageZone,
			currentPage: currentPage < paginationPageZone ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const changePageSearch = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.zoneSearch = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;
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

export const setZone = zone => ({
	type: SET_ZONE,
	payload: {
		...zone,
		description: SET_ZONE,
	},
});

export const getZoneById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_ZONE_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { zone } = res.data;
				dispatch(setZone(zone));
			})
			.catch(() => {});
	}
);

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
	maxcapacity,
	createdBy,
	updatedBy,
	paginationPage,
	createZoneMutation,
) => async (dispatch) => {
	createZoneMutation({
		variables: {
			name, capacity, maxcapacity, createdBy, updatedBy,
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
	zone,
	updatedBy,
	paginationPage,
	editZoneMutation,
) => async (dispatch) => {
	await editZoneMutation({
		variables: {
			...zone, updatedBy,
		},
		refetchQueries: [{ query: GET_ZONES, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('edit'));
			dispatch(setZone(zone));
			setTimeout(() => (window.location.assign('/Departments')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
