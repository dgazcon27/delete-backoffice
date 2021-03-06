import {
	OPEN_MODAL_ACCESS,
	CLOSE_MODAL_ACCESS,
	OPEN_ALERT_ACCESS,
	CLOSE_ALERT_ACCESS,
	SET_ACCESS,
} from './actionsTypes';
import { GET_ACCESS, GET_ACCESS_BY_ID } from '../../queries/access';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const setAccess = access => ({
	type: SET_ACCESS,
	payload: {
		description: SET_ACCESS,
		id: access.id,
		name: access.name,
		descriptionAccess: access.description,
		currency: access.currency,
		location: access.location.id,
		zone: access.zone.id,
	},
});

export const getAccessById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_ACCESS_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { acces } = res.data;
				dispatch(setAccess(acces));
			})
			.catch(() => {});
	}
);

export const openModal = (modalType, _access) => ({
	type: OPEN_MODAL_ACCESS,
	payload: {
		modalType,
		description: OPEN_MODAL_ACCESS,
		statusValue: _access.status.id,
		name: _access.name,
		id: _access.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_ACCESS,
	payload: {
		description: CLOSE_MODAL_ACCESS,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_ACCESS,
	payload: {
		alertType,
		description: OPEN_ALERT_ACCESS,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_ACCESS,
	payload: {
		description: CLOSE_ALERT_ACCESS,
	},
});

export const blockAccess = (id, statusValue, blockAccessMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockAccessMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteAccess = (obj, paginationPage, deleteAccessMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deleteAccessMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_ACCESS, variables: { paginationPage } }],
		}).then(() => {
			dispatch(closeModal());
			window.location.reload();
		})
			.catch((err) => {
				if (err.graphQLErrors[0].message.indexOf('FOREIGN KEY') > 0) {
					dispatch(openModal('foreign_key', { id, status: { active: 1 }, name: '' }));
				}
			});
	};
};

export const createAccess = (
	name,
	description,
	currency,
	location,
	zone,
	paginationPage,
	createAccessMutation,
) =>
	async (dispatch) => {
		createAccessMutation({
			variables: {
				name, description, currency, location, zone,
			},
			refetchQueries: [{ query: GET_ACCESS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('/access')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};

export const editAccess = (
	access,
	paginationPage,
	editAccessMutation,
) =>
	async (dispatch) => {
		await editAccessMutation({
			variables: { ...access, description: access.descriptionAccess },
			refetchQueries: [{ query: GET_ACCESS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('edit'));
				dispatch(setAccess({
					...access,
					location: { id: access.location },
					zone: { id: access.zone },
					status: { id: access.status },
				}));
				setTimeout(() => (window.location.assign('/access')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
