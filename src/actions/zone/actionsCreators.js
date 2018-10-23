import {
	SET_NAME_ZONE,
	OPEN_MODAL_ZONE,
	OPEN_ALERT_ZONE,
	CLOSE_ALERT_ZONE,
	CLOSE_MODAL_ZONE,
	SET_DESCRIPTION_ZONE,
	CLEAN_STATE_ZONE,
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
	type: CLEAN_STATE_ZONE,
	payload: {
		description: CLEAN_STATE_ZONE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_ZONE,
	payload: {
		description: CLOSE_MODAL_ZONE,
	},
});
export const openAlert = alertType => ({
	type: OPEN_ALERT_ZONE,
	payload: {
		alertType,
		description: OPEN_ALERT_ZONE,
	},
});
export const closeAlert = () => ({
	type: CLOSE_ALERT_ZONE,
	payload: {
		description: OPEN_ALERT_ZONE,
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
	type: OPEN_MODAL_ZONE,
	payload: {
		modalType,
		description: OPEN_MODAL_ZONE,
		statusValue: _zone.active,
		name: _zone.name,
		id: _zone.id,
	},
});
export const setName = name => ({
	type: SET_NAME_ZONE,
	payload: {
		description: SET_NAME_ZONE,
		name,
	},
});

export const setDescription = rolDescription => ({
	type: SET_DESCRIPTION_ZONE,
	payload: {
		description: SET_DESCRIPTION_ZONE,
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
