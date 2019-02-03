import { GET_CURRENCY } from '../../queries/currency';
import {
	OPEN_MODAL_CURRENCY,
	CLOSE_MODAL_CURRENCY,
} from './actionsTypes';

// import { client } from '../../config/configStore';

export const openModal = modalType => ({
	type: OPEN_MODAL_CURRENCY,
	payload: {
		modalType,
		description: OPEN_MODAL_CURRENCY,
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
