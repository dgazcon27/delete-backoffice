import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './reservationCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
} from '../RenderFields/renderFields';
import { CREATE_RESERVATION_PAY } from '../../queries/reservation';
import {
	closeAlert,
	createPaymentReservation,
} from '../../actions/Reservation/actionsCreators';
import { BankAccount } from '../commonComponent';
import Title from '../Shared/title';

let ReservationPayment = ({
	userId,
	classes,
	myValues,
	alertOpen,
	alertType,
	submitting,
	reservation,
	handleSubmit,
	paginationPage,
	actionCloseAlert,
	actionPaymentReservation,
	createReservationPayMutation,
}) => (
	<div>
		<Title title='Nuevo Pago' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Pago</h6>
				<div className={classes.formStyle}>
					<Field
						name='amount'
						type='number'
						component={renderNumberField}
						validate={[required]}
						label='Cantidad'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='reference'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Referencia'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Comentario'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='type'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Tipo'
					/>
				</div>
				<div className={classes.formStyle}>
					<BankAccount />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionPaymentReservation(reservation, myValues.amount, myValues.reference, myValues.comment, myValues.type, myValues.bankAccount, Number(userId), Number(userId), paginationPage, createReservationPayMutation))} disabled={submitting} >
					Crear
				</button>
				<Link to='/reservation' href='/reservation' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
		</Paper>
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>El pago que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Pago fue creado con éxito.</span>}
		/>
		}
	</div>
);

ReservationPayment.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	reservation: PropTypes.number.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionPaymentReservation: PropTypes.func.isRequired,
	createReservationPayMutation: PropTypes.func.isRequired,
};

ReservationPayment = reduxForm({
	form: 'ReservationPayment',
})(ReservationPayment);

const selector = formValueSelector('ReservationPayment');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	reservation: state.ReducerReservation.id,
	alertType: state.ReducerReservation.alertType,
	alertOpen: state.ReducerReservation.alertOpen,
	paginationPage: state.ReducerReservation.paginationPage,
	myValues: selector(state, 'amount', 'reference', 'comment', 'type', 'bankAccount'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionPaymentReservation: (
		reservation,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		createdBy,
		updatedBy,
		paginationPage,
		createReservationPayMutation,
	) => dispatch(createPaymentReservation(
		reservation,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		createdBy,
		updatedBy,
		paginationPage,
		createReservationPayMutation,
	)),
});

export default compose(
	graphql(CREATE_RESERVATION_PAY, { name: 'createReservationPayMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ReservationPayment);
