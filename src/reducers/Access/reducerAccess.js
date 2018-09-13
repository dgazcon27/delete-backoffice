import {
	SET_ACCESS,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_MODAL,
	CLOSE_ALERT,
	PAGE_UP_ACC,
	PAGE_DOWN_ACC,
	EDIT_ACCESS,
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

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPageAcc = JSON.parse(localStorage.getItem('paginations')).access || 0;
	initialState.currentPageAcc = JSON.parse(localStorage.getItem('paginations')).access || 0;
} else {
	initialState.paginationPageAcc = 0;
	initialState.currentPageAcc = 0;
}

const ReducerAccess = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_ACC:
			return ({
				...state,
				paginationPageAcc: action.payload.paginationPageAcc,
				currentPageAcc: action.payload.currentPageAcc,
			});
		case PAGE_DOWN_ACC:
			return ({
				...state,
				paginationPageAcc: action.payload.paginationPageAcc,
				currentPageAcc: action.payload.currentPageAcc,
			});
		case EDIT_ACCESS:
			return ({
				...state,
			});
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
		case OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
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
		default:
			return state;
	}
};

export default ReducerAccess;
