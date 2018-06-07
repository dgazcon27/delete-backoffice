import fetch from 'isomorphic-fetch';

import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
} from './actionsTypes';

export const login = (token) => ({
	type: LOGIN,
	payload: {
		description: LOGIN,
		token,
	},
});

export const logout = (token) => ({
	type: LOGOUT,
	payload: {
		description: LOGOUT,
		token,
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

export const requestLogin = (email, password, getTokenMutation) => {
	const query = 'http://localhost:8000/login';
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"email" : email,
			"password" : password,
		})
	};

	return dispatch => {
		
		/* example fetch(query, option)
           .then( response => {
                   dispatch(login('CaRmEn'));
                   dispatch(logout(null));
                   console.log(response);
           }) */


		fetch(query, options)
			.then(async response => {
				const result = await getTokenMutation({
					variables: {
						email,
						password,
					}
				});
				console.log(response);
				console.log(result);
			})
	}
}
