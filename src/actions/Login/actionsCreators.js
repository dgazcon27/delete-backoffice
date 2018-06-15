import fetch from 'isomorphic-fetch';

import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
} from './actionsTypes';

export const login = token => ({
	type: LOGIN,
	payload: {
		description: LOGIN,
		token,
	},
});

export const logout = token => ({
	type: LOGOUT,
	payload: {
		description: LOGOUT,
		token,
	},
});

export const setEmail = email => ({
	type: SET_EMAIL,
	payload: {
		description: SET_EMAIL,
		email,
	},
});

export const setPassword = password => ({
	type: SET_PASSWORD,
	payload: {
		description: SET_PASSWORD,
		password,
	},
});

export const requestLogin = (email, password) => {
	const query = 'http://localhost:8000/graphql/login';
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	};

	fetch(query, options)
		.then(response => response.json())
		.then((response) => {
			localStorage.setItem('token', response.token);
		});
};
