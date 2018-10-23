import {
	SET_ACCESS,
	OPEN_MODAL_ACCESS,
	CLOSE_MODAL_ACCESS,
	OPEN_ALERT_ACCESS,
	CLOSE_ALERT_ACCESS,
	DELETE_ACCESS,
} from '../../actions/Access/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	description: '',
	price: '',
	amount: '',
	location: 0,
	zone: 0,
	status: 1,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	currentPageSearch: 0,
};

const ReducerAccess = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_ACCESS:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				descriptionAccess: action.payload.descriptionAccess,
				price: action.payload.price,
				currency: action.payload.currency,
				location: action.payload.location,
				zone: action.payload.zone,
				status: action.payload.status,
			});
		case DELETE_ACCESS:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_ACCESS:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_ACCESS:
			return ({
				...state,
				isOpen: false,
				id: 0,
			});
		case OPEN_ALERT_ACCESS:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_ACCESS:
			return ({
				...state,
				alertOpen: false,
			});
		default:
			return state;
	}
};

export default ReducerAccess;
