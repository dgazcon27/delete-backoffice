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
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from 'material-ui/Menu/MenuItem';
import styles from './accessCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderSelectField,
} from '../RenderFields/renderFields';
import {
	EDIT_ACCESS,
	GET_STATUS,
	GET_LOCATIONS,
	GET_ZONES,
} from '../../queries/access';
import {
	closeAlert,
	editAccess,
} from '../../actions/Access/actionsCreators';

const Location = () => (
	<Query query={GET_LOCATIONS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<div className='formStyle'>
						<Field
							name='location'
							type='select'
							component={renderSelectField}
							validate={required}
							label='Ubicación'
						>
							<MenuItem />
						</Field>
					</div>
				);
			}
			return (
				<Field
					name='location'
					type='select'
					label='Ubicación'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.locationss.map(location => (
						<MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

const Zone = () => (
	<Query query={GET_ZONES}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<div className='formStyle'>
						<Field
							name='zone'
							type='select'
							component={renderSelectField}
							validate={required}
							label='Zona'
						>
							<MenuItem />
						</Field>
					</div>
				);
			}
			return (
				<Field
					name='zone'
					type='select'
					label='Zona'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.zones.map(zone => (
						<MenuItem key={zone.id} value={zone.id}>{zone.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

const Status = () => (
	<Query query={GET_STATUS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<div className='formStyle'>
						<Field
							name='status'
							type='select'
							component={renderSelectField}
							validate={required}
							label='Estatus'
						>
							<MenuItem />
						</Field>
					</div>
				);
			}
			return (
				<Field
					name='status'
					type='select'
					label='Estatus'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.statuss.map(status => (
						<MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

let AccessEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditAccess,
	editAccessMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	initialValues,
}) => (
	<div>
		<h3 className={classes.formTitle}>Acceso</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Acceso</h6>
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
					<Field
						name='descriptionAccess'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Descripción'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='price'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Precio'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='currency'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Moneda'
					/>
				</div>
				<div className={classes.formStyle}>
					<Location />
				</div>
				<div className={classes.formStyle}>
					<Zone />
				</div>
				<div className={classes.formStyle}>
					<Status />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditAccess(initialValues.id, myValues.name, myValues.descriptionAccess, myValues.price, myValues.currency, myValues.location, myValues.zone, myValues.status, paginationPage, editAccessMutation))} disabled={submitting} >
					Guardar
				</button>
				<Link to='/access' href='/access' className={classes.returnButton} >
					Regresar
				</Link>
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
			message={<span id='message-id'>El Acceso que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Acceso {myValues.name} fue creado con éxito.</span>}
		/>
		}
	</div>
);

AccessEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditAccess: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editAccessMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

AccessEdit = reduxForm({
	form: 'AccessEdit',
})(AccessEdit);

const selector = formValueSelector('AccessEdit');

const mapStateToProps = state => ({
	id: state.ReducerAccess.id,
	initialValues: state.ReducerAccess,
	alertType: state.ReducerAccess.alertType,
	alertOpen: state.ReducerAccess.alertOpen,
	paginationPage: state.ReducerAccess.paginationPage,
	myValues: selector(state, 'name', 'descriptionAccess', 'price', 'currency', 'location', 'zone', 'status'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditAccess: (
		id,
		name,
		descripcion,
		price,
		currency,
		location,
		zone,
		status,
		paginationPage,
		editAccessMutation,
	) => dispatch(editAccess(
		id,
		name,
		descripcion,
		price,
		currency,
		location,
		zone,
		status,
		paginationPage,
		editAccessMutation,
	)),
});

export default compose(
	graphql(EDIT_ACCESS, { name: 'editAccessMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEdit);
