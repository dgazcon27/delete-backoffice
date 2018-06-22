import fetch from 'isomorphic-fetch';

import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
} from './actionsTypes';

import { closeProfile } from '../../actions/Header/actionsCreators';

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

	return (dispatch) => {
		fetch(query, options)
			.then(response => response.json())
			.then((response) => {
				if (response.error) {
					return;
				}

				localStorage.setItem('token', response.token);
				dispatch(login(response.token));
			});
	};
};

export const requestLogout = (token) => {
	const query = `http://localhost:8000/graphql/logout?token=${token}`;
	const options = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return (dispatch) => {
		fetch(query, options)
			.then(() => {
				dispatch(closeProfile());
				dispatch(logout(null));
				localStorage.setItem('token', null);
				localStorage.removeItem('token');
			});
	};
};
