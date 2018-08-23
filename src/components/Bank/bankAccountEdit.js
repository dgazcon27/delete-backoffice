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
import styles from './userTypeCss';
import { required, empty } from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_BANK_ACCOUNT } from '../../queries/bank';
import {
	editBankAccount,
	cleanState,
	closeAlert,
} from '../../actions/Bank/actionsCreators';

import {
	Banks,
	Users,
} from './bankAccountCreate';

let BankAccountEdit = ({
	id,
	classes,
	myValues,
	alertOpen,
	alertType,
	actionCloseAlert,
	paginationPage,
	editBankAccountMutation,
	actionEditBankAccount,
	handleSubmit,
	submitting,
}) => (
	<div>
		<h3 className={classes.formTitle}>Bancas</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Cuenta bancaria</h6>
				<div className={classes.formStyle}>
					<Field
						name='accountNumber'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='accountNumber'
					/>
				</div>
				<div className={classes.formStyle}>
					<Banks />
				</div>
				<div className={classes.formStyle}>
					<Users />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='type'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='type'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='currency'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='currency'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='comment'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionEditBankAccount(
						id,
						myValues.bank,
						myValues.owner,
						myValues.accountNumber,
						myValues.type,
						myValues.currency,
						myValues.comment,
						paginationPage,
						editBankAccountMutation,
					))}
					disabled={submitting}
				>
				Crear
				</button>
				<Link to='/bank-account' href='/bank-account' className={classes.returnButton} >
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
			message={<span id='message-id'>La banca {myValues.name} fue editado con exito.</span>}
		/>
		}
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>No pueden existir 2 o mas cuentas con el mismo numero verifique e intente de nuevo.</span>}
		/>
		}
	</div>
);


BankAccountEdit.propTypes = {
	id: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditBankAccount: PropTypes.func.isRequired,
	editBankAccountMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

BankAccountEdit = reduxForm({
	form: 'BankAccountEdit',
})(BankAccountEdit);

const selector = formValueSelector('BankAccountEdit');

const mapStateToProps = state => ({
	owner: state.ReducerBank.owner,
	bank: state.ReducerBank.bank,
	alertType: state.ReducerBank.alertType,
	alertOpen: state.ReducerBank.alertOpen,
	initialValues: state.ReducerBank,
	id: state.ReducerBank.id,
	accountNumber: state.ReducerBank.accountNumber,
	currency: state.ReducerBank.currency,
	paginationPage: state.ReducerBank.paginationPage,
	myValues: selector(state, 'owner', 'bank', 'type', 'accountNumber', 'currency', 'comment'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCleanState: () => dispatch(cleanState()),
	actionEditBankAccount: (
		id,
		owner,
		bank,
		type,
		accountNumber,
		currency,
		comment,
		paginationPage,
		editBankAccountMutation,
	) =>
		dispatch(editBankAccount(
			id,
			owner,
			bank,
			type,
			accountNumber,
			currency,
			comment,
			paginationPage,
			editBankAccountMutation,
		)),
});

export default compose(
	graphql(EDIT_BANK_ACCOUNT, { name: 'editBankAccountMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankAccountEdit);
