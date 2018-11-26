import {
	OPEN_MODAL_EXPENSE_PER_EVENT,
	CLOSE_MODAL_EXPENSE_PER_EVENT,
} from './actionsTypes';

import { GET_INCOME_PER_EVENT } from '../../queries/incomePerEvent';

export const openModal = (modalType, income) => ({
	type: OPEN_MODAL_EXPENSE_PER_EVENT,
	payload: {
		modalType,
		description: OPEN_MODAL_EXPENSE_PER_EVENT,
		statusValue: income.active,
		id: income.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_EXPENSE_PER_EVENT,
	payload: {
		description: CLOSE_MODAL_EXPENSE_PER_EVENT,
	},
});

export const blockIncomePerEvent = (obj, blockHotelMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;
	return async (dispatch) => {
		await blockHotelMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const deleteIncomePerEvent = (obj, paginationPage, deleteHotelMutation) => {
	const { id } = obj;
	const event = obj.id;
	return async (dispatch) => {
		await deleteHotelMutation({
			variables: { id },
			refetchQueries: [{ query: GET_INCOME_PER_EVENT, variables: { paginationPage, event } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};
