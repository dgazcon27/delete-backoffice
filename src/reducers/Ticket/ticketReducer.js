import {
	OPEN_ASSIGN_MODAL_TICKET,
	CLOSE_ASSIGN_MODAL_TICKET,
	SET_DATA_TICKET_USER,
	SET_ALERT_ASSIGN_TICKET,
	SHOW_LOADING_ASSIGN_TICKET,
} from '../../actions/Ticket/actionsTypes';

const initialState = {
	modalType: '',
	isOpen: false,
	id: 0,
	existUser: false,
	name: '',
	email: '',
	phone: '',
	purchase: 0,
	isAlert: false,
	isLoading: false,
};


const ReducerTicket = (state = initialState, action = {}) => {
	switch (action.type) {
		case OPEN_ASSIGN_MODAL_TICKET:
			return ({
				...state,
				modalType: action.payload.modalType,
				purchase: action.payload.purchase,
				isOpen: true,
			});
		case CLOSE_ASSIGN_MODAL_TICKET:
			return ({
				...state,
				modalType: action.payload.modalType,
				isOpen: false,
				id: action.payload.id,
				name: '',
				email: '',
				phone: '',
				existUser: false,
				purchase: 0,
			});
		case SET_DATA_TICKET_USER:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				email: action.payload.email,
				phone: action.payload.phone,
				existUser: action.payload.existUser,
			});
		case SET_ALERT_ASSIGN_TICKET:
			return ({
				...state,
				isAlert: action.payload.isAlert,
			});
		case SHOW_LOADING_ASSIGN_TICKET:
			return ({
				...state,
				isLoading: action.payload.isLoading,
			});
		default:
			return state;
	}
};

export default ReducerTicket;

