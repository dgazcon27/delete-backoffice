/* eslint no-unused-vars: "off" */
import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import { client } from '../config/configStore';

const REFRESH_TOKEN = gql`
	mutation refreshToken($token:String!) {
		refreshToken(token:$token) {
			token
		}
	}
`;

const parseJwt = (token) => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};

const verifyToken = store => next => (action) => {
	const result = next(action);
	setInterval(() => {
		const token = localStorage.getItem('token') || null;
		if (token !== null) {
			const infoToken = parseJwt(token);
			if (infoToken.exp < Math.trunc(Date.now() / 1000)) {
				client
					.mutate({
						mutation: REFRESH_TOKEN,
						variables: { token },
					})
					.then((response) => {
						localStorage.setItem('token', response.data.refreshToken.token);
					});
			}
		}
	}, 1000 * 60 * 100);

	return result;
};

export default verifyToken;
