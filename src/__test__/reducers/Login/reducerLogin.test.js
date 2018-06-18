import 'jest-localstorage-mock';
import ReducerLogin from '../../../reducers/Login/reducerLogin';

import {
	login,
	logout,
	setEmail,
	setPassword,
} from '../../../actions/Login/actionsCreators';

describe('test Reducer Header', () => {
	const initialState = {
		auth: localStorage.getItem('token') || null,
		token: null,
		email: '',
		password: '',
	};

	/*
		Prueba que el reducer retorne el estado inicial cuando no se
		le pase algun valor
	*/
	it('return the initial state', () => {
		expect(ReducerLogin()).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el estado inicial cuando se le
		pasa un valor undefined
	*/
	it('return the initial state', () => {
		expect(ReducerLogin(undefined)).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el objecto inicial cuando se le
		pasa state undefined
	*/
	it('return the initial state', () => {
		expect(ReducerLogin(undefined, {})).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne los objectos por default cuando se le
		pasa tanto state y action undefined
	*/
	it('return the initial state', () => {
		expect(ReducerLogin(undefined, undefined)).toEqual(initialState);
	});

	it('return Method Login', () => {
		expect(ReducerLogin(initialState, login('token')))
			.toEqual({ ...initialState, token: 'token', auth: true });
	});

	it('return Method Logout', () => {
		expect(ReducerLogin(initialState, logout(null)))
			.toEqual({ ...initialState, token: null, auth: false });
	});

	it('return Method Set Email', () => {
		expect(ReducerLogin(initialState, setEmail('gregory@gmail.com')))
			.toEqual({ ...initialState, email: 'gregory@gmail.com' });
	});

	it('return Method Set Password', () => {
		expect(ReducerLogin(initialState, setPassword('123456')))
			.toEqual({ ...initialState, password: '123456' });
	}); 
});
