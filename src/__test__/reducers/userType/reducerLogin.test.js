import ReducerUserType from '../../../reducers/userType/reducerUserType';

/*
	solo se probo con openModal porque es
	el unico que genera un cambio cuando
	se realicen las otras funcionalidades
	hay que incluirlas tambien
*/
import { openModal } from '../../../actions/userType/actionsCreators';

describe('test Reducer Header', () => {
	const initialState = {
		isOpen: false,
		modalType: 'type',
		name: 'name',
		id: 0,
		statusValue: 0,
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
			.toEqual({ ...initialState, modalType: 'open modal', isOpen: true });
	});
});
