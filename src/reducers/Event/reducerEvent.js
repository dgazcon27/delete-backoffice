import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP_EV,
	PAGE_DOWN_EV,
	SET_EVENT,
	SET_COUNTRIES_STATES,
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
	paginationPageEv: 0,
	states: [],
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage


if (JSON.parse(localStorage.getItem('paginations')).events) {
	initialState.paginationPageEv = JSON.parse(localStorage.getItem('paginations')).events;
	initialState.currentPageEv = JSON.parse(localStorage.getItem('paginations')).events;
} else {
	initialState.paginationPageEv = 0;
	initialState.currentPageEv = 0;
}

const ReducerEvent = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_EV:
			return ({
				...state,
				paginationPageEv: action.payload.paginationPageEv,
				currentPageEv: action.payload.currentPageEv,
			});
		case PAGE_DOWN_EV:
			return ({
				...state,
				paginationPageEv: action.payload.paginationPageEv,
				currentPageEv: action.payload.currentPageEv,
			});
		case OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case OPEN_ALERT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT:
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
		case SET_COUNTRIES_STATES:
			return ({
				...state,
				states: action.payload.states,
			});
		default:
			return state;
	}
};

export default ReducerEvent;
