import {
	SET_ALERT_MOVEMENT,
	SET_DATA_MOVEMENT,
	SET_EVENT_MOVEMENT,
	OPEN_MODAL_EXPENSE_PER_EVENT,
	CLOSE_MODAL_EXPENSE_PER_EVENT,
	OPEN_MODAL_INCOME_PER_EVENT,
	CLOSE_MODAL_INCOME_PER_EVENT,
} from '../../actions/Movement/actionsTypes';

const initialState = {
	movementsType: '',
	amount: 0,
	event: -1,
	reference: '',
	comment: '',
	type: '',
	bankAccount: 0,
	category: 0,
	createdBy: 0,
	updatedBy: 0,
	isAlert: false,
	typeAlert: '',
	id: undefined,
	statusValue: false,
	isOpen: false,
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
				category: action.payload.category,
				reference: action.payload.reference,
				comment: action.payload.comment,
				movementsType: action.payload.movementsType,
				bankAccount: action.payload.bankAccount,
				bankAccountName: action.payload.bankAccountName,
				type: action.payload.type,
			});
		case SET_EVENT_MOVEMENT:
			return ({
				...state,
				event: action.payload.event,
				eventName: action.payload.eventName,
			});
		case OPEN_MODAL_EXPENSE_PER_EVENT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_EXPENSE_PER_EVENT:
			return ({
				...state,
				isOpen: false,
				id: undefined,
				modalType: '',
				statusValue: '',
			});
		case OPEN_MODAL_INCOME_PER_EVENT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_INCOME_PER_EVENT:
			return ({
				...state,
				isOpen: false,
				id: undefined,
				modalType: '',
				statusValue: '',
			});
		default:
			return state;
	}
};

export default ReducerMovement;
