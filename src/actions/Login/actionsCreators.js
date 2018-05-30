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

export const requestLogin = (dispatch) => {
	fetch('http://localhost:8000/login', {  
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:8000',
		},
		body: JSON.stringify({
			email: 'ZIA9b5pK0E@gmail.com',
			password: 'secret',
		})
	})
	.then(response => {
		console.log(response);
	})
	.catch(e => e);
} 