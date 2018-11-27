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
import styles from '../Shared/sharedStyles';
import BackButton from '../widget/BackButton';
import { createIncome, setNotification } from '../../actions/Movement/actionsCreator';
import { CREATE_MOVEMENT } from '../../queries/movement';
import NotificationAlert from '../widget/NotificationAlert';
import FormMovement from './form';

let IncomeCreate = ({
	actionCreate,
	classes,
	create,
	isAlert,
	actionSetNotification,
	myValues,
	submitting,
	handleSubmit,
}) => {
	const title = 'Registrar ingreso';
	const message = 'Reporte de ingreso creado exitosamente';
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

IncomeCreate.propTypes = {
	actionCreate: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	create: PropTypes.func.isRequired,
	actionSetNotification: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	isAlert: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
};

const selector = formValueSelector('IncomeCreateForm');

const mapStateToProps = state => ({
	isAlert: state.ReducerMovement.isAlert,
	initialValues: {
		movementsType: 'income',
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

IncomeCreate = reduxForm({
	form: 'IncomeCreateForm',
}, mapStateToProps)(IncomeCreate);

export default compose(
	graphql(CREATE_MOVEMENT, { name: 'create' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(IncomeCreate);
