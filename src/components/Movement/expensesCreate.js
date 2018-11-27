import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	compose,
	graphql,
} from 'react-apollo';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
	reduxForm,
	formValueSelector,
} from 'redux-form';
import BackButton from '../widget/BackButton';
import { CREATE_MOVEMENT } from '../../queries/movement';
import NotificationAlert from '../widget/NotificationAlert';
import { setNotification, createIncome } from '../../actions/Movement/actionsCreator';
import FormMovement from './form';
import styles from '../Shared/sharedStyles';

let ExpensesCreate = ({
	actionCreate,
	classes,
	create,
	isAlert,
	actionSetNotification,
	myValues,
	submitting,
	handleSubmit,
}) => {
	const title = 'Registrar gasto';
	const message = 'Reporte de gasto creado exitosamente';
	return (
		<div>
			<h3 className={classes.formTitle}>{title}
				<div className={classes.backbuttonCreation}>
					<BackButton />
				</div>
			</h3>
			<Paper className={classes.createContainer}>
				<FormMovement
					options='create'
					disable={false}
				/>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionCreate(myValues, create))}
					disabled={submitting}
				>
					Registrar
				</button>
			</Paper>
			<NotificationAlert
				message={message}
				open={isAlert}
				close={actionSetNotification}
			/>
		</div>
	);
};

ExpensesCreate.propTypes = {
	actionCreate: PropTypes.func.isRequired,
	create: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionSetNotification: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	isAlert: PropTypes.bool.isRequired,
};

const selector = formValueSelector('ExpensesCreateForm');

const mapStateToProps = state => ({
	isAlert: state.ReducerMovement.isAlert,
	initialValues: {
		movementsType: 'expenses',
		createdBy: state.ReducerLogin.userId,
		updatedBy: state.ReducerLogin.userId,
	},
	myValues: selector(
		state,
		'event',
		'amount',
		'reference',
		'comment',
		'movementsType',
		'bankAccount',
		'type',
		'createdBy',
		'updatedBy',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCreate: (income, create) => dispatch(createIncome(income, create)),
	actionSetNotification: () => dispatch(setNotification(false)),
});

ExpensesCreate = reduxForm({
	form: 'ExpensesCreateForm',
}, mapStateToProps)(ExpensesCreate);

export default compose(
	graphql(CREATE_MOVEMENT, { name: 'create' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ExpensesCreate);
