import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	PAGE_UP,
	PAGE_DOWN,
	SET_PURCHASE_REQ,
	SET_TO_PAY,
} from './actionsTypes';
import { GET_BANK_ACCOUNTS } from '../../queries/bank';
import { client } from '../../config/configStore';
import { GET_PURCHASE_REQ, GET_PURCHASE_BY_ID } from '../../queries/purchaseRequest';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};
export const changePage = (currentPage, paginationPage) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations'));
	paginations.bank = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;

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

export const setPurchaseReq = purchase => ({
	type: SET_PURCHASE_REQ,
	payload: {
		...purchase,
		user: Number(purchase.user.id),
		access: Number(purchase.access.id),
		event: Number(purchase.event.id),
		status: Number(purchase.status.id),
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
export const deletePurchaseReq = (id, paginationPage, deletePurchaseReqMutation) => (
	async (dispatch) => {
		await deletePurchaseReqMutation({
			variables: { id },
			refetchQueries: [{ query: GET_PURCHASE_REQ, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	});
export const openModal = (modalType, bank) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		name: bank.name,
		id: bank.id,
	},
});
export const setName = name => ({
	type: SET_NAME,
	payload: {
		description: SET_NAME,
		name,
	},
});


export const createPurchaseReq = (
	myValues,
	createdBy,
	updatedBy,
	paginationPage,
	createPurchaseReqMutation,
) =>
	async (dispatch) => {
		createPurchaseReqMutation({
			variables:
			{
				createdBy,
				updatedBy,
				user: myValues.user,
				access: myValues.access,
				event: myValues.event,
				status: myValues.status,
				comment: myValues.comment,
			},
			refetchQueries: [{ query: GET_PURCHASE_REQ, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('purchase-request')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
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
				dispatch(setPurchaseReq({
					user: { id: purchase.user },
					access: { id: purchase.access },
					event: { id: purchase.event },
					status: { id: purchase.status },
					comment: purchase.comment,
				}));
				setTimeout(() => (window.location.assign('/purchase-request')), 2000);
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
				setTimeout(() => (window.location.assign('/bank-account')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
