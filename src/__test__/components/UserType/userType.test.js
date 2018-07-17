import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_ROLES } from '../../../queries/userType';
import { UserTypeTest } from '../../../components/UserType/userType';
// import wait from 'waait';

configure({ adapter: new Adapter() });

it('should render without error', () => {
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

	renderer.create(<MockedProvider mocks={[]}><UserTypeTest {...props} /></MockedProvider>);
});


it('should render loading state initially', () => {
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

	const paginationPage = 1;
	const roles = {
		data: [{
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
		}],
	};

	const mocks = [{
		request: {
			query: GET_ROLES,
			variables: { paginationPage },
		},
		result: { data: { roles } },
	}];

	renderer.create(<MockedProvider mocks={mocks}><UserTypeTest {...props} /></MockedProvider>);
});
