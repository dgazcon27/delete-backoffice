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
	paginationPage: 0,
	currentPage: 0,
};

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
