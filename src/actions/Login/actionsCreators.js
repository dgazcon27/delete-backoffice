import {
	LOGIN, 
	LOGOUT
} from './actionsTypes';

export const login = () => ({
	type: LOGIN,
	payload: {
		description: LOGIN,
	},
});

export const logout = () => ({
	type: LOGOUT,
	payload: {
		description: LOGOUT,
	},
});