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
import { EDIT_CURRENCY } from '../../queries/currency';
import {
	closeAlert,
	editCurrency,
} from '../../actions/Currency/actionsCreators';

let CurrencyEdit = ({
	classes,
	myValues,
	alertOpen,
	alertType,
	actionEditCurrency,
	actionCloseAlert,
	paginationPage,
	editCurrencyMutation,
	handleSubmit,
	submitting,
}) => (
	<div>
		<Title title='Monedas' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Moneda</h6>
				<div className={classes.formStyle}>
					<Field
						name='description'
						label='Moneda'
						type='text'
						placeholder='Moneda'
						component={renderTextField}
						validate={[required, empty]}
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditCurrency(myValues, paginationPage, editCurrencyMutation))} disabled={submitting} >
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
				message={<span id='message-id'>La Moneda {myValues.name} fue editado con exito.</span>}
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
				message={<span id='message-id'>No pueden existir 2 o mas monedas con el mismo nombre verifique e intente de nuevo.</span>}
			/>
		}
	</div>
);

CurrencyEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditCurrency: PropTypes.func.isRequired,
	editCurrencyMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

CurrencyEdit = reduxForm({
	form: 'CurrencyEdit',
	enableReinitialize: true,
})(CurrencyEdit);

const selector = formValueSelector('CurrencyEdit');

const mapStateToProps = state => ({
	description: state.ReducerCurrency.description,
	alertType: state.ReducerCurrency.alertType,
	alertOpen: state.ReducerCurrency.alertOpen,
	initialValues: state.ReducerCurrency,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'id', 'description'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditCurrency: (currency, paginationPage, editCurrencyMutation) =>
		dispatch(editCurrency(currency, paginationPage, editCurrencyMutation)),
});

export default compose(
	graphql(EDIT_CURRENCY, { name: 'editCurrencyMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(CurrencyEdit);
