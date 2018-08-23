import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
	SET_ERROR_STATUS,
	SET_CURRENT_USERID,
} from '../../actions/Login/actionsTypes';

const initialState = {
	error: false,
	auth: Boolean(localStorage.getItem('token')),
	token: localStorage.getItem('token') || null,
	email: '',
	password: '',
	userId: localStorage.getItem('userId') || 0,
};

const ReducerLogin = (state = initialState, action = {}) => {
	switch (action.type) {
		case LOGIN:
			return ({
				...state,
				token: action.payload.token,
				auth: true,
			});
		case LOGOUT:
			return ({
				...state,
				token: action.payload.token,
				auth: false,
			});
		case SET_EMAIL:
			return ({
				...state,
				email: action.payload.email,
			});
		case SET_PASSWORD:
			return ({
				...state,
				password: action.payload.password,
			});
		case SET_ERROR_STATUS:
			return ({
				...state,
				error: action.payload.error,
			});
		case SET_CURRENT_USERID:
			return ({
				...state,
				userId: action.payload.userId,
			});
		default:
			return state;
	}
};

export default ReducerLogin;