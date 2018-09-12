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
import styles from './bankCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
} from '../RenderFields/renderFields';
import { CREATE_PAYMENT } from '../../queries/payment';
import {
	createPayment,
	closeAlert,
} from '../../actions/Payment/actionsCreators';

import { BankAccount } from '../commonComponent';

let Payment = ({
	id,
	userId,
	classes,
	myValues,
	alertType,
	alertOpen,
	submitting,
	handleSubmit,
	paginationPage,
	actionCloseAlert,
	actionCreatePayment,
	createPaymentMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Pagos</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Generar Pago</h6>
				<div className={classes.formStyle}>
					<Field
						name='amount'
						type='number'
						component={renderNumberField}
						validate={[required, empty]}
						label='cantidad'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='type'
						type='text'
						component={renderTextField}
						validate={required}
						label='Tipo'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='reference'
						type='text'
						component={renderTextField}
						validate={required}
						label='Referencia'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<BankAccount />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={required}
						label='Comentario/Observaciones'
						className='yourclass'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionCreatePayment(
						id,
						myValues.amount,
						myValues.reference,
						myValues.comment,
						myValues.type,
						myValues.bankAccount,
						Number(userId),
						Number(userId),
						paginationPage,
						createPaymentMutation,
					))}
					disabled={submitting}
				>
					Guardar
				</button>
				<Link to='/pre-sale' href='/pre-sale' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
		</Paper>
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Pago fue generado con éxito.</span>}
		/>
		}
	</div>
);

Payment.propTypes = {

	id: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreatePayment: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createPaymentMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

Payment = reduxForm({
	form: 'Payment',
})(Payment);

const selector = formValueSelector('Payment');

const mapStateToProps = state => ({
	initialValues: state.ReducerPayment,
	id: state.ReducerPurchaseRequest.id,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerPayment.alertType,
	alertOpen: state.ReducerPayment.alertOpen,
	paginationPage: state.ReducerPayment.paginationPagePay,
	myValues: selector(state, 'amount', 'type', 'reference', 'bankAccount', 'comment'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreatePayment: (
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		createdBy,
		updatedBy,
		paginationPage,
		createPaymentMutation,
	) => dispatch(createPayment(
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		createdBy,
		updatedBy,
		paginationPage,
		createPaymentMutation,
	)),
});

export default compose(
	graphql(CREATE_PAYMENT, { name: 'createPaymentMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Payment);
