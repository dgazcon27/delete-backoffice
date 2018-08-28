import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import UserType from '../UserType/userType';
import Bank from '../Bank/bank';
import BankCreate from '../Bank/bankCreate';
import BankEdit from '../Bank/bankEdit';
import UserTypeCreate from '../UserType/userTypeCreate';
import UserTypeEdit from '../UserType/userTypeEdit';
import Users from '../Users/users';
import Event from '../Event/event';
import EventCreate from '../Event/eventCreate';
import EventEdit from '../Event/eventEdit';
import {
	Dashboard,
	Presale,
	Tables,
	Guests,
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
				<Route path='/user-type' component={UserType} />
				<Route path='/user-type-edit' component={UserTypeEdit} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/tables' component={Tables} />
				<Route path='/guests' component={Guests} />
				<Route path='/events' component={Event} />
				<Route path='/events-create' component={EventCreate} />
				<Route path='/event-edit' component={EventEdit} />
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
