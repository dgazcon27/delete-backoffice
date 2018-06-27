import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
	login,
	logout,
	setEmail,
	setPassword,
} from '../../../actions/Login/actionsCreators';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Actions Creator Login', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

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

	it('requestLogin', async () => {
		const store = mockStore({
			auth: null,
			token: null,
			email: '',
			password: '',
		});

		// Se crea el Json de respuesta al realizar la peticion
		const token = 'Key Token';
		const user = {
			birthDate: '2018-05-25',
			citizenship_id: 1,
			createdBy_id: 1,
			created_at: '2018-05-25 16:32:41',
			dni: 'MfMj2hOxhu',
			email: 'ZIA9b5pK0E@gmail.com',
			id: 1,
			lastName: 'p7FKuWRy0L',
			name: 'XTMnxVhSu5',
			phone: '5FCpmOyKr2',
			status_id: 1,
			updatedBy_id: 1,
			updated_at: '2018-05-25 16:32:41',
		};

		const response = { token, user };

		//	Se inicializa fetchMock, se le dice que al realizar la
		//	petición responda con el objeto response.
		fetchMock.mock('http://localhost:3000', response);

		//	Se realiza la petición
		const res = await fetch('http://localhost:3000');

		//	Se verifica que el cuerpo de la repuesta coincida con el
		//	objeto response
		expect(res.body).toEqual(JSON.stringify(response));

		// Se despacha el accionCreator ha probar
		store.dispatch(login());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('LOGIN');
		fetchMock.restore();
	});
});
