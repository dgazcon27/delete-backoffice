import {
	CLOSE_MODAL_EXCHANGE_RATE,
	OPEN_MODAL_EXCHANGE_RATE,
	SET_EXCHANGE_RATE,
	OPEN_ALERT_EXCHANGE_RATE,
	CLOSE_ALERT_EXCHANGE_RATE,
	CLEAN_EXCHANGE_RATE,
} from './actionsTypes';

import { checkMessageError } from '../../actions/sharedActions/sharedActions';
import { GET_RATE, GET_RATES } from '../../queries/exchangeRate';
import { client } from '../../config/configStore';

export const openModal = (modalType, state) => ({
	type: OPEN_MODAL_EXCHANGE_RATE,
	payload: {
		modalType,
		description: OPEN_MODAL_EXCHANGE_RATE,
		id: state.id,
		value: state.value,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_EXCHANGE_RATE,
	payload: {
		description: CLOSE_MODAL_EXCHANGE_RATE,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_EXCHANGE_RATE,
	payload: {
		alertType,
		description: OPEN_ALERT_EXCHANGE_RATE,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_EXCHANGE_RATE,
	payload: {
		description: CLOSE_ALERT_EXCHANGE_RATE,
	},
});

export const deleteRate = (obj, paginationPage, deleteRateMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteRateMutation({
			variables: { id },
			refetchQueries: [{ query: GET_RATES, variables: { paginationPage } }],
		});
		dispatch(closeModal());
	};
};

export const setRate = rate => ({
	type: SET_EXCHANGE_RATE,
	payload: {
		description: SET_EXCHANGE_RATE,
		idRate: rate.id,
		idCurrency: rate.currency.id,
		value: rate.value,
		active: rate.active,
	},
});

export const clearReducer = () => ({
	type: CLEAN_EXCHANGE_RATE,
	payload: {
		description: CLEAN_EXCHANGE_RATE,
		idRate: 0,
		idCurrency: 0,
		value: 0,
		active: false,
	},
});


export const getRateById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_RATE,
				variables: { id },
			})
			.then((res) => {
				const rate = res.data.rateById;
				dispatch(setRate(rate));
			})
			.catch(() => {});
	}
);

export const create = (data, mutation) => (
	async (dispatch) => {
		mutation({
			variables: data,
		})
			.then(() => {
				dispatch(openAlert('create'));
				setTimeout(() => (window.location.assign('/exchangeRate')), 2000);
			})
			.catch(() => {});
	}
);

export const editRate = (rate, myValue, paginationPage, editRateMutation) => {
	const { currency } = rate;
	const { value } = myValue;
	const id = rate.rate;
	const updatedBy = Number(localStorage.getItem('userId'));

	return async (dispatch) => {
		await editRateMutation({
			variables: {
				id,
				value,
				currency,
				updatedBy,
			},
			refetchQueries: [{ query: GET_RATES, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(clearReducer());
				dispatch(openAlert('edit'));
				setTimeout(() => (window.location.replace('/exchangeRate')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
};
