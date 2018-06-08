import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,

} from '../../actions/Login/actionsTypes';

const stateInitial = {
	auth: null,
	token: null,
	email: '',
	password: '',
};

const ReducerLogin = (state = stateInitial, action) => {
	switch (action.type) {
		case LOGIN:
			return ({
				...state,
				token: action.payload.token,
			});
		case LOGOUT:
			return ({
				...state,
				token: action.payload.token,
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
