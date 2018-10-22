import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_ZONE,
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
export const blockZone = (obj, blockZoneMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;
	return async (dispatch) => {
		await blockZoneMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteZone = (obj, paginationPage, deleteZoneMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deleteZoneMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_ZONES, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};

export const openModal = (modalType, _zone) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _zone.active,
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
