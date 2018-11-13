import {
	OPEN_MODAL_GUEST,
	OPEN_ALERT_GUEST,
	CLOSE_MODAL_GUEST,
	CLOSE_ALERT_GUEST,
	SET_GUEST,
} from '../../actions/Guest/actionsTypes';

const initialState = {
	description: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	currentPageSearch: 0,
	query: '',
	id: 0,
};

const ReducerGuest = (state = initialState, action = {}) => {
	switch (action.type) {
		case OPEN_MODAL_GUEST:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_GUEST:
			return ({
				...state,
				isOpen: false,
				id: 0,
			});
		case OPEN_ALERT_GUEST:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_GUEST:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_GUEST:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				lastName: action.payload.lastName,
				phone: action.payload.phone,
				dni: action.payload.dni,
				citizenship: action.payload.citizenship,
				event: action.payload.event,
				status: action.payload.status,
				access: action.payload.access,
				role: action.payload.role,
				typeInvited: action.payload.typeInvited,
			});
		default:
			return state;
	}
};

export default ReducerGuest;
