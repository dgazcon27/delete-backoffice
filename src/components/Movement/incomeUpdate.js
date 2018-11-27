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
import { UPDATE_MOVEMENT } from '../../queries/movement';
import { getMovementById, updateMovement, setNotification } from '../../actions/Movement/actionsCreator';
import FormMovement from './form';
import NotificationAlert from '../widget/NotificationAlert';

let IncomeUpdate = class IncomeUpdateClass extends React.Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		const { dispatch } = this.props;
		dispatch(getMovementById(id));
	}

	render() {
		const type = this.props.match.path.split('/')[3];
		const { classes } = this.props;
		const { id } = this.props.match.params;
		const title = 'Actualizar ingreso';
		const { handleSubmit } = this.props;
		const { submitting } = this.props;
		const message = 'Ingreso actualizado exitosamente.';
		const { isAlert } = this.props;
		const { actionSetNotification } = this.props;
		const { myValues } = this.props;
		const { update } = this.props;
		const { actionUpdate } = this.props;
		const option = type !== 'show' ? 'create' : 'visibility';
		const disable = type === 'show';

		return (
			<div>
				<h3 className={classes.formTitle}>{title}
					<div className={classes.backbuttonCreation}>
						<BackButton />
					</div>
				</h3>
				<Paper className={classes.createContainer}>
					<FormMovement
						options={option}
						disable={disable}
					/>
					{ type !== 'show' &&
						<button
							className={classes.createButton}
							type='submit'
							onClick={handleSubmit(() =>
								actionUpdate({
									...myValues, id: parseInt(id, 10),
								}, update))}
							disabled={submitting}
						>
							Registrar
						</button>
					}
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

IncomeUpdate.propTypes = {
	actionUpdate: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
	actionSetNotification: PropTypes.func.isRequired,
	myValues: PropTypes.object.isRequired,
	isAlert: PropTypes.bool.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,

};

const selector = formValueSelector('IncomeUpdateForm');

const mapStateToProps = state => ({
	isAlert: state.ReducerMovement.isAlert,
	initialValues: {
		id: state.ReducerMovement.id,
		event: state.ReducerMovement.event,
		eventName: state.ReducerMovement.eventName,
		amount: state.ReducerMovement.amount,
		reference: state.ReducerMovement.reference,
		comment: state.ReducerMovement.comment,
		bankAccount: state.ReducerMovement.bankAccount,
		bankAccountName: state.ReducerMovement.bankAccountName,
		type: state.ReducerMovement.type,
		movementsType: 'income',
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
		'updatedBy',
	),
});

const mapDispatchToProps = dispatch => ({
	actionUpdate: (movement, update) => dispatch(updateMovement(movement, update)),
	actionSetNotification: () => dispatch(setNotification(false)),
});

IncomeUpdate = reduxForm({
	form: 'IncomeUpdateForm',
	enableReinitialize: true,
}, mapStateToProps)(IncomeUpdate);

export default compose(
	graphql(UPDATE_MOVEMENT, { name: 'update' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(IncomeUpdate);
