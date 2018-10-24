import {
	EDIT_USER,
	BLOCK_USER,
	DELETE_USER,
	SET_USER,
	PAGE_UP_USER,
	PAGE_DOWN_USER,
	US_OPEN_MODAL,
	CLOSE_MODAL,
} from '../../actions/users/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	lastName: '',
	phone: '',
	dni: '',
	birthDate: '',
	citizenship: 0,
	role: 0,
	isOpen: false,
	modalType: '',
	descripcion: '',
	statusValue: false,
	paginationPageUsers: 0,
	currentPageUsers: 0,
	currentPageSearch: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginationsUsers'))) {
	initialState.paginationPageUsers = JSON.parse(localStorage.getItem('paginationsUsers')).users || 0;
	initialState.currentPageUsers = JSON.parse(localStorage.getItem('paginationsUsers')).users || 0;
} else {
	initialState.paginationPageUsers = 0;
	initialState.currentPageUsers = 0;
}
const ReducerUser = (state = initialState, action = {}) => {
	switch (action.type) {
		case PAGE_UP_USER:
			return ({
				...state,
				paginationPageUsers: action.payload.paginationPageUsers,
				currentPageUsers: action.payload.currentPageUsers,
			});
		case PAGE_DOWN_USER:
			return ({
				...state,
				paginationPageUsers: action.payload.paginationPageUsers,
				currentPageUsers: action.payload.currentPageUsers,
			});
		case EDIT_USER:
			return ({
				...state,
			});
		case BLOCK_USER:
			return ({
				...state,
			});
		case DELETE_USER:
			return ({
				...state,
			});
		case CLOSE_MODAL:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				descripcion: '',
			});
		case US_OPEN_MODAL:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case SET_USER:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				lastName: action.payload.lastName,
				phone: action.payload.phone,
				dni: action.payload.dni,
				birthDate: action.payload.birthDate,
				citizenship: action.payload.citizenship,
				role: action.payload.role,
			});
		default:
			return state;
	}
};

export default ReducerUser;
