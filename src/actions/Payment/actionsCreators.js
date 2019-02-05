import {
	OPEN_MODAL_PAYMENT,
	OPEN_ALERT_PAYMENT,
	CLOSE_ALERT_PAYMENT,
	CLOSE_MODAL_PAYMENT,
	CLEAN_STATE_PAYMENT,
	SET_PAYMENT,
	SET_BANKS_ACCOUNTS,
} from './actionsTypes';
import { GET_PAYMENTS, GET_PAYMENT_BY_ID } from '../../queries/payment';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const setPaymentData = data => ({
	type: SET_PAYMENT,
	payload: {
		description: SET_PAYMENT,
		...data,
		bankAccount: data.bankAccount.id,
	},
});

export const setPayment = payment => ({
	type: SET_PAYMENT,
	payload: {
		description: SET_PAYMENT,
		...payment,
		bankName: `${payment.bankAccount.owner.name} ${payment.bankAccount.owner.lastName}`,
	},
});

export const getAccountsByCurrency = id => ({
	type: SET_BANKS_ACCOUNTS,
	payload: {
		description: SET_BANKS_ACCOUNTS,
		bankAccountId: id,
	},
});


export const setBanksAccounts = banksAccount => ({
	type: SET_BANKS_ACCOUNTS,
	payload: {
		description: SET_BANKS_ACCOUNTS,
		banksAccount,
	},
});

export const getPaymentById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_PAYMENT_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { payment } = res.data;
				dispatch(setPayment(payment));
			})
			.catch(() => {});
	}
);

export const cleanState = () => ({
	type: CLEAN_STATE_PAYMENT,
	payload: {
		description: CLEAN_STATE_PAYMENT,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_PAYMENT,
	payload: {
		description: CLOSE_MODAL_PAYMENT,
	},
});
export const openAlert = alertType => ({
	type: OPEN_ALERT_PAYMENT,
	payload: {
		alertType,
		description: OPEN_ALERT_PAYMENT,
	},
});
export const closeAlert = () => ({
	type: CLOSE_ALERT_PAYMENT,
	payload: {
		description: CLOSE_ALERT_PAYMENT,
	},
});

export const blockPayment = (id, statusValue, blockPaymentMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockPaymentMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deletePayment = (obj, paginationPage, deletePaymentMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deletePaymentMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_PAYMENTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _payment) => ({
	type: OPEN_MODAL_PAYMENT,
	payload: {
		modalType,
		description: OPEN_MODAL_PAYMENT,
		statusValue: 1,
		name: _payment.payment.id,
		id: _payment.payment.id,
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
	const tex = comment || '-';
	createPaymentMutation({
		variables: {
			purchaseRequest, amount, reference, comment: tex, type, bankAccount, createdBy, updatedBy,
		},
		refetchQueries: [{ query: GET_PAYMENTS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			setTimeout(() => (window.location.assign('/')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};


export const editPayment = (
	payment,
	updatedBy,
	paginationPage,
	editPaymentMutation,
) => async (dispatch) => {
	await editPaymentMutation({
		variables: {
			...payment, updatedBy,
		},
		refetchQueries: [{ query: GET_PAYMENTS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('edit'));
			dispatch(setPayment({
				...payment,
				purchaseRequest: 0,
				bankAccount: { id: payment.bankAccount },
			}));
			setTimeout(() => (window.location.assign('/pre-sale')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
