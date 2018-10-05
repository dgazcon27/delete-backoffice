import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ComponentUserType from '../UserType/componentUserType';
import Bank from '../Bank/bank';
import BankCreate from '../Bank/bankCreate';
import BankAccount from '../Bank/bankAccount';
import BankAccountCreate from '../Bank/bankAccountCreate';
import UserTypeCreate from '../UserType/userTypeCreate';
import ComponentUsers from '../Users/componentUsers';
import UsersCreate from '../Users/usersCreate';
import ComponentZone from '../Zone/componentZone';
import ZoneCreate from '../Zone/zoneCreate';
import LocationCreate from '../Location/locationCreate';
import ComponentLocation from '../Location/ComponentLocation';
import Event from '../Event/event';
import EventCreate from '../Event/eventCreate';
import PurchaseRequest from '../PurchaseRequest/PurchaseRequest';
import PurchaseRequestCreate from '../PurchaseRequest/PurchaseReqCreate';
import PayCreate from '../PurchaseRequest/PayCreate';
import Payment from '../Payment/payment';
import Access from '../Access/access';
import AccessCreate from '../Access/accessCreate';
import TestFinal from '../Bank/testFinalBankAccount';
import EditionComponent from '../Shared/editionComponent';

const Main = (props) => {
	const classes = props.class;
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Switch>
				<Route exact path='/' component={PurchaseRequest} />
				<Route path='/payment' component={Payment} />
				<Route path='/users' component={ComponentUsers} />
				<Route path='/users-create' component={UsersCreate} />
				<Route path='/users-edit/:id' component={EditionComponent} />
				<Route path='/user-type' component={ComponentUserType} />
				<Route path='/user-type-edit/:id' component={EditionComponent} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/tables' component={ComponentLocation} />
				<Route path='/create-tables' component={LocationCreate} />
				<Route path='/edit-tables/:id' component={EditionComponent} />
				<Route path='/events' component={Event} />
				<Route path='/events-create' component={EventCreate} />
				<Route path='/event-edit/:id' component={EditionComponent} />
				<Route path='/zones' component={ComponentZone} />
				<Route path='/Departments-create' component={ZoneCreate} />
				<Route path='/Departments-edit/:id' component={EditionComponent} />
				<Route path='/bank' component={Bank} />
				<Route path='/purchase-request-create' component={PurchaseRequestCreate} />
				<Route path='/pay' component={PayCreate} />
				<Route path='/purchase-request-edit/:id' component={EditionComponent} />
				<Route path='/bank-account' component={BankAccount} />
				<Route path='/bank-create' component={BankCreate} />
				<Route path='/bank-account-create' component={BankAccountCreate} />
				<Route path='/bank-edit/:id' component={EditionComponent} />
				<Route path='/bank-account-edit/:id' component={EditionComponent} />
				<Route path='/pre-sale' component={Payment} />
				<Route path='/pre-sale-edit/:id/:fk' component={EditionComponent} />
				<Route path='/access' component={Access} />
				<Route path='/access-create' component={AccessCreate} />
				<Route path='/testComponentList' component={TestFinal} />
				<Route path='/access-edit/:id' component={EditionComponent} />
			</Switch>
		</main>
	);
};

Main.propTypes = {
	class: PropTypes.object.isRequired,
};

export default Main;
