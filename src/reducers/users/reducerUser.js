import {
	EDIT_USER,
	BLOCK_USER,
	DELETE_USER,
	SET_USER,
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
	paginationPage: 0,
	currentPage: 0,
	currentPageSearch: 0,
};

// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
if (JSON.parse(localStorage.getItem('paginations'))) {
	initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).userType;
	initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).userType;
} else {
	initialState.paginationPage = 0;
	initialState.currentPage = 0;
}

const ReducerUser = (state = initialState, action = {}) => {
	switch (action.type) {
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
