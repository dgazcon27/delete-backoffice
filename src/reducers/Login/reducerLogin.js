import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
} from '../../actions/Login/actionsTypes';

const initialState = {
	auth: localStorage.getItem('token') || null,
	token: null,
	email: '',
	password: '',
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
		default:
			return state;
	}
};

export default ReducerLogin;
