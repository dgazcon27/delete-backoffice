import {
	PAGE_UP,
	PAGE_DOWN,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	SET_GUEST,
} from '../../actions/Guest/actionsTypes';

import { SET_SEARCH_INVITED } from '../../actions/Search/actionsTypesSearchRoles';

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

if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).invited || 0;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).invited || 0;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerGuest = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
			});
		case PAGE_DOWN:
			return ({
				...state,
				paginationPage: action.payload.paginationPage,
				currentPage: action.payload.currentPage,
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
		case SET_SEARCH_INVITED:
			return ({
				...state,
				query: action.payload.search,
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
