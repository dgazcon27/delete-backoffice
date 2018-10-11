import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP_EV,
	PAGE_DOWN_EV,
	SET_EVENT,
	SET_COUNTRIES_STATES,
	CLEAN_STATE_COUNTRY,
	SET_PRESALE,
	SET_CLOSE_PRESALE,
	SET_EVENT_START,
	SET_EVENT_CLOSE,
	SET_EVENT_NAME,
	SET_EVENT_DESCRIPTION,
	SET_EVENT_STATUS,
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


if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPageEv = JSON.parse(localStorage.getItem('paginations')).events || 0;
	initialState.currentPageEv = JSON.parse(localStorage.getItem('paginations')).events || 0;
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
		case CLEAN_STATE_COUNTRY:
			return ({
				...state,
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
		case SET_EVENT_NAME:
			return ({
				...state,
				name: action.payload.name,
			});
		case SET_EVENT_DESCRIPTION:
			return ({
				...state,
				description: action.payload.description,
			});
		case SET_EVENT_STATUS:
			return ({
				...state,
				status: action.payload.status,
			});
		case SET_PRESALE:
			return ({
				...state,
				presaleStart: action.payload.presaleStart,
			});
		case SET_CLOSE_PRESALE:
			return ({
				...state,
				presaleClosure: action.payload.presaleClosure,
			});
		case SET_EVENT_START:
			return ({
				...state,
				eventStart: action.payload.eventStart,
			});
		case SET_EVENT_CLOSE:
			return ({
				...state,
				eventClosure: action.payload.eventClosure,
			});
		default:
			return state;
	}
};

export default ReducerEvent;
