/* eslint no-unused-vars: "off" */
/* eslint function-paren-newline: "off" */

import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_ROLES } from '../../../queries/userType';
import { UserTypeTest } from '../../../components/UserType/userType';
// se dejara para realizar la prueba que falta import waitForExpect from 'wait-for-expect';

configure({ adapter: new Adapter() });

describe('Test <UserType />', () => {
/*
	const json = {
		data: {
			roles: {
				data: [
					{
						name: 'ADMIN',
						id: 1,
						description: 'ADMIN',
						status: {
							id: 1,
						},
					},
					{
						name: 'OWNER',
						id: 2,
						description: 'OWNER',
						status: {
							id: 1,
						},
					},
					{
						name: 'SOPORTE',
						id: 3,
						description: 'SOPORTE',
						status: {
							id: 1,
						},
					},
					{
						name: 'STAFF',
						id: 4,
						description: 'STAFF',
						status: {
							id: 1,
						},
					},
					{
						name: 'DJ NACIONAL',
						id: 5,
						description: 'DJ NACIONAL',
						status: {
							id: 1,
						},
					},
					{
						name: 'DJ INTERNACIONAL',
						id: 6,
						description: 'DJ INTERNACIONAL',
						status: {
							id: 1,
						},
					},
					{
						name: 'INVITADO DJ NACIONAL',
						id: 7,
						description: 'INVITADO DJ NACIONAL',
						status: {
							id: 1,
						},
					},
					{
						name: 'INVITADO DJ INTERNACIONAL',
						id: 8,
						description: 'INVITADO DJ INTERNACIONAL',
						status: {
							id: 1,
						},
					},
					{
						name: 'PROVEEDOR',
						id: 9,
						description: 'PROVEEDOR',
						status: {
							id: 1,
						},
					},
					{
						name: 'INVITADO PROVEEDOR',
						id: 10,
						description: 'INVITADO PROVEEDOR',
						status: {
							id: 1,
						},
					},
				],
				total: 14,
			},
		},
	};
*/

	const props = {
		id: 1,
		name: '',
		isOpen: false,
		classes: {},
		modalType: '',
		statusValue: 0,
		paginationPage: 1,
		currentPage: 0,
		actionSetRol: jest.fn(),
		actionOpenModal: jest.fn(),
		actionCloseModal: jest.fn(),
		blockRolMutation: jest.fn(),
		deleteRolMutation: jest.fn(),
		actionBlockUserType: jest.fn(),
		actionDeleteUserType: jest.fn(),
		actionChangePage: jest.fn(),
	};

	it('should render without error', () => {
		const component = renderer
			.create(<MockedProvider mocks={[]}><UserTypeTest {...props} /></MockedProvider>);
	});

	it('should render loading state initially', () => {
		const componentUserType = renderer
			.create(<MockedProvider mocks={[]}><UserTypeTest {...props} /></MockedProvider>);
		const tree = componentUserType.toJSON();
		expect(tree.children[0].children).toContain('Loading ...');
	});

	// Prueba que queda pendiente para luego replicarla al resto de los components
	/*
		it('should render UserType', async () => {
			console.log('json --->', JSON.stringify(json, undefined, 2));
			const paginationPage = 0;
			const mocks = {
			request: { query: GET_ROLES, variables: { paginationPage } },
			result: JSON.stringify(json),
			};

			console.log('mocks', mocks);

			const wrapper = renderer.create(
			<MockedProvider mocks={[mocks]} >
			<UserTypeTest {...props} />
			</MockedProvider>
			);

			await wait(0);
			console.log(wrapper.toJSON());
		});
	*/

	it('should show error UI', async () => {
		const mocks = {
			request: {
				query: GET_ROLES,
				variables: { page: 0 },
			},
			result: {
				errors: new Error('Error :/'),
			},
		};

		const component = renderer
			.create(
				<MockedProvider mocks={[mocks]} addTypename={false}>
					<UserTypeTest {...props} />
				</MockedProvider>,
			);

		await wait(0); // wait for response
		const tree = component.toJSON();
		expect(tree.children).toContain(' Error :( ');
	});
});
