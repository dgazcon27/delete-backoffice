import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from '../../../components/Login/login';

configure({ adapter: new Adapter() });

const setup = () => {
	const props = {
		error: false,
		email: 'gregory@gmail.com',
		password: '123456',
		actionLogin: jest.fn(),
		actionSetEmail: jest.fn(),
		actionSetPassword: jest.fn(),
		classes: {},
	};

	const enzymeWrapper = mount(<Login {...props} />);

	return {
		props,
		enzymeWrapper,
	};
};

describe('component Login', () => {
	it('component Login', () => {
		const { props, enzymeWrapper } = setup();
		expect(enzymeWrapper.find('Grid').length).toBe(2);
		expect(enzymeWrapper.find('input').length).toBe(2);
		expect(enzymeWrapper.find('#email').length).toBe(1);
		expect(enzymeWrapper.find('#password').length).toBe(1);
		expect(enzymeWrapper.find('button').simulate('click', props.actionLogin()));
	});
});
