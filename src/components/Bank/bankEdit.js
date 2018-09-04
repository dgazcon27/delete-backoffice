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
import { EDIT_BANK } from '../../queries/bank';
import {
	editBank,
	cleanState,
	closeAlert,
} from '../../actions/Bank/actionsCreators';

let BankEdit = ({
	id,
	classes,
	myValues,
	alertOpen,
	alertType,
	actionEditBank,
	actionCloseAlert,
	paginationPage,
	editBankMutation,
	actionCleanState,
	handleSubmit,
	submitting,
}) => (
	<div>
		<h3 className={classes.formTitle}>Bancas</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Banco</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						label='Nombre'
						type='text'
						placeholder='Nombre'
						component={renderTextField}
						validate={[required, empty]}
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='currency'
						label='Descripción'
						type='text'
						placeholder='Descripción'
						component={renderTextField}
						validate={[required, empty]}
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditBank(id, myValues.name, myValues.currency, paginationPage, editBankMutation))} disabled={submitting} >
				Guardar
				</button>
				<Link to='/bank' href='/bank' className={classes.createButton} onClick={() => actionCleanState()}>
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
				message={<span id='message-id'>No pueden existir 2 o mas bancos con el mismo nombre verifique e intente de nuevo.</span>}
			/>
		}
	</div>
);

BankEdit.propTypes = {
	id: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditBank: PropTypes.func.isRequired,
	actionCleanState: PropTypes.func.isRequired,
	editBankMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

BankEdit = reduxForm({
	form: 'BankEdit',
})(BankEdit);

const selector = formValueSelector('BankEdit');

const mapStateToProps = state => ({
	alertType: state.ReducerBank.alertType,
	alertOpen: state.ReducerBank.alertOpen,
	initialValues: state.ReducerBank,
	id: state.ReducerBank.id,
	name: state.ReducerBank.name,
	currency: state.ReducerBank.currency,
	paginationPage: state.ReducerBank.paginationPage,
	myValues: selector(state, 'name', 'currency'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCleanState: () => dispatch(cleanState()),
	actionEditBank: (id, name, currency, paginationPage, editBankMutation) =>
		dispatch(editBank(id, name, currency, paginationPage, editBankMutation)),
});

export default compose(
	graphql(EDIT_BANK, { name: 'editBankMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankEdit);
