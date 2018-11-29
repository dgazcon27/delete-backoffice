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
import { CREATE_PROVIDER } from '../../queries/providers';
import {
	closeAlert,
	createProvider,
	setCountriesStates,
} from '../../actions/Provider/actionsCreators';

import BackButton from '../widget/BackButton';

import { SelectCountry, SelectState, Categorys } from '../commonComponent';

let ProviderCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateProvider,
	createProviderMutation,
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
				<h6 className={classes.formTitle}>Nuevo Proveedor</h6>
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
					<div className='input-field col s6'>
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
							name='description'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Descripcion'
							className='yourclass'
						/>
					</div>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateProvider(myValues.name, myValues.email, myValues.rif, myValues.phone, myValues.address, myValues.email, myValues.state, myValues.category, Number(userId), Number(userId), createProviderMutation, paginationPage))} disabled={submitting} >
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
			message={<span id='message-id'>No puede crear un Proveedor sin {alertType}</span>}
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
			message={<span id='message-id'>El Proveedor que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'rolDescription' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>No puede crear un Proveedor sin {alertType}</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Proveedor fue creado con éxito.</span>}
		/>
		}
	</div>
);

ProviderCreate.propTypes = {
	states: PropTypes.array.isRequired,
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateProvider: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionSelectCountry: PropTypes.func.isRequired,
	createProviderMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

ProviderCreate = reduxForm({
	form: 'ProviderCreate',
})(ProviderCreate);

const selector = formValueSelector('ProviderCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	states: state.ReducerProvider.states,
	alertType: state.ReducerProvider.alertType,
	alertOpen: state.ReducerProvider.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'name', 'email', 'rif', 'phone', 'address', 'email', 'state', 'category'),
});

const mapDispatchToProps = dispatch => ({
	actionSelectCountry: (event, id) => dispatch(setCountriesStates(event, id)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateProvider: (
		name,
		description,
		rif,
		phone,
		address,
		email,
		state,
		category,
		createdBy,
		updatedBy,
		createProviderMutation,
		paginationPage,
	) => dispatch(createProvider(
		name,
		description,
		rif,
		phone,
		address,
		email,
		state,
		category,
		createdBy,
		updatedBy,
		createProviderMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(CREATE_PROVIDER, { name: 'createProviderMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ProviderCreate);
