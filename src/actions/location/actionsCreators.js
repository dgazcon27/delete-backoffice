import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_LOCATION,
	PAGE_UP_LOC,
	PAGE_DOWN_LOC,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
} from './actionsTypes';

import { client } from '../../config/configStore';
import { GET_LOCATIONS, GET_LOCATION_BY_ID } from '../../queries/location';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const changePage = (currentPage, paginationPageLoc) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).location;
	paginations.location = currentPage < paginationPageLoc ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPageLoc ? PAGE_UP_LOC : PAGE_DOWN_LOC,
		payload: {
			description: currentPage < paginationPageLoc ? PAGE_UP_LOC : PAGE_DOWN_LOC,
			paginationPageLoc,
			currentPageLoc: currentPage < paginationPageLoc ? currentPage + 1 : currentPage - 1,
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

export const setLocation = location => ({
	type: SET_LOCATION,
	payload: {
		description: SET_LOCATION,
		id: location.id,
		name: location.name,
		locationDescription: location.description,
		fullcapacity: location.fullcapacity,
		capacity: location.capacity,
	},
});

export const getLocationById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_LOCATION_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { location } = res.data;
				dispatch(setLocation(location));
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

export const blockLocation = (id, statusValue, blockLocationMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockLocationMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteLocation = (id, statusValue, paginationPage, deleteLocationMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteLocationMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_LOCATIONS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _location) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		name: _location.name,
		id: _location.id,
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

export const createLocation = (
	name,
	description,
	fullcapacity,
	capacity,
	status,
	createdBy,
	updatedBy,
	paginationPage,
	createLocationMutation,
) => async (dispatch) => {
	createLocationMutation({
		variables: {
			name, description, fullcapacity, capacity, status, createdBy, updatedBy,
		},
		refetchQueries: [{ query: GET_LOCATIONS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			setTimeout(() => (window.location.assign('tables')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};

export const editLocation = (
	location,
	updatedBy,
	paginationPage,
	editLocationMutation,
) => async (dispatch) => {
	await editLocationMutation({
		variables: {
			id: location.id,
			name: location.name,
			description: location.locationDescription,
			fullcapacity: location.fullcapacity,
			capacity: location.capacity,
			status: location.status,
			updatedBy,
		},
		refetchQueries: [{ query: GET_LOCATIONS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(setLocation({
				...location,
				description: location.locationDescription,
				status: { id: location.status },
			}));
			dispatch(openAlert('edit'));
			setTimeout(() => (window.location.replace('/tables')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
