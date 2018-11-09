import React from 'react';
import { connect } from 'react-redux';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import { Modal } from '@material-ui/core';
import MenuItem from 'material-ui/Menu/MenuItem';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField, renderNumberField, renderSelectField } from '../RenderFields/renderFields';
import {
	closeAlert,
	setName,
	createPurchaseReq,
	setAccessEvent,
	getUserByDNI,
} from '../../actions/PurchaseRequest/actionsCreators';
import BackButton from '../widget/BackButton';
import UsersCreate from '../Users/usersCreate';
import { Aevents } from '../commonComponent';
import styles from './bankCss';
import './styles.css';

import { CREATE_PURCHASE_REQ } from '../../queries/purchaseRequest';

export const AccessEvent = (access) => {
	if (access !== {} && access.access.length > 0) {
		return (
			<Field
				name='access'
				type='select'
				label='Accesos'
				placeholder='Accesos'
				component={renderSelectField}
				validate={required}
				className='container'
			>
				{access.access.map(acc => (
					<MenuItem key={acc.access.id} value={acc.access.id}>{acc.access.name}</MenuItem>
				))}
			</Field>);
	}
	return (
		<Field
			name='access'
			type='select'
			label='Accesos'
			component={renderSelectField}
			validate={required}
			className='container'
		>
			<MenuItem />
		</Field>);
};

let PurchaseRequestCreate = ({
	access,
	userId,
	classes,
	alertOpen,
	alertType,
	newUserModal,
	actionCloseAlert,
	actionSelectEvent,
	actionCreatePurchaseReq,
	createPurchaseReqMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	actionUserByDNI,
	nameUser,
	lastName,
	idUser,
	phone,
	email,
}) => (
	<div>
		<h3 className={classes.formTitle}>Registrar Compra</h3>
		<Paper className={classes.createContainer}>
			<h6 className={classes.formTitle}>Nueva Compra</h6>
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
				<div className={classes.formStyle}>
					<Aevents actionSelectEvent={actionSelectEvent} />
				</div>
				<div className={classes.formStyle}>
					<AccessEvent access={access} />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='comment'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() =>
						actionCreatePurchaseReq(
							idUser,
							myValues,
							parseInt(userId, 10),
							parseInt(userId, 10),
							paginationPage,
							createPurchaseReqMutation,
						))
					}
					disabled={submitting}
				>
					Registrar
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
			message={<span id='message-id'>No puede generar una  peticion de pago sin {alertType}</span>}
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
				message={<span id='message-id'>La peticion de pago que intenta crear ya existe verifique he intente de nuevo.</span>}
			/>
		}
		{

			(alertType === 'creado') &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>La peticion de pago fue generada con exito </span>}
			/>
		}
		{

			(alertType === 'creado' && newUserModal) &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El usuario fue creado con exito </span>}
			/>
		}
		<Modal
			open={newUserModal}
			disableAutoFocus={false}
		>
			<div>
				<UsersCreate />
			</div>
		</Modal>
	</div>
);

PurchaseRequestCreate.propTypes = {
	newUserModal: PropTypes.bool.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	nameUser: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	access: PropTypes.array.isRequired,
	actionCreatePurchaseReq: PropTypes.func.isRequired,
	actionUserByDNI: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionSelectEvent: PropTypes.func.isRequired,
	createPurchaseReqMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	idUser: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

PurchaseRequestCreate = reduxForm({
	form: 'PurchaseRequestCreate',
})(PurchaseRequestCreate);

const selector = formValueSelector('PurchaseRequestCreate');

const mapStateToProps = state => ({
	newUserModal: state.ReducerPurchaseRequest.newUserModal,
	id: state.ReducerPurchaseRequest.id,
	idUser: state.ReducerPurchaseRequest.idUser,
	email: state.ReducerPurchaseRequest.email,
	dni: state.ReducerPurchaseRequest.dni,
	phone: state.ReducerPurchaseRequest.phone,
	nameUser: state.ReducerPurchaseRequest.nameUser,
	lastName: state.ReducerPurchaseRequest.lastName,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerUserType.alertType,
	alertOpen: state.ReducerUserType.alertOpen,
	name: state.ReducerUserType.name,
	descripcion: state.ReducerUserType.descripcion,
	paginationPage: state.ReducerPurchaseRequest.paginationPagePreq,
	access: state.ReducerPurchaseRequest.access,
	myValues: selector(state, 'dni', 'roles', 'access', 'event', 'comment'),
});

const mapDispatchToProps = dispatch => ({
	actionUserByDNI: (event, dni) => dispatch(getUserByDNI(event, dni)),
	actionSelectEvent: (event, id) => dispatch(setAccessEvent(event, id)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionCreatePurchaseReq: (
		idUser,
		myValues,
		createdBy,
		updatedBy,
		paginationPage,
		createPurchaseReqMutation,
	) =>
		dispatch(createPurchaseReq(
			idUser,
			myValues,
			createdBy,
			updatedBy,
			paginationPage,
			createPurchaseReqMutation,
		)),
});

export default compose(
	graphql(CREATE_PURCHASE_REQ, { name: 'createPurchaseReqMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequestCreate);
