import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	graphql,
	compose,
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
	empty,
	required,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_PROVIDER } from '../../queries/providers';
import {
	closeAlert,
	editProvider,
	setCountriesStates,
} from '../../actions/Provider/actionsCreators';

import BackButton from '../widget/BackButton';

let ProviderDetails = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
}) => (
	<div>
		<h3 className={classes.formTitle}>Proveedor
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Detalles Proveedor</h6>
				<div className='row'>
					<div className='input-field col s6'>
						<Field
							name='rif'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='RIF'
							className='yourclass'
							disabled
						/>
					</div>
					<div className='input-field col s6' >
						<Field
							name='name'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Nombre'
							disabled
						/>
					</div>
					<div className='col s6 l6'>
						<Field
							name='email'
							type='text'
							component={renderTextField}
							validate={required}
							label='Correo'
							className='yourclass container date-label'
							disabled
						/>
					</div>
					<div className='input-field col s6 l6'>
						<Field
							name='phone'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Teléfono'
							className='yourclass'
							disabled
						/>
					</div>
					<div className='input-field col s12'>
						<Field
							name='address'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Dirección'
							className='yourclass'
							disabled
						/>
					</div>
					<div className='col s6 l6'>
						<Field
							name='countryName'
							type='text'
							component={renderTextField}
							validate={required}
							label='País'
							className='yourclass container date-label'
							disabled
						/>
					</div>
					<div className='col s6 l6'>
						<Field
							name='stateName'
							type='text'
							component={renderTextField}
							validate={required}
							label='Estado'
							className='yourclass container date-label'
							disabled
						/>
					</div>
					<div className='col s12 l12'>
						<Field
							name='categoryName'
							type='text'
							component={renderTextField}
							validate={required}
							label='Categoría'
							className='yourclass container date-label'
							disabled
						/>
					</div>
					<div className='input-field col s12'>
						<Field
							name='descriptionProvider'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Descripción/Observaciones'
							className='yourclass'
							disabled
						/>
					</div>
				</div>
			</form>
		</Paper>
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>El Proveedor que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Proveedor fue editado con éxito.</span>}
		/>
		}
	</div>
);

ProviderDetails.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
};

ProviderDetails = reduxForm({
	form: 'ProviderDetails',
	enableReinitialize: true,
})(ProviderDetails);

const selector = formValueSelector('ProviderDetails');

const mapStateToProps = state => ({
	id: state.ReducerProvider.id,
	userId: state.ReducerLogin.userId,
	states: state.ReducerProvider.states,
	alertType: state.ReducerProvider.alertType,
	alertOpen: state.ReducerProvider.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerProvider,
	myValues: selector(state, 'name', 'descriptionProvider', 'email', 'rif', 'phone', 'address', 'email', 'state', 'category'),
});

const mapDispatchToProps = dispatch => ({
	actionSelectCountry: (event, id) => dispatch(setCountriesStates(event, id)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditProvider: (
		id,
		name,
		description,
		rif,
		phone,
		address,
		email,
		state,
		category,
		updatedBy,
		editProviderMutation,
		paginationPage,
	) => dispatch(editProvider(
		id,
		name,
		description,
		rif,
		phone,
		address,
		email,
		state,
		category,
		updatedBy,
		editProviderMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(EDIT_PROVIDER, { name: 'editProviderMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ProviderDetails);
