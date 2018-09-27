import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	compose,
	graphql,
	Query,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from 'material-ui/Menu/MenuItem';
import styles from './paymentCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
	renderSelectField,
} from '../RenderFields/renderFields';
import {
	EDIT_PAYMENT,
	GET_BANK_ACCOUNTS,
} from '../../queries/payment';
import {
	closeAlert,
	editPayment,
} from '../../actions/Payment/actionsCreators';

const BankAccount = () => (
	<Query query={GET_BANK_ACCOUNTS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<Field
						name='bankAccount'
						type='select'
						component={renderSelectField}
						validate={required}
						label='Cuenta de Banco'
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			return (
				<div>
					<Field
						name='bankAccount'
						type='select'
						label='bankAccount'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						{data.bankAccountss.map(bankAccount => (
							<MenuItem
								key={bankAccount.id}
								value={bankAccount.id}
							>
								{bankAccount.accountNumber}
							</MenuItem>
						))}
					</Field>
				</div>
			);
		}}
	</Query>
);

let PaymentEdit = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditPayment,
	editPaymentMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	initialValues,
}) => (
	<div>
		<h3 className={classes.formTitle}>Pagos</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Pago</h6>
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
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditPayment(myValues, Number(userId), paginationPage, editPaymentMutation))} disabled={submitting} >
					Guardar
				</button>
				<Link to='/pre-sale' href='/pre-sale' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
		</Paper>
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Pago {initialValues.id} fue editado con éxito.</span>}
		/>
		}
	</div>
);

PaymentEdit.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditPayment: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editPaymentMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

PaymentEdit = reduxForm({
	form: 'PaymentEdit',
	enableReinitialize: true,
})(PaymentEdit);

const selector = formValueSelector('PaymentEdit');

const mapStateToProps = state => ({
	initialValues: state.ReducerPayment,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerPayment.alertType,
	alertOpen: state.ReducerPayment.alertOpen,
	paginationPage: state.ReducerPayment.paginationPage,
	myValues: selector(state, 'id', 'purchaseRequest', 'amount', 'reference', 'comment', 'type', 'bankAccount'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditPayment: (
		id,
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		updatedBy,
		paginationPage,
		editPaymentMutation,
	) => dispatch(editPayment(
		id,
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		updatedBy,
		paginationPage,
		editPaymentMutation,
	)),
});

export default compose(
	graphql(EDIT_PAYMENT, { name: 'editPaymentMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PaymentEdit);
