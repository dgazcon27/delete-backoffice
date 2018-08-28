import {
	EDIT_USER,
	BLOCK_USER,
	DELETE_USER,
} from '../../actions/users/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	isOpen: false,
	modalType: '',
	descripcion: '',
	statusValue: 0,
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
		default:
			return state;
	}
};

export default ReducerUser;
