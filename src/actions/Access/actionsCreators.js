import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	SET_ACCESS,
	PAGE_UP_ACC,
	PAGE_DOWN_ACC,
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
export const changePage = (currentPage, paginationPageAcc) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).access;
	paginations.access = currentPage < paginationPageAcc ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPageAcc ? PAGE_UP_ACC : PAGE_DOWN_ACC,
		payload: {
			description: currentPage < paginationPageAcc ? PAGE_UP_ACC : PAGE_DOWN_ACC,
			paginationPageAcc,
			currentPageAcc: currentPage < paginationPageAcc ? currentPage + 1 : currentPage - 1,
		},
	});
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
		status: access.status.id,
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
		description: CLOSE_ALERT,
	},
});

export const openModal = (modalType, _access) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _access.status.id,
		name: _access.name,
		id: _access.id,
	},
});

export const blockAccess = (id, statusValue, blockAccessMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockAccessMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteAccess = (id, statusValue, paginationPage, deleteAccessMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteAccessMutation({
			variables: { id, status },
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
	status,
	paginationPage,
	createAccessMutation,
) =>
	async (dispatch) => {
		createAccessMutation({
			variables: {
				name, description, currency, location, zone, status,
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
