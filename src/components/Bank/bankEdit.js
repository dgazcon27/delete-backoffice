import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import styles from '../Shared/sharedStyles';
import { required, empty } from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_BANK } from '../../queries/bank';
import {
	editBank,
	closeAlert,
} from '../../actions/Bank/actionsCreators';

let BankEdit = ({
	classes,
	myValues,
	alertOpen,
	alertType,
	actionEditBank,
	actionCloseAlert,
	paginationPage,
	editBankMutation,
	handleSubmit,
	submitting,
}) => (
	<div>
		<Title title='Bancas' />
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
						label='Moneda'
						type='text'
						placeholder='Moneda'
						component={renderTextField}
						validate={[required, empty]}
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditBank(myValues, paginationPage, editBankMutation))} disabled={submitting} >
				Guardar
				</button>
				<BackButton />
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
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditBank: PropTypes.func.isRequired,
	editBankMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

BankEdit = reduxForm({
	form: 'BankEdit',
	enableReinitialize: true,
})(BankEdit);

const selector = formValueSelector('BankEdit');

const mapStateToProps = state => ({
	alertType: state.ReducerBank.alertType,
	alertOpen: state.ReducerBank.alertOpen,
	initialValues: state.ReducerBank,
	name: state.ReducerBank.name,
	currency: state.ReducerBank.currency,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'id', 'name', 'currency'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditBank: (bank, paginationPage, editBankMutation) =>
		dispatch(editBank(bank, paginationPage, editBankMutation)),
});

export default compose(
	graphql(EDIT_BANK, { name: 'editBankMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankEdit);
