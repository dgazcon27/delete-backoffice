import fetch from 'isomorphic-fetch';

import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
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

export const setEmail = (email) => ({
	type: SET_EMAIL,
	payload: {
		description: LOGOUT,
		email,
	},
});

export const setPassword = (password) => ({
	type: SET_PASSWORD,
	payload: {
		description: LOGOUT,
		password,
	},
});

export const requestLogin = (email, password, dispatch) => {
	fetch('http://localhost:8000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"email" : email,
			"password" : password,
		})
	})
	.then(response => {
		console.log(response);
		dispatch(login());
	})
	.catch(e => e);
}
