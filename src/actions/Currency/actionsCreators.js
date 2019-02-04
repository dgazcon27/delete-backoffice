import { GET_CURRENCY } from '../../queries/currency';
import {
	OPEN_MODAL_CURRENCY,
	CLOSE_MODAL_CURRENCY,
	SET_CURRENCY,
} from './actionsTypes';

// import { client } from '../../config/configStore';

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


export const setCurrency = currency => ({
	type: SET_CURRENCY,
	payload: {
		description: SET_CURRENCY,
		id: currency.id,
		currency: currency.description,
	},
});
