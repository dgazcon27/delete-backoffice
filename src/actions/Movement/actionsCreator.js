import { SET_ALERT_MOVEMENT, SET_DATA_MOVEMENT } from './actionsTypes';
import { GET_MOVEMENT_BY_ID } from '../../queries/movement';
import { client } from '../../config/configStore';

export const setNotification = isAlert => ({
	type: SET_ALERT_MOVEMENT,
	payload: {
		isAlert,
		description: SET_ALERT_MOVEMENT,
	},
});

export const setMovement = movement => ({
	type: SET_DATA_MOVEMENT,
	payload: {
		id: movement.id,
		amount: movement.amount,
		bankAccount: movement.bankAccount.id,
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
				// setTimeout(() => (window.location.assign('bank')), 2000);
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
				// setTimeout(() => (window.location.assign('bank')), 2000);
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

