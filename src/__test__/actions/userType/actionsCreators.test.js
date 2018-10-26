import configureStore from 'redux-mock-store';

import {
	// editUserType,
	// deleteUserType,
	openModal,
	closeModal,
} from '../../../actions/userType/actionsCreators';

const mockStore = configureStore();

describe('Test Actions Creator UserType', () => {
	// it('Edit User Type', () => {
	// 	const store = mockStore({});

	// 	// Se despacha el actionCreator ha probar
	// 	store.dispatch(editUserType());
	// 	const actions = store.getActions();

	// 	// Se verifica que se despacho una unica accion
	// 	expect(actions.length).toBe(1);

	// 	// Se verifica que la accion ejecutada sea la correcta
	// 	expect(actions[0].type).toEqual('EDIT_USER_TYPE');
	// });

	/* it('Block User Type', () => {
		//const store = mockStore({});

		// Se despacha el actionCreator ha probar
		// store.dispatch(blockUserType());
		// const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		// expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		// expect(actions[0].type).toEqual('BLOCK_USER_TYPE');
	}); */

	// it('Delete User Type', () => {
	// 	const store = mockStore({});

	// 	// Se despacha el actionCreator ha probar
	// 	store.dispatch(deleteUserType());
	// 	const actions = store.getActions();

	// 	// Se verifica que se despacho una unica accion
	// 	expect(actions.length).toBe(1);

	// 	// Se verifica que la accion ejecutada sea la correcta
	// 	expect(actions[0].type).toEqual('DELETE_USER_TYPE');
	// });

	it('Open Modal', () => {
		const store = mockStore({});
		const rol = {
			status: { id: 1 },
			name: 'ADMIN',
			id: 1,
		};

		// Se despacha el actionCreator ha probar
		store.dispatch(openModal('TYPE_OF_MODAL', rol));
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('UST_OPEN_MODAL');
	});

	it('Close Modal', () => {
		const store = mockStore({});

		// Se despacha el actionCreator ha probar
		store.dispatch(closeModal());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('CLOSE_MODAL');
	});
});
