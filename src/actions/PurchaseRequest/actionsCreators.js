import {
	PR_SET_USER,
	SET_NAME,
	OPEN_MODAL_PURCHASE_REQ,
	MODAL_USER,
	OPEN_ALERT_PURCHASE_REQ,
	CLOSE_ALERT_PURCHASE_REQ,
	CLOSE_MODAL_PURCHASE_REQ,
	CLEAN_STATE,
	SET_PURCHASE_REQ,
	SET_TO_PAY,
	SET_ACCESS_EVENT,
	CLOSE_MODAL_USER,
	SET_PAGINATION_PURCHASE,
} from './actionsTypes';
import { GET_BANK_ACCOUNTS } from '../../queries/bank';
import {
	GET_PURCHASE_REQ,
	GET_ACCESS_BY_EVENT,
	GET_TICKETS_ACCESS_BY_EVENT,
	GET_TABLE_ACCESS_BY_EVENT,
	GET_PRESALE_ACCESS_BY_EVENT,
	GET_PURCHASE_BY_ID,
	GET_USER_BY_DNI,
} from '../../queries/purchaseRequest';
import { client } from '../../config/configStore';

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
		type: SET_PAGINATION_PURCHASE,
		payload: {
			paginationPage,
			currentPage: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const setPurchaseReq = purchase => ({
	type: SET_PURCHASE_REQ,
	payload: {
		...purchase,
		id: purchase.user.id,
		name: purchase.user.name,
		lastName: purchase.user.lastName,
		phone: purchase.user.phone,
		email: purchase.user.email,
		user: Number(purchase.user.id),
		access: purchase.access.name,
		event: purchase.event.name,
		description: SET_PURCHASE_REQ,
	},
});

export const getPurchaseById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_PURCHASE_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { purchaseRequest } = res.data;
				dispatch(setPurchaseReq(purchaseRequest));
			})
			.catch(() => {});
	}
);

export const closeUserModal = () => ({
	type: CLOSE_MODAL_USER,
	payload: {
		description: CLOSE_MODAL_USER,
	},
});
export const userModal = () => ({
	type: MODAL_USER,
	payload: {
		description: MODAL_USER,
	},
});

export const setToPay = id => ({
	type: SET_TO_PAY,
	payload: {
		description: SET_TO_PAY,
		id,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_PURCHASE_REQ,
	payload: {
		description: CLOSE_MODAL_PURCHASE_REQ,
	},
});
export const openAlert = alertType => ({
	type: OPEN_ALERT_PURCHASE_REQ,
	payload: {
		alertType,
		description: OPEN_ALERT_PURCHASE_REQ,
	},
});
export const closeAlert = () => ({
	type: CLOSE_ALERT_PURCHASE_REQ,
	payload: {
		description: CLOSE_ALERT_PURCHASE_REQ,
	},
});
export const refundPurchaseReq = (id, refundPurchaseReqMutation) => async (dispatch) => {
	await refundPurchaseReqMutation({
		variables: { id },
	});

	dispatch(closeModal());
	window.location.reload();
};
export const deletePurchaseReq = (id, deletePurchaseReqMutation) => async (dispatch) => {
	await deletePurchaseReqMutation({
		variables: { id },
	});
	dispatch(closeModal());
	window.location.reload();
};
export const openModal = (modalType, data) => ({
	type: OPEN_MODAL_PURCHASE_REQ,
	payload: {
		modalType,
		description: OPEN_MODAL_PURCHASE_REQ,
		id: data.id,
	},
});

export const setName = name => ({
	type: SET_NAME,
	payload: {
		description: SET_NAME,
		name,
	},
});
export const setAccess = access => ({
	type: SET_ACCESS_EVENT,
	payload: {
		access,
		description: SET_ACCESS_EVENT,
	},
});

export const setAccessEvent = (event, id) => (
	async (dispatch) => {
		client
			.query({
				query: GET_ACCESS_BY_EVENT,
				variables: { event: id },
			})
			.then((res) => {
				dispatch(setAccess(res.data.accessByEvent));
			})
			.catch(() => {});
	}
);
export const setAccessEvent2 = (event, id) => (
	async (dispatch) => {
		client
			.query({
				query: GET_TICKETS_ACCESS_BY_EVENT,
				variables: { event: id },
			})
			.then((res) => {
				dispatch(setAccess(res.data.accessByEventStatusBoxOffice));
			})
			.catch(() => {});
	}
);
export const setAccessEvent3 = (event, id) => (
	async (dispatch) => {
		client
			.query({
				query: GET_TABLE_ACCESS_BY_EVENT,
				variables: { event: id },
			})
			.then((res) => {
				dispatch(setAccess(res.data.accessByEventStatusTable));
			})
			.catch(() => {});
	}
);
export const setAccessEvent4 = (event, id) => (
	async (dispatch) => {
		client
			.query({
				query: GET_PRESALE_ACCESS_BY_EVENT,
				variables: { event: id },
			})
			.then((res) => {
				dispatch(setAccess(res.data.accessByEventStatusPresale));
			})
			.catch(() => {});
	}
);

export const setUser = aux => ({
	type: PR_SET_USER,
	payload: {
		aux,
		description: PR_SET_USER,
	},
});

export const getUserByDNI = dni => (
	async (dispatch) => {
		if (dni) {
			client
				.query({
					query: GET_USER_BY_DNI,
					variables: { dni },
				})
				.then((res) => {
					const aux = res.data.purchaseRequestAutocomplete;
					dispatch(setUser(aux));
				})
				.catch(() => {
					dispatch(userModal());
					dispatch(setUser({
						name: '', lastName: '', id: 0, dni: 0, phone: '', email: '',
					}));
				});
		}
	}
);
export const createPurchaseReq = (
	idUser,
	myValues,
	createdBy,
	updatedBy,
	paginationPage,
	createPurchaseReqMutation,
) =>
	async (dispatch) => {
		const user = idUser;
		const comment = (myValues.comment && myValues.comment.trim().length > 0)
			? myValues.comment
			: '-';
		createPurchaseReqMutation({
			variables:
			{
				user,
				createdBy,
				updatedBy,
				access: myValues.access,
				event: myValues.event,
				comment,
				numberAccess: myValues.numberAccess,
			},
		})
			.then(() => {
				dispatch(openAlert('creado'));
				window.location.reload();
				// setTimeout(() => (window.location.assign('/')), 1000);
			})
			.catch((err) => {
				const message = checkMessageError(err);
				dispatch(openAlert(message));
			});
	};

export const editPurchaseReq = (
	purchase,
	updatedBy,
	paginationPage,
	editPurchaseReqMutation,
) =>
	async (dispatch) => {
		await editPurchaseReqMutation({
			variables: {
				...purchase,
				updatedBy,
			},
			refetchQueries: [{ query: GET_PURCHASE_REQ, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('edit'));

				setTimeout(() => (window.location.assign('/')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
export const editBankAccount = (
	id,
	bank,
	owner,
	accountNumber,
	type,
	currency,
	comment,
	paginationPage,
	editBankAccountMutation,
) =>
	async (dispatch) => {
		await editBankAccountMutation({
			variables: {
				id, bank, owner, accountNumber, type, currency, comment,
			},
			refetchQueries: [{ query: GET_BANK_ACCOUNTS, variables: { paginationPage } }],
		})

			.then(() => {
				dispatch(openAlert('edit'));
				setTimeout(() => (window.location.reload('/bank-account')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};

