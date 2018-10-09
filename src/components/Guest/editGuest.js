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
import styles from '../Shared/sharedStyles';
import '../Shared/styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { UPDATE_GUEST } from '../../queries/guest';
import { closeAlert } from '../../actions/sharedActions/sharedActions';
import { updateGuest } from '../../actions/Guest/actionsCreators';
import {
	Events,
	Access,
	Status,
	Countries,
	Roles,
	TypeInvited,
} from '../commonComponent';

let UpdateGuest = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionUpdate,
	actionCloseAlert,
	myValues,
	submitting,
	handleSubmit,
	updateMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Invitados</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar invitado</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre de invitado'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='lastName'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Apellido de invitado'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='phone'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Teléfono'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='dni'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='dni'
					/>
				</div>

				<div className={classes.formStyle}>
					<Countries name='citizenship' />
				</div>
				<div className={classes.formStyle}>
					<Events />
				</div>
				<div className={classes.formStyle}>
					<Status />
				</div>
				<div className={classes.formStyle}>
					<Access />
				</div>
				<div className={classes.formStyle}>
					<Roles name='role' label='Roles' />
				</div>
				<div className={classes.formStyle}>
					<TypeInvited />
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={
						handleSubmit(() => actionUpdate(
							{ ...myValues, updatedBy: userId },
							updateMutation,
						))

					}
					disabled={submitting}
				>
					Actualizar
				</button>
				<Link to='/guests' href='/guests' className={classes.returnButton} >
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
				message={<span id='message-id'>El invitado que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
			/>
		}
		{alertType === 'creado' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El invitado {myValues.name} {myValues.lastName} fue actualizado con éxito.</span>}
			/>
		}
	</div>
);

UpdateGuest.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionUpdate: PropTypes.func.isRequired,
	updateMutation: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
};

UpdateGuest = reduxForm({
	form: 'UpdateGuest',
	enableReinitialize: true,
})(UpdateGuest);

const selector = formValueSelector('UpdateGuest');

const mapStateToProps = state => ({
	alertType: state.ReducerGuest.alertType,
	alertOpen: state.ReducerGuest.alertOpen,
	states: state.ReducerGuest.states,
	userId: state.ReducerLogin.userId,
	initialValues: state.ReducerGuest,
	myValues: selector(
		state,
		'id',
		'name',
		'lastName',
		'phone',
		'dni',
		'access',
		'status',
		'event',
		'typeInvited',
		'citizenship',
		'role',
	),
});

const mapDispatchToProps = dispatch => ({
	actionUpdate: (guest, updateMutation) => dispatch(updateGuest(guest, updateMutation)),
	actionCloseAlert: () => dispatch(closeAlert()),
});

export default compose(
	graphql(UPDATE_GUEST, { name: 'updateMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UpdateGuest);
