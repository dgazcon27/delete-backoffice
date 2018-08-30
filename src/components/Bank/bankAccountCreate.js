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
import MenuItem from 'material-ui/Menu/MenuItem';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './bankCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField, renderSelectField } from '../RenderFields/renderFields';
import {
	GET_BANKSS,
	GET_USERSS,
	CREATE_BANK_ACCOUNT,
} from '../../queries/bank';
import {
	closeAlert,
	createBankAccount,
} from '../../actions/Bank/actionsCreators';

export const Banks = () => (
	<Query query={GET_BANKSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='bank'
						type='select'
						label='Banco'
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
					name='bank'
					type='select'
					label='Banco'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.bankss.map(bank => (
						<MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Users = () => (
	<Query query={GET_USERSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='user'
						type='select'
						label='Usuarios'
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
					name='owner'
					type='select'
					label='Usuarios'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.userss.map(user => (
						<MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);


let BankAccountCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateBankAccount,
	createBankAccountMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h3 className={classes.formTitle}>Cuenta Bancaria</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nueva cuenta bancaria</h6>
				<div className={classes.formStyle}>
					<Field
						name='accountNumber'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Número de cuenta'
						placeholder='Número de cuenta'
					/>
				</div>
				<div className={classes.formStyle}>
					<Users />
				</div>
				<div className={classes.formStyle}>
					<Banks />
				</div>

				<div className={classes.formStyle}>
					<Field
						name='type'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Tipo'
						placeholder='Tipo'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='currency'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Descripción'
						placeholder='Descripción'
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
						placeholder='Comentario'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionCreateBankAccount(
						myValues.bank,
						myValues.owner,
						myValues.accountNumber,
						myValues.type,
						myValues.comment,
						myValues.currency,
						paginationPage,
						createBankAccountMutation,
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
		{alertType === 'nombre' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>No puede crear una banca sin {alertType}</span>}
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
				message={<span id='message-id'>La cuenta que intenta crear ya existe verifique el numero he intente de nuevo.</span>}
			/>
		}
		{alertType === 'creado' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>La cuenta fue creado con exito.</span>}
			/>
		}
	</div>
);

BankAccountCreate.propTypes = {
	actionCreateBankAccount: PropTypes.func.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createBankAccountMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

BankAccountCreate = reduxForm({
	form: 'BankAccountCreate',
})(BankAccountCreate);

const selector = formValueSelector('BankAccountCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerBankAccount.alertType,
	alertOpen: state.ReducerBankAccount.alertOpen,
	name: state.ReducerBankAccount.name,
	descripcion: state.ReducerBankAccount.descripcion,
	paginationPage: state.ReducerBankAccount.paginationPage,
	myValues: selector(state, 'bank', 'owner', 'accountNumber', 'type', 'comment', 'currency'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateBankAccount: (
		bank,
		owner,
		accountNumber,
		type,
		currency,
		comment,
		paginationPage,
		createBankAccountMutation,
	) =>
		dispatch(createBankAccount(
			bank,
			owner,
			accountNumber,
			type,
			currency,
			comment,
			paginationPage,
			createBankAccountMutation,
		)),
});

export default compose(
	graphql(CREATE_BANK_ACCOUNT, { name: 'createBankAccountMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankAccountCreate);
