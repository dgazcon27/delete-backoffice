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
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import { renderTextField, renderSelectField } from '../RenderFields/renderFields';
import { CREATE_BANK } from '../../queries/bank';
import { GET_CURRENCYS } from '../../queries/payment';
import {
	closeAlert,
	setName,
	setDescription,
	createBank,
} from '../../actions/Bank/actionsCreators';

const Currencys = () => (
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
				>
					{data.currencys.map(currency => (
						<MenuItem key={currency.id} value={currency.id}>{currency.description}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);


let BankCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateBank,
	createBankMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<Title title='Crear Banco' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Banco</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre'
					/>
				</div>
				<div className={classes.formStyle}>
					<Currencys />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateBank(myValues.name, myValues.currency, paginationPage, createBankMutation))} disabled={submitting} >
					Crear
				</button>
				<BackButton />
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
				message={<span id='message-id'>El Banco que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
			/>
		}
		{alertType === 'creado' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>La banca {myValues.name} fue creado con exito.</span>}
			/>
		}
	</div>
);

BankCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateBank: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createBankMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

BankCreate = reduxForm({
	form: 'BankCreate',
})(BankCreate);

const selector = formValueSelector('BankCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerBank.alertType,
	alertOpen: state.ReducerBank.alertOpen,
	name: state.ReducerBank.name,
	descripcion: state.ReducerBank.descripcion,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'name', 'currency'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateBank: (name, currency, paginationPage, createBankMutation) =>
		dispatch(createBank(name, currency, paginationPage, createBankMutation)),
});

export default compose(
	graphql(CREATE_BANK, { name: 'createBankMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankCreate);
