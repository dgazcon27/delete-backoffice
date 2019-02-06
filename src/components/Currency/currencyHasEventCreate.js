import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import styles from '../Shared/sharedStyles';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import { CREATE_CURRENCY_HAS_CREATE } from '../../queries/currency';
import {
	Currencies,
	Events,
} from '../commonComponent';
import {
	createCurrencyHasEvent,
	setAlert,
} from '../../actions/Currency/actionsCreators';
import NotificationAlert from '../widget/NotificationAlert';

let CurrencyHasEventCreate = ({
	classes,
	isOpen,
	actionCreate,
	actionSetAlert,
	create,
	myValues,
	userId,
	submitting,
	handleSubmit,
}) => (
	<div>
		<Title title='Asociar moneda a Evento' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Asignar moneda</h6>
				<div className={classes.formStyle}>
					<Currencies />
				</div>
				<div className={classes.formStyle}>
					<Events />
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={
						handleSubmit(() =>
							actionCreate({
								...myValues,
								createdBy: userId,
								updatedBy: userId,
							}, create))
					}
					disabled={submitting}
				>
					Crear
				</button>
				<BackButton />
			</form>
		</Paper>
		<NotificationAlert
			open={isOpen}
			close={actionSetAlert}
			message='Moneda asignada exitosamente'
		/>
	</div>
);

CurrencyHasEventCreate.defaultProps = {
	myValues: {},
};


CurrencyHasEventCreate.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	userId: PropTypes.number.isRequired,
	myValues: PropTypes.object,
	classes: PropTypes.object.isRequired,
	actionCreate: PropTypes.func.isRequired,
	create: PropTypes.func.isRequired,
	actionSetAlert: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

CurrencyHasEventCreate = reduxForm({
	form: 'CurrencyHasEventCreate',
})(CurrencyHasEventCreate);

const selector = formValueSelector('CurrencyHasEventCreate');

const mapStateToProps = state => ({
	isOpen: state.ReducerCurrency.isOpen,
	alertOpen: state.ReducerCurrency.alertOpen,
	userId: state.ReducerLogin.userId,
	myValues: selector(state, 'event', 'currency'),
});

const mapDispatchToProps = dispatch => ({
	actionCreate: (data, createCurrencyMutation) =>
		dispatch(createCurrencyHasEvent(data, createCurrencyMutation)),
	actionSetAlert: () =>
		dispatch(setAlert(false)),
});

export default compose(
	graphql(CREATE_CURRENCY_HAS_CREATE, { name: 'create' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(CurrencyHasEventCreate);
