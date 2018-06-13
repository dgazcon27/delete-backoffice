import configureStore from 'redux-mock-store';

import {
	openSideBar,
	closeSideBar,
	openProfile,
	closeProfile,
} from '../../../actions/Header/actionsCreators';


const mockStore = configureStore();

describe('Test Actions Creator Header', () => {
	it('Open Side Bar', () => {
		const store = mockStore({
			openDrawer: false,
			openMenuProfile: null,
		});
		// Se despacha el accionCreator ha probar
		store.dispatch(openSideBar());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('OPEN_SIDEBAR2');
	});

	it('Close Side Bar', () => {
		const store = mockStore({
			openDrawer: false,
			openMenuProfile: null,
		});

		// Se despacha el accionCreator ha probar
		store.dispatch(closeSideBar());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('CLOSE_SIDEBAR');
	});

	it('Open Profile', () => {
		const store = mockStore({
			openDrawer: false,
			openMenuProfile: null,
		});
		// se crea un evento
		const event = document.createEvent('UIEvents');

		// Se despacha el accionCreator ha probar
		store.dispatch(openProfile(event));
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('OPEN_PROFILE');
	});

	it('Close Profile', () => {
		const store = mockStore({
			openDrawer: false,
			openMenuProfile: null,
		});
		// Se despacha el accionCreator ha probar
		store.dispatch(closeProfile());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('CLOSE_PROFILE');
	});
});
