import configureStore from 'redux-mock-store';

import {
	editUser,
	blockUser,
	deleteUser,
} from '../../../actions/users/actionsCreators';

const mockStore = configureStore();

describe('Test Actions Creator Users', () => {
	it('Edit User', () => {
		const store = mockStore({});

		// Se despacha el actionCreator ha probar
		store.dispatch(editUser());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('EDIT_USER');
	});

	it('Block User', () => {
		const store = mockStore({});

		// Se despacha el actionCreator ha probar
		store.dispatch(blockUser());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('BLOCK_USER');
	});

	it('Delete User', () => {
		const store = mockStore({});

		// Se despacha el actionCreator ha probar
		store.dispatch(deleteUser());
		const actions = store.getActions();

		// Se verifica que se despacho una unica accion
		expect(actions.length).toBe(1);

		// Se verifica que la accion ejecutada sea la correcta
		expect(actions[0].type).toEqual('DELETE_USER');
	});
});
