import 'jest-localstorage-mock';
import ReducerUserType from '../../../reducers/userType/reducerUserType';

/*
	solo se probo con openModal porque es
	el unico que genera un cambio cuando
	se realicen las otras funcionalidades
	hay que incluirlas tambien
*/
import { openModal } from '../../../actions/userType/actionsCreators';

describe('test Reducer UserType ', () => {
	const initialState = {
		id: 0,
		name: '',
		isOpen: false,
		alertOpen: false,
		alertType: '',
		modalType: '',
		rolDescription: '',
		statusValue: false,
		paginationPage: 0,
		currentPage: 0,
		paginationPageSearch: 0,
		currentPageSearch: 0,
	};

	// Se inicializa paginationPage y currentPage para que se sincronize con el localstorage
	if (JSON.parse(localStorage.getItem('paginations'))) {
		initialState.paginationPage = JSON.parse(localStorage.getItem('paginations')).userType;
		initialState.currentPage = JSON.parse(localStorage.getItem('paginations')).userType;
	} else {
		initialState.paginationPage = 0;
		initialState.currentPage = 0;
	}

	/*
		Prueba que el reducer retorne el estado inicial cuando no se
		le pase algun valor
	*/
	it('return the initial state 1', () => {
		expect(ReducerUserType()).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el estado inicial cuando se le
		pasa un valor undefined
	*/
	it('return the initial state 2', () => {
		expect(ReducerUserType(undefined)).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el objecto inicial cuando se le
		pasa state undefined
	*/
	it('return the initial state 3', () => {
		expect(ReducerUserType(undefined, {})).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne los objectos por default cuando se le
		pasa tanto state y action undefined
	*/
	it('return the initial state 4', () => {
		expect(ReducerUserType(undefined, undefined)).toEqual(initialState);
	});

	it('return Method Open Modal', () => {
		const rol = {
			status: { id: 1 },
			name: 'ADMIN',
			active: true,
			id: 1,
		};

		expect(ReducerUserType(initialState, openModal('TYPE_OF_MODAL_1', rol)))
			.toEqual({
				...initialState,
				modalType: 'TYPE_OF_MODAL_1',
				isOpen: true,
				name: 'ADMIN',
				statusValue: true,
				id: 1,
			});
	});
});
