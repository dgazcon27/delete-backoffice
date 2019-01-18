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
import { CREATE_MOVEMENT } from '../../queries/movement';
import NotificationAlert from '../widget/NotificationAlert';
import {
	setNotification,
	createIncome,
	getEventById,
} from '../../actions/Movement/actionsCreators';
import FormMovement from './form';
import styles from '../Shared/sharedStyles';
import Title from '../Shared/title';

let ExpensesCreate = class ExpensesCreateClass extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		const { id } = this.props.match.params;
		if (id !== undefined) {
			dispatch(getEventById(id));
		}
	}

	render() {
		const { actionCreate } = this.props;
		const { classes } = this.props;
		const { create } = this.props;
		const { isAlert } = this.props;
		const { actionSetNotification } = this.props;
		const { myValues } = this.props;
		const { submitting } = this.props;
		const { handleSubmit } = this.props;
		const { match } = this.props;
		const title = 'Registrar gasto';
		const message = 'Reporte de gasto creado exitosamente';
		const event = match.params.id === undefined;
		return (
			<div>
				<Title title={title} />
				<Paper className={classes.createContainer}>
					<FormMovement
						options='create'
						disable={false}
						event={!event}
					/>
					<div className={classes.centered}>
						<button
							className={classes.createButton}
							type='submit'
							onClick={handleSubmit(() => actionCreate(myValues, create))}
							disabled={submitting}
						>
					Registrar
						</button>
					</div>
				</Paper>
				<NotificationAlert
					message={message}
					open={isAlert}
					close={actionSetNotification}
				/>
			</div>
		);
	}
};

ExpensesCreate.propTypes = {
	actionCreate: PropTypes.func.isRequired,
	create: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	actionSetNotification: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	myValues: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	isAlert: PropTypes.bool.isRequired,
};

const selector = formValueSelector('ExpensesCreateForm');

const mapStateToProps = (state) => {
	const initialValues = {};
	initialValues.movementsType = 'expenses';
	initialValues.createdBy = state.ReducerLogin.userId;
	initialValues.updatedBy = state.ReducerLogin.userId;
	if (state.ReducerMovement.event > 0) {
		initialValues.eventName = state.ReducerMovement.eventName;
		initialValues.event = state.ReducerMovement.event;
	}
	return ({
		isAlert: state.ReducerMovement.isAlert,
		initialValues,
		myValues: selector(
			state,
			'event',
			'amount',
			'reference',
			'comment',
			'category',
			'movementsType',
			'bankAccount',
			'type',
			'createdBy',
			'updatedBy',
		),
	});
};

const mapDispatchToProps = dispatch => ({
	actionCreate: (income, create) => dispatch(createIncome(income, create)),
	actionSetNotification: () => dispatch(setNotification(false)),
});

ExpensesCreate = reduxForm({
	form: 'ExpensesCreateForm',
	enableReinitialize: true,
}, mapStateToProps)(ExpensesCreate);

export default compose(
	graphql(CREATE_MOVEMENT, { name: 'create' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ExpensesCreate);
