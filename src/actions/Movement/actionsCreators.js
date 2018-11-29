import {
	SET_ALERT_MOVEMENT,
	SET_DATA_MOVEMENT,
	SET_EVENT_MOVEMENT,
	OPEN_MODAL_EXPENSE_PER_EVENT,
	CLOSE_MODAL_EXPENSE_PER_EVENT,
	OPEN_MODAL_INCOME_PER_EVENT,
	CLOSE_MODAL_INCOME_PER_EVENT,
} from './actionsTypes';

import {
	GET_MOVEMENT_BY_ID,
	GET_EXPENSE_PER_EVENT,
	GET_INCOME_PER_EVENT,
} from '../../queries/movement';

import { GET_EVENT_BY_ID } from '../../queries/event';
import { client } from '../../config/configStore';

export const setNotification = isAlert => ({
	type: SET_ALERT_MOVEMENT,
	payload: {
		isAlert,
		description: SET_ALERT_MOVEMENT,
	},
});

export const setEventMovement = event => ({
	type: SET_EVENT_MOVEMENT,
	payload: {
		event: event.id,
		eventName: event.name,
	},
});

export const setMovement = movement => ({
	type: SET_DATA_MOVEMENT,
	payload: {
		id: movement.id,
		amount: movement.amount,
		bankAccount: movement.bankAccount.id,
		category: movement.category.id,
		bankAccountName: movement.bankAccount.owner.name,
		comment: movement.comment,
		event: movement.event.id,
		eventName: movement.event.name,
		movementsType: movement.movementsType,
		reference: movement.reference,
		type: movement.type,
		description: SET_ALERT_MOVEMENT,
	},
});

export const createIncome = (income, create) =>
	async (dispatch) => {
		create({
			variables: income,
		})
			.then(() => {
				dispatch(setNotification(true));
				const url = income.movementsType === 'income' ? 
					`/income-per-event/${income.event}` : 
					`/expense-per-event/${income.event}`;
				setTimeout(() => (window.location.assign(url)), 2000);
			})
			.catch(() => {
			});
	};

export const updateMovement = (income, update) =>
	async (dispatch) => {
		update({
			variables: income,
		})
			.then(() => {
				dispatch(setNotification(true));
				const url = income.movementsType === 'income' ? 
					`/income-per-event/${income.event}` : 
					`/expense-per-event/${income.event}`;
				setTimeout(() => (window.location.assign(url)), 2000);
			})
			.catch(() => {
			});
	};

export const getMovementById = id =>
	async (dispatch) => {
		client
			.query({
				query: GET_MOVEMENT_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { movementId } = res.data;
				dispatch(setMovement(movementId));
			})
			.catch(() => {});
	};

export const getEventById = id =>
	async (dispatch) => {
		client
			.query({
				query: GET_EVENT_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { event } = res.data;
				dispatch(setEventMovement(event));
			})
			.catch(() => {});
	};

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


export const openModalIncome = (modalType, income) => ({
	type: OPEN_MODAL_INCOME_PER_EVENT,
	payload: {
		modalType,
		description: OPEN_MODAL_INCOME_PER_EVENT,
		statusValue: income.active,
		id: income.id,
	},
});

export const closeModalIncome = () => ({
	type: CLOSE_MODAL_INCOME_PER_EVENT,
	payload: {
		description: CLOSE_MODAL_INCOME_PER_EVENT,
	},
});

export const blockIncomePerEvent = (obj, blockMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;
	return async (dispatch) => {
		await blockMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const deleteIncomePerEvent = (obj, paginationPage, deleteMutation) => {
	const { id } = obj;
	const event = obj.id;
	return async (dispatch) => {
		await deleteMutation({
			variables: { id },
			refetchQueries: [{ query: GET_INCOME_PER_EVENT, variables: { paginationPage, event } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

