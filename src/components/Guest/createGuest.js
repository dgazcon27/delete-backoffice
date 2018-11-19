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
import { Modal } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import styles from '../Shared/sharedStyles';
import '../Shared/styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderNumberField } from '../RenderFields/renderFields';
import { NEW_CREATE_GUEST } from '../../queries/guest';
import { closeAlert } from '../../actions/sharedActions/sharedActions';
import { createInvited } from '../../actions/Guest/actionsCreators';
import { getUserByDNI } from '../../actions/PurchaseRequest/actionsCreators';
import {
	Events,
	Access,
	Status,
	Countries,
	TypeInvited,
} from '../commonComponent';
import NewUsersCreate from '../Users/newUsersCreate';
import BackButton from '../widget/BackButton';

let InvitedCreate = ({
	newUserModal,
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
	actionUserByDNI,
	nameUser,
	lastName,
	idUser,
	phone,
	email,
}) => (
	<div>
		<h3 className={classes.formTitle}>Invitados
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<h6 className={classes.formTitle}>Nuevo invitado</h6>
			<form>
				<div className={classes.formStyle}>
					<Field
						name='dni'
						type='number'
						component={renderNumberField}
						validate={[required, empty]}
						label='dni'
					/>
					<IconButton className={classes.formStyle3}>
						<Search onClick={(event) => { event.preventDefault(actionUserByDNI(myValues.dni)); }} />
					</IconButton>
				</div>
			</form>
			<div className={classes.formStyle}>
				<div className={classes.panel1} >
				Nombre: {nameUser}
					<br />
				Tlf: {phone}
				</div>

				<div className={classes.panel2} >
				Apellido: {lastName}
					<br />
				Correo: {email}
				</div>
			</div>
			<form>
				<h6 className={classes.formTitle}>Nuevo invitado</h6>

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
					<TypeInvited />
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={
						handleSubmit(() => actionCreate(
							{
								idUser,
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
		{(alertType === 'creado' && !newUserModal) &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El invitado {myValues.name} {myValues.lastName} fue creado con exito.</span>}
			/>
		}
		<Modal
			open={newUserModal}
			disableAutoFocus={false}
		>
			<div>
				<NewUsersCreate />
			</div>
		</Modal>
	</div>
);

InvitedCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	nameUser: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	idUser: PropTypes.number.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionCreate: PropTypes.func.isRequired,
	createMutation: PropTypes.func.isRequired,
	actionUserByDNI: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	newUserModal: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
};

InvitedCreate = reduxForm({
	form: 'InvitedCreate',
})(InvitedCreate);

const selector = formValueSelector('InvitedCreate');

const mapStateToProps = state => ({
	newUserModal: state.ReducerPurchaseRequest.newUserModal,
	idUser: state.ReducerPurchaseRequest.idUser,
	email: state.ReducerPurchaseRequest.email,
	phone: state.ReducerPurchaseRequest.phone,
	nameUser: state.ReducerPurchaseRequest.nameUser,
	lastName: state.ReducerPurchaseRequest.lastName,
	alertType: state.ReducerGuest.alertType,
	alertOpen: state.ReducerGuest.alertOpen,
	states: state.ReducerGuest.states,
	userId: state.ReducerLogin.userId,
	myValues: selector(
		state,
		'dni',
		'access',
		'status',
		'event',
		'typeInvited',
		'citizenship',
	),
});

const mapDispatchToProps = dispatch => ({
	actionUserByDNI: (event, dni) => dispatch(getUserByDNI(event, dni)),
	actionCreate: (
		user,
		invited,
		createMutation,
	) => dispatch(createInvited(
		user,
		invited,
		createMutation,
	)),
	actionCloseAlert: () => dispatch(closeAlert()),
});

export default compose(
	graphql(NEW_CREATE_GUEST, { name: 'createMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(InvitedCreate);
