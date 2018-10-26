// eslint-disable-next-line

// import { applyMiddleware } from 'redux';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
	uri: 'http://127.0.0.1:8000/graphql',
	request: (operation) => {
		const token = `Bearer ${localStorage.getItem('token') || ''}`;
		operation.setContext({
			headers: {
				authorization: token,
			},
		});
	},
});

export const getMiddleware = () => {
	/* middleware ha usarse si se esta en produccion ò Desarrollo */
	/* if (false) {
		return applyMiddleware(promiseMiddleware, localStorageMiddleware);
	}
	return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger()); */
};
