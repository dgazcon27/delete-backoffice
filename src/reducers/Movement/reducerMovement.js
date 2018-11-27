import { SET_ALERT_MOVEMENT, SET_DATA_MOVEMENT } from '../../actions/Movement/actionsTypes';

const initialState = {
	movementsType: '',
	amount: 0,
	reference: '',
	comment: '',
	type: '',
	bankAccount: 0,
	event: 0,
	createdBy: 0,
	updatedBy: 0,
	isAlert: false,
	typeAlert: '',
};

const ReducerMovement = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_ALERT_MOVEMENT:
			return ({
				...state,
				isAlert: action.payload.isAlert,
			});
		case SET_DATA_MOVEMENT:
			return ({
				...state,
				id: action.payload.id,
				event: action.payload.event,
				eventName: action.payload.eventName,
				amount: action.payload.amount,
				reference: action.payload.reference,
				comment: action.payload.comment,
				movementsType: action.payload.movementsType,
				bankAccount: action.payload.bankAccount,
				bankAccountName: action.payload.bankAccountName,
				type: action.payload.type,
			});
		default:
			return state;
	}
};

export default ReducerMovement;
