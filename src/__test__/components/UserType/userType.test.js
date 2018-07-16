import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_ROLES } from '../../../queries/userType';
import { UserTypeTest } from '../../../components/UserType/userType';

describe('component UserType', () => {
	it('Mounted UserType', async () => {
		const props = {
			id: 1,
			name: '',
			isOpen: false,
			classes: {},
			modalType: '',
			statusValue: 0,
			paginationPage: 1,
			actionSetRol: jest.fn(),
			actionOpenModal: jest.fn(),
			actionCloseModal: jest.fn(),
			blockRolMutation: jest.fn(),
			deleteRolMutation: jest.fn(),
			actionBlockUserType: jest.fn(),
			actionDeleteUserType: jest.fn(),
		};

		const mocks = [{
			request: { query: GET_ROLES },
			result: {
				data: {
					cat: {
						__typename: 'Cat',
						id: '123',
						name: 'Cat 123',
					},
				},
			},
		}];

		const wrapper = mount((
			<MockedProvider mocks={mocks}>
				<UserTypeTest {...props} />
			</MockedProvider>
		));

		await wait(0); // Wait a tick to get past the loading state
		expect(wrapper.text()).toContain('id: 123');
		expect(wrapper.text()).toContain('name: Cat 123');
	});
});
