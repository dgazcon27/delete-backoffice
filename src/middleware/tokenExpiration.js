/* eslint no-unused-vars: "off" */

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
				const query = `http://localhost:8000/graphql/logout?token=${token}`;
				const options = {
					headers: {
						'Content-Type': 'application/json',
					},
				};

				fetch(query, options)
					.then(() => {
						localStorage.clear();
						window.location.reload();
					});
			}
		}
	}, 3600000);

	return result;
};

export default verifyToken;
