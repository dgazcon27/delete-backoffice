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
		description: LOGOUT,
		email,
	},
});

export const setPassword = password => ({
	type: SET_PASSWORD,
	payload: {
		description: LOGOUT,
		password,
	},
});

export const requestLogin = (email, password, getTokenMutation) => {
	const query = 'http://localhost:8000/login';
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
			.then(async () => {
				await getTokenMutation({
					variables: {
						email,
						password,
					},
				}); 
				
				dispatch(login());
			});
	}

};
