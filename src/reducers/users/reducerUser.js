import {
	EDIT_USER,
	BLOCK_USER,
	DELETE_USER,
	SET_USER,
	OPEN_MODAL_USER,
	CLOSE_MODAL_USER,
	OPEN_ALERT_USER,
	CLOSE_ALERT_USER,
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
	alertOpen: false,
	alertType: '',
	modalType: '',
	descripcion: '',
	statusValue: false,
	paginationPage: 0,
	currentPage: 0,
	currentPageSearch: 0,
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
				id: action.payload.id,
				statusValue: action.payload.statusValue,
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
		case OPEN_MODAL_USER:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				name: action.payload.name,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_USER:
			return ({
				...state,
				isOpen: false,
				id: 0,
				name: '',
				modalType: '',
				statusValue: '',
			});
		case OPEN_ALERT_USER:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_USER:
			return ({
				...state,
				alertOpen: false,
			});
		default:
			return state;
	}
};

export default ReducerUser;
