import {
	LOGIN, 
	LOGOUT,
} from '../../actions/Login/actionsTypes';

const stateInitial = {
	auth: null,
	token: null,
	email: 'gregory.facyt@gmail.com	',
	password: '123456',
};

const ReducerLogin = (state={}, action) => {
	switch (action.type) {
		case LOGIN:
			console.log('LOGIN');
		case LOGOUT:
			console.log('LOGOUT');
		default: 
			return state
	}
};

export default ReducerLogin;