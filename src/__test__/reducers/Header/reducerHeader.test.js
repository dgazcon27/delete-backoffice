import ReducerHeader from '../../../reducers/Header/reducerHeader';
import {
	openSideBar,
	closeSideBar,
	openProfile,
	closeProfile,
} from '../../../actions/Header/actionsCreators';

describe('test Reducer Header', () => {
	const initialState = {
		openDrawer: false,
		openMenuProfile: null,
	};

	/*
		Prueba que el reducer retorne el estado inicial cuando no se
		le pase algun valor
	*/
	it('return the initial state', () => {
		expect(ReducerHeader()).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el estado inicial cuando se le
		pasa un valor undefined
	*/
	it('return the initial state', () => {
		expect(ReducerHeader(undefined)).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne el objecto inicial cuando se le
		pasa state undefined
	*/
	it('return the initial state', () => {
		expect(ReducerHeader(undefined, {})).toEqual(initialState);
	});

	/*
		Prueba que el reducer retorne los objectos por default cuando se le
		pasa tanto state y action undefined
	*/
	it('return the initial state', () => {
		expect(ReducerHeader(undefined, undefined)).toEqual(initialState);
	});

	it('return openSideBar', () => {
		expect(ReducerHeader(initialState, openSideBar()))
			.toEqual({ openDrawer: true, openMenuProfile: null });
	});

	it('return openProfile', () => {
		const event = document.createEvent('UIEvents');
		expect(ReducerHeader(initialState, openProfile(event)))
			.toEqual({ openDrawer: false, openMenuProfile: event.currentTarget });
	});

	it('return closeSideBar', () => {
		const event = document.createEvent('UIEvents');
		expect(ReducerHeader({ openDrawer: true, openMenuProfile: event.currentTarget }, closeSideBar()))
			.toEqual(initialState);
	});
});

