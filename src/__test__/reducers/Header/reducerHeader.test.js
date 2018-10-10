import ReducerHeader from '../../../reducers/Header/reducerHeader';
import {
	openSideBar,
	closeSideBar,
	openProfile,
	closeProfile,
} from '../../../actions/Header/actionsCreators';

describe('test Reducer Header', () => {
	const initialState = {
		openDrawer: true,
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

	it('return Method openSideBar', () => {
		expect(ReducerHeader(initialState, openSideBar()))
			.toEqual({ openDrawer: true, openMenuProfile: null });
	});

	it('return Method closeSideBar', () => {
		const event = document.createEvent('UIEvents');
		expect(ReducerHeader(
			{
				openDrawer: true,
				openMenuProfile: event.currentTarget,
			},
			closeSideBar(),
		)).toEqual({
			openDrawer: false,
			openMenuProfile: null,
		});
	});

	it('return Method openProfile', () => {
		const event = document.createEvent('UIEvents');
		expect(ReducerHeader({
			openDrawer: false,
			openMenuProfile: null,
		}, openProfile(event)))
			.toEqual({ openDrawer: false, openMenuProfile: event.currentTarget });
	});

	it('return Method closeProfile', () => {
		const event = document.createEvent('UIEvents');
		expect(ReducerHeader(
			{
				openDrawer: false,
				openMenuProfile: event.currentTarget,
			},
			closeProfile(),
		)).toEqual({
			openDrawer: false,
			openMenuProfile: null,
		});
	});
});
