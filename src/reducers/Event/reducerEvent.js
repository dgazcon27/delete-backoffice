import {
	OPEN_MODAL_EVENT,
	CLOSE_MODAL_EVENT,
	OPEN_ALERT_EVENT,
	CLOSE_ALERT_EVENT,
	SET_EVENT,
	SET_COUNTRIES_STATES_EVENT,
} from '../../actions/Event/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	description: '',
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	rolDescription: '',
	statusValue: 0,
	paginationPage: 0,
	states: [],
};

const ReducerEvent = (state = initialState, action = {}) => {
	switch (action.type) {
		case OPEN_MODAL_EVENT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_EVENT:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT_EVENT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_EVENT:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_EVENT:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.description,
				presaleStart: action.payload.presaleStart,
				presaleClosure: action.payload.presaleClosure,
				eventStart: action.payload.eventStart,
				eventClosure: action.payload.eventClosure,
				status: action.payload.status,
				state: action.payload.state,
				country: action.payload.country,
				createdBy: action.payload.createdBy,
			});
		case SET_COUNTRIES_STATES_EVENT:
			return ({
				...state,
				states: action.payload.states,
			});
		default:
			return state;
	}
};

export default ReducerEvent;
