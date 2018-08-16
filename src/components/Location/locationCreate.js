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
import Snackbar from '@material-ui/core/Snackbar';
import styles from './locationCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { CREATE_LOCATION } from '../../queries/location';
import {
	closeAlert,
	setName,
	setDescription,
	createLocation,
} from '../../actions/location/actionsCreators';

let LocationCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateLocation,
	createLocationMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h4>Nueva Ubicación</h4>
		<div className={classes.createContainer}>
			<form>
				<Field
					name='name'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='name'
				/>
				<Field
					name='rolDescription'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='description'
					className='yourclass'
				/>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateLocation(myValues.name, myValues.rolDescription, paginationPage, createLocationMutation))} disabled={submitting} >
					Crear
				</button>
				<Link to='/tables' href='/tables' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
			{alertType === 'nombre' &&

				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id='message-id'>No puede crear un rol sin {alertType}</span>}
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
					message={<span id='message-id'>El Rol que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
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
					message={<span id='message-id'>No puede crear un rol sin {alertType}</span>}
				/>
			}
			{alertType === 'creado' &&
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{ 'aria-describedby': 'message-id' }}
					message={<span id='message-id'>El rol {myValues.name} fue creado con exito.</span>}
				/>
			}
		</div>
	</div>
);

LocationCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateLocation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createLocationMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

LocationCreate = reduxForm({
	form: 'LocationCreate',
})(LocationCreate);

const selector = formValueSelector('LocationCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerLocation.alertType,
	alertOpen: state.ReducerLocation.alertOpen,
	name: state.ReducerLocation.name,
	descripcion: state.ReducerLocation.descripcion,
	paginationPage: state.ReducerLocation.paginationPage,
	myValues: selector(state, 'name', 'rolDescription'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateLocation: (name, descripcion, paginationPage, createLocationMutation) =>
		dispatch(createLocation(name, descripcion, paginationPage, createLocationMutation)),
});

export default compose(
	graphql(CREATE_LOCATION, { name: 'createLocationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(LocationCreate);
