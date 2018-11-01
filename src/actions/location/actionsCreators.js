import {
	SET_NAME_LOCATION,
	OPEN_ALERT_LOCATION,
	CLOSE_ALERT_LOCATION,
	OPEN_MODAL_LOCATION,
	CLOSE_MODAL_LOCATION,
	SET_DESCRIPTION_LOCATION,
	CLEAN_STATE_LOCATION,
	SET_LOCATION,
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
	type: CLEAN_STATE_LOCATION,
	payload: {
		description: CLEAN_STATE_LOCATION,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_LOCATION,
	payload: {
		description: CLOSE_MODAL_LOCATION,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_LOCATION,
	payload: {
		alertType,
		description: OPEN_ALERT_LOCATION,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_LOCATION,
	payload: {
		description: OPEN_ALERT_LOCATION,
	},
});

export const blockLocation = (id, statusValue, blockLocationMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockLocationMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteLocation = (obj, paginationPage, deleteLocationMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deleteLocationMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_LOCATIONS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};

export const openModal = (modalType, _location) => ({
	type: OPEN_MODAL_LOCATION,
	payload: {
		modalType,
		description: OPEN_MODAL_LOCATION,
		statusValue: _location.id,
		name: _location.name,
		id: _location.id,
	},
});

export const setName = name => ({
	type: SET_NAME_LOCATION,
	payload: {
		description: SET_NAME_LOCATION,
		name,
	},
});

export const setDescription = rolDescription => ({
	type: SET_DESCRIPTION_LOCATION,
	payload: {
		description: SET_DESCRIPTION_LOCATION,
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
