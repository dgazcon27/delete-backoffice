import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	SET_PAYMENT,
	PAGE_UP_PAY,
	PAGE_DOWN_PAY,
} from './actionsTypes';
import { GET_PAYMENTS } from '../../queries/payment';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};
export const changePage = (currentPage, paginationPagePay) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).payment;
	paginations.payment = currentPage < paginationPagePay ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPagePay ? PAGE_UP_PAY : PAGE_DOWN_PAY,
		payload: {
			description: currentPage < paginationPagePay ? PAGE_UP_PAY : PAGE_DOWN_PAY,
			paginationPagePay,
			currentPagePay: currentPage < paginationPagePay ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const setPayment = (id, purchaseRequest, amount, reference, comment, type, bankAccount) => ({
	type: SET_PAYMENT,
	payload: {
		description: SET_PAYMENT,
		id,
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
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

export const blockPayment = (id, statusValue, blockPaymentMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockPaymentMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deletePayment = (id, statusValue, paginationPage, deletePaymentMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deletePaymentMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_PAYMENTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _payment) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: 1,
		name: _payment.id,
		id: _payment.id,
	},
});

export const createPayment = (
	purchaseRequest,
	amount,
	reference,
	comment,
	type,
	bankAccount,
	createdBy,
	updatedBy,
	paginationPage,
	createPaymentMutation,
) => async (dispatch) => {
	createPaymentMutation({
		variables: {
			purchaseRequest, amount, reference, comment, type, bankAccount, createdBy, updatedBy,
		},
		refetchQueries: [{ query: GET_PAYMENTS, variables: { paginationPage } }],
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


export const editPayment = (
	id,
	purchaseRequest,
	amount,
	reference,
	comment,
	type,
	bankAccount,
	updatedBy,
	paginationPage,
	editPaymentMutation,
) => async (dispatch) => {
	await editPaymentMutation({
		variables: {
			id, purchaseRequest, amount, reference, comment, type, bankAccount, updatedBy,
		},
		refetchQueries: [{ query: GET_PAYMENTS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('edit'));
			setTimeout(() => (window.location.assign('pre-sale')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
