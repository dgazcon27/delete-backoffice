import {
	GET_CURRENCY,
	GET_CURRENCY_BY_ID,
} from '../../queries/currency';
import {
	OPEN_MODAL_CURRENCY,
	CLOSE_MODAL_CURRENCY,
	SET_CURRENCY,
	CLOSE_ALERT_CURRENCY,
	SET_BANKS_ACCOUNTS,
} from './actionsTypes';

import { client } from '../../config/configStore';

export const setCurrency = currency => ({
	type: SET_CURRENCY,
	payload: {
		description: currency.description,
		id: currency.id,
	},
});

export const getAccountsByCurrency = id => ({
	type: SET_BANKS_ACCOUNTS,
	payload: {
		description: SET_BANKS_ACCOUNTS,
		bankAccountId: id,
	},
});


export const openModal = (modalType, currency) => ({
	type: OPEN_MODAL_CURRENCY,
	payload: {
		modalType,
		description: OPEN_MODAL_CURRENCY,
		id: currency.id,
	},
});
export const closeModal = modalType => ({
	type: CLOSE_MODAL_CURRENCY,
	payload: {
		modalType,
		description: CLOSE_MODAL_CURRENCY,
	},
});
export const deleteCurrency = (obj, paginationPage, deleteCurrencyMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteCurrencyMutation({
			variables: { id },
			refetchQueries: [{ query: GET_CURRENCY, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};

export const createCurrency = (description, paginationPage, createCurrencyMutation) =>
	async () => {
		createCurrencyMutation({
			variables: { description },
			refetchQueries: [{ query: GET_CURRENCY, variables: { paginationPage } }],
		})
			.then(() => {
				setTimeout(() => (window.location.assign('currency')), 2000);
			})
			.catch(() => {
			});
	};


export const editCurrency = (currency, paginationPage, editCurrencyMutation) =>
	async () => {
		await editCurrencyMutation({
			variables: currency,
			refetchQueries: [{ query: GET_CURRENCY, variables: { paginationPage } }],
		})

			.then(() => {
				// dispatch(setBank(bank));
				// dispatch(openAlert('edit'));
				setTimeout(() => (window.location.replace('/currency')), 2000);
			})
			.catch(() => {
				// const message = checkMessageError(res);
				// dispatch(openAlert(message));
			});
	};
export const closeAlert = () => ({
	type: CLOSE_ALERT_CURRENCY,
	payload: {
		description: CLOSE_ALERT_CURRENCY,
	},
});

export const getCurrencyById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_CURRENCY_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { currencyById } = res.data;
				dispatch(setCurrency(currencyById));
			})
			.catch(() => {});
	}
);
