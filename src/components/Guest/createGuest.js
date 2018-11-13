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
import { CREATE_GUEST } from '../../queries/guest';
import { closeAlert } from '../../actions/sharedActions/sharedActions';
import { createInvited } from '../../actions/Guest/actionsCreators';
import {
	Events,
	Access,
	Status,
	Countries,
	SelectRoles,
	TypeInvited,
} from '../commonComponent';

let InvitedCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCreate,
	actionCloseAlert,
	myValues,
	submitting,
	handleSubmit,
	createMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Invitados</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo invitado</h6>
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
						name='email'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Correo'
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
					<SelectRoles name='role' label='Roles' />
				</div>
				<div className={classes.formStyle}>
					<TypeInvited />
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={
						handleSubmit(() => actionCreate(
							{
								...myValues,
								updatedBy: userId,
								createdBy: userId,
							},
							createMutation,

						))

					}
					disabled={submitting}
				>
					Crear
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
				message={<span id='message-id'>El invitado {myValues.name} {myValues.lastName} fue creado con exito.</span>}
			/>
		}
	</div>
);

InvitedCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionCreate: PropTypes.func.isRequired,
	createMutation: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
};

InvitedCreate = reduxForm({
	form: 'InvitedCreate',
})(InvitedCreate);

const selector = formValueSelector('InvitedCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerGuest.alertType,
	alertOpen: state.ReducerGuest.alertOpen,
	states: state.ReducerGuest.states,
	userId: state.ReducerLogin.userId,
	myValues: selector(
		state,
		'name',
		'lastName',
		'email',
		'phone',
		'dni',
		'access',
		'status',
		'event',
		'typeInvited',
		'citizenship',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCreate: (invited, createMutation) => dispatch(createInvited(invited, createMutation)),
	actionCloseAlert: () => dispatch(closeAlert()),
});

export default compose(
	graphql(CREATE_GUEST, { name: 'createMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(InvitedCreate);
