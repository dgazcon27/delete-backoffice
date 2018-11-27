import {
	OPEN_MODAL_EXPENSE_PER_EVENT,
	CLOSE_MODAL_EXPENSE_PER_EVENT,
} from './actionsTypes';

import { GET_EXPENSE_PER_EVENT } from '../../queries/expensePerEvent';

export const openModal = (modalType, expense) => ({
	type: OPEN_MODAL_EXPENSE_PER_EVENT,
	payload: {
		modalType,
		description: OPEN_MODAL_EXPENSE_PER_EVENT,
		statusValue: expense.active,
		id: expense.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_EXPENSE_PER_EVENT,
	payload: {
		description: CLOSE_MODAL_EXPENSE_PER_EVENT,
	},
});

export const blockExpensePerEvent = (obj, blockMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;
	return async (dispatch) => {
		await blockMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const deleteExpensePerEvent = (obj, paginationPage, deleteMutation) => {
	const { id } = obj;
	const event = obj.id;
	return async (dispatch) => {
		await deleteMutation({
			variables: { id },
			refetchQueries: [{ query: GET_EXPENSE_PER_EVENT, variables: { paginationPage, event } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};
