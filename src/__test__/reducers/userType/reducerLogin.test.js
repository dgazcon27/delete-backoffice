import ReducerUserType from '../../../reducers/userType/reducerUserType';

import {
	editUserType,
	blockUserType,
	deleteUserType,
	openModal,
	closeModal,
} from '../../../actions/userType/actionsCreators';

describe('test Reducer Header', () => {
	const initialState = {
		openModal: false,
		modalType: null,
	};

	/*
		Prueba que el reducer retorne el estado inicial cuando no se
		le pase algun valor
	*/
	it('return the initial state', () => {
		expect(ReducerUserType()).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el estado inicial cuando se le
		pasa un valor undefined
	*/
	it('return the initial state', () => {
		expect(ReducerUserType(undefined)).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el objecto inicial cuando se le
		pasa state undefined
	*/
	it('return the initial state', () => {
		expect(ReducerUserType(undefined, {})).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne los objectos por default cuando se le
		pasa tanto state y action undefined
	*/
	it('return the initial state', () => {
		expect(ReducerUserType(undefined, undefined)).toEqual(initialState);
	});

	it('return Method Open Modal', () => {
		expect(ReducerUserType(initialState, openModal('open modal')))
			.toEqual({ ...initialState, modalType: 'open modal', openModal: true });
	});
});
