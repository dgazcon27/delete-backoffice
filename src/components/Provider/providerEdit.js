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

import { SelectCountry, SelectState, Categorys } from '../commonComponent';

let ProviderEdit = ({
	id,
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditProvider,
	editProviderMutation,
	actionSelectCountry,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	states,
}) => (
	<div>
		<h3 className={classes.formTitle}>Proveedor
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Proveedor</h6>
				<div className='row'>
					<div className='input-field col s6'>
						<Field
							name='rif'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='RIF'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s6' >
						<Field
							name='name'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Nombre'
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
						/>
					</div>
					<div className='input-field col s6 l6'>
						<Field
							name='phone'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Telefono'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s12'>
						<Field
							name='address'
							type='number'
							component={renderTextField}
							validate={[required, empty]}
							label='Dirrecion'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s6'>
						<SelectCountry actionSelectCountry={actionSelectCountry} />
					</div>
					<div className='input-field col s6'>
						<SelectState states={states} />
					</div>
					<div className={classes.formStyle}>
						<Categorys states={states} />
					</div>
					<div className='input-field col s12'>
						<Field
							name='descriptionProvider'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Descripcion'
							className='yourclass'
						/>
					</div>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditProvider(id, myValues.name, myValues.descriptionProvider, myValues.rif, myValues.phone, myValues.address, myValues.email, myValues.state, myValues.country, myValues.category, Number(userId), editProviderMutation, paginationPage))} disabled={submitting} >
                    Guardar
				</button>
				<BackButton />
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

ProviderEdit.propTypes = {
	id: PropTypes.number.isRequired,
	states: PropTypes.array.isRequired,
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditProvider: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionSelectCountry: PropTypes.func.isRequired,
	editProviderMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

ProviderEdit = reduxForm({
	form: 'ProviderEdit',
	enableReinitialize: true,
})(ProviderEdit);

const selector = formValueSelector('ProviderEdit');

const mapStateToProps = state => ({
	id: state.ReducerProvider.id,
	userId: state.ReducerLogin.userId,
	states: state.ReducerProvider.states,
	alertType: state.ReducerProvider.alertType,
	alertOpen: state.ReducerProvider.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerProvider,
	myValues: selector(state, 'name', 'descriptionProvider', 'email', 'rif', 'phone', 'address', 'email', 'state', 'country', 'category'),
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
		country,
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
		country,
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
)(ProviderEdit);
