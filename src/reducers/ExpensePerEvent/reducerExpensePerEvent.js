import {
	OPEN_MODAL_EXPENSE_PER_EVENT,
	CLOSE_MODAL_EXPENSE_PER_EVENT,
} from '../../actions/ExpensePerEvent/actionsTypes';

const initialState = {
	id: undefined,
	reference: '',
	amount: 0,
	category: '',
	bankAccount: '',
	statusValue: false,
	isOpen: false,
};

const ReducerExpensePerEvent = (state = initialState, action = {}) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

export default ReducerExpensePerEvent;
