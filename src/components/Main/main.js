import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Login from '../Login/login';
import { Dashboard, Presale, BoxOffice } from '../hola';
import UserType from '../UserType/userType';

const Main = ({ props }) => (
	<main className={props.class.content}>
		<div className={props.class.toolbar} />
		<Switch>
			<Route exact path='/' component={Login} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/pre-sale' component={Presale} />
			<Route path='/box-office' component={BoxOffice} />
			<Route path='/user-type' component={UserType} />
		</Switch>
	</main>
);

Main.propTypes = {
	props: PropTypes.shape({
		class: PropTypes.shape({
			content: PropTypes.object,
			toolbar: PropTypes.object,
		}),
	}),
};

export default Main;
