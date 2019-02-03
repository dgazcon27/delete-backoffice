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
import styles from '../Shared/sharedStyles';
import {
	required,
	empty,
} from '../validations/validations';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import { renderTextField } from '../RenderFields/renderFields';
import { CREATE_CURRENCY } from '../../queries/currency';
import {
	closeAlert,
	setName,
	setDescription,
} from '../../actions/Bank/actionsCreators';

import { createCurrency } from '../../actions/Currency/actionsCreators';


let CurrencyCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateCurrency,
	createCurrencyMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (

	<div>
		<Title title='Ingresar moneda' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nueva Moneda</h6>
				<div className={classes.formStyle}>
					<Field
						name='description'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Moneda'
						className='yourclass'
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateCurrency(myValues, paginationPage, createCurrencyMutation))} disabled={submitting} >
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

CurrencyCreate.defaultProps = {
	myValues: '',
};


CurrencyCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.string,
	classes: PropTypes.object.isRequired,
	actionCreateCurrency: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createCurrencyMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

CurrencyCreate = reduxForm({
	form: 'CurrencyCreate',
})(CurrencyCreate);

const selector = formValueSelector('CurrencyCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerBank.alertType,
	alertOpen: state.ReducerBank.alertOpen,
	name: state.ReducerBank.name,
	description: state.ReducerCurrency.description,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'description'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateCurrency: (description, paginationPage, createCurrencyMutation) =>
		dispatch(createCurrency(description, paginationPage, createCurrencyMutation)),
});

export default compose(
	graphql(CREATE_CURRENCY, { name: 'createCurrencyMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(CurrencyCreate);
