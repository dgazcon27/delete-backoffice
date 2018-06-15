import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	login,
	logout,
	setEmail,
	setPassword,
} from '../../../actions/Login/actionsCreators';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Actions Creator Login', () => {
	it('Login', () => {
		const store = mockStore({
			auth: null,
			token: null,
			email: '',
			password: '',
		});
		// Se despacha el accionCreator ha probar
		store.dispatch(login());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('LOGIN');
		store.clearActions();
	});

	it('Logout', () => {
		const store = mockStore({
			auth: null,
			token: null,
			email: '',
			password: '',
		});

		// Se despacha el accionCreator ha probar
		store.dispatch(logout());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('LOGOUT');
		store.clearActions();
	});

	it('Set Email', () => {
		const store = mockStore({
			auth: null,
			token: null,
			email: '',
			password: '',
		});

		// Se despacha el accionCreator ha probar
		store.dispatch(setEmail());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('SET_EMAIL');
	});

	it('Set Password', () => {
		const store = mockStore({
			auth: null,
			token: null,
			email: '',
			password: '',
		});

		// Se despacha el accionCreator ha probar
		store.dispatch(setPassword());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('SET_PASSWORD');
	});
});
