import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	Query,
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
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';

import {
	renderTextField,
	renderNumberField,
	renderSelectField,
} from '../RenderFields/renderFields';
import { CREATE_PAYMENT, GET_CURRENCYS, GET_ACCOUNTS_BY_CURRENCY } from '../../queries/payment';
import {
	createPayment,
	closeAlert,
	getAccountsByCurrency,
} from '../../actions/Payment/actionsCreators';

const Currencys = ({
	actionGetAccounts,
}) => (
	<Query query={GET_CURRENCYS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='currency'
						type='select'
						label='Moneda'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='currency'
					type='select'
					label='Moneda'
					component={renderSelectField}
					validate={required}
					className='container'
					onChange={actionGetAccounts}
				>
					{data.currencys.map(currency => (
						<MenuItem key={currency.id} value={currency.id}>{currency.description}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

Currencys.propTypes = {
	actionGetAccounts: PropTypes.func.isRequired,
};

const BankAccounts = ({
	currency,
}) => (
	<Query query={GET_ACCOUNTS_BY_CURRENCY} variables={{ currency }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='bankAccount'
						type='select'
						label='Cuenta de Banco'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='bankAccount'
					type='select'
					label='Cuenta de Banco'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.accountsByCurrency.map(account => (
						<MenuItem key={account.id} value={account.id}>{`${account.accountNumber} - ${account.owner.fullName}`}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

BankAccounts.propTypes = {
	currency: PropTypes.number.isRequired,
};

let Payment = ({
	userId,
	currency,
	classes,
	match,
	myValues,
	alertType,
	alertOpen,
	submitting,
	handleSubmit,
	paginationPage,
	actionCloseAlert,
	actionGetAccounts,
	actionCreatePayment,
	createPaymentMutation,
}) => (
	<div>
		<Title title='Pagos' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Registrar Pago</h6>
				<div className={classes.formStyle}>
					<Currencys actionGetAccounts={actionGetAccounts} />
				</div>
				<div className={classes.formStyle}>
					<BankAccounts currency={currency} />
				</div>

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
						type='select'
						label='Tipo'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem key='1' value='Efectivo' >Efectivo</MenuItem>
						<MenuItem key='2' value='Transferencia Dolares' >Transferencia Dólares</MenuItem>
						<MenuItem key='3' value='Transferencia Bolivares' >Transferencia Bolívares</MenuItem>
						<MenuItem key='4' value='Intercambio'> Intercambio </MenuItem>
						<MenuItem key='5' value='Otro' > Otro</MenuItem>
					</Field>
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
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						label='Comentario/Observaciones'
						className='yourclass'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionCreatePayment(
						match.params.id,
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
				<BackButton />
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
	currency: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreatePayment: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionGetAccounts: PropTypes.func.isRequired,
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
	currency: state.ReducerPayment.bankAccountId,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerPayment.alertType,
	alertOpen: state.ReducerPayment.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'amount', 'type', 'reference', 'bankAccount', 'comment'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionGetAccounts: value => dispatch(getAccountsByCurrency(value.target.value)),
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
