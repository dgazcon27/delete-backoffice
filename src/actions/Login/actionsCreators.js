import fetch from 'isomorphic-fetch';
import {
	LOGIN,
	LOGOUT,
	SET_EMAIL,
	SET_PASSWORD,
	SET_ERROR_STATUS,
	SET_CURRENT_USERID,
} from './actionsTypes';

import { closeProfile } from '../../actions/Header/actionsCreators';
import { GET_CURRENT_USER } from '../../queries/users';
import { client } from '../../config/configStore';

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

export const setError = error => ({
	type: SET_ERROR_STATUS,
	payload: {
		description: SET_ERROR_STATUS,
		error,
	},
});

export const setCurrentUser = userId => ({
	type: SET_CURRENT_USERID,
	payload: {
		description: SET_CURRENT_USERID,
		userId,
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
					dispatch(setError(true));
				} else {
					localStorage.setItem('token', response.token);
					dispatch(login(response.token));
					client
						.query({
							query: GET_CURRENT_USER,
							variables: { token: response.token },
						})
						.then((res) => {
							localStorage.setItem('userId', parseInt(res.data.getCurrent.id, 10));
							dispatch(setCurrentUser(res.data.getCurrent.id));
						})
						.catch(() => {});
				}
			});
	};
};

export const requestLogout = (token) => {
	const query = `'http://localhost:8000/graphql/logout?token=${token}`;
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
				localStorage.clear();
			});
	};
};
