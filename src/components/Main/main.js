import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ComponentUserType from '../UserType/componentUserType';
import Bank from '../Bank/bank';
import BankCreate from '../Bank/bankCreate';
import BankEdit from '../Bank/bankEdit';
import UserTypeCreate from '../UserType/userTypeCreate';
import UserTypeEdit from '../UserType/userTypeEdit';
import Users from '../Users/users';
import LocationCreate from '../Location/locationCreate';
import LocationEdit from '../Location/locationEdit';
import ComponentLocation from '../Location/ComponentLocation';

import {
	Dashboard,
	Presale,
	Guests,
	Events,
	Djs,
	Categories,
	Departments,
	Staff,
} from '../hola';

const Main = (props) => {
	const classes = props.class;
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Switch>
				<Route exact path='/' component={Dashboard} />
				<Route path='/users' component={Users} />
				<Route path='/user-type' component={ComponentUserType} />
				<Route path='/user-type-edit' component={UserTypeEdit} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/tables' component={ComponentLocation} />
				<Route path='/create-tables' component={LocationCreate} />
				<Route path='/edit-tables' component={LocationEdit} />
				<Route path='/guests' component={Guests} />
				<Route path='/events' component={Events} />
				<Route path='/djs' component={Djs} />
				<Route path='/categories' component={Categories} />
				<Route path='/Departments' component={Departments} />
				<Route path='/pre-sale' component={Presale} />
				<Route path='/staff' component={Staff} />
				<Route path='/bank' component={Bank} />
				<Route path='/bank-create' component={BankCreate} />
				<Route path='/bank-edit' component={BankEdit} />
			</Switch>
		</main>
	);
};

Main.propTypes = {
	class: PropTypes.object.isRequired,
};

export default Main;
