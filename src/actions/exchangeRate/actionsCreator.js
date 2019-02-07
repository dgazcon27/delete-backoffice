import {
	CLOSE_MODAL_EXCHANGE_RATE,
	OPEN_MODAL_EXCHANGE_RATE,
	SET_EXCHANGE_RATE,
} from './actionsTypes';

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

export const setRate = state => ({
	type: SET_EXCHANGE_RATE,
	payload: {
		description: SET_EXCHANGE_RATE,
		id: state.id,
		value: state.value,
		active: state.active,
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

export const editRate = (rate, paginationPage, editRateMutation) =>
	async (dispatch) => {
		await editRateMutation({
			variables: rate,
			refetchQueries: [{ query: GET_RATES, variables: { paginationPage } }],
		})

			.then(() => {
				/* dispatch(//edit); */
				dispatch(closeModal());
				setTimeout(() => (window.location.replace('/exchangeRate')), 2000);
			})
			.catch(() => {
				/* const message = checkMessageError(res);
				dispatch(openAlert(message)); */
			});
	};
