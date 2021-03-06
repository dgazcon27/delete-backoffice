import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
} from '@material-ui/core';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';

import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styles from '../Shared/sharedStyles';

import {
	getUserByDNI,
	closeTicketModal,
	assingTicket,
	showUserForm,
} from '../../actions/Ticket/actionsCreators';
import { renderNumberField } from '../RenderFields/renderFields';
import {
	required,
	empty,
} from '../validations/validations';

let ModalAssignTicket = ({
	classes,
	actionSearchUser,
	actionAssignTicket,
	actionCloseModal,
	actionShowUserForm,
	existUser,
	myValues,
	userId,
	purchase,
	searcherFailed,
	user,
}) => (
	<div>
		<Paper className={classes.modalAssignTicket}>
			<div>
				<h6 className={classes.formTitle}>Buscar Usuario</h6>
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
							<Search onClick={(event) => {
								event.preventDefault(actionSearchUser(myValues));
							}}
							/>
						</IconButton>
					</div>
				</form>
			</div>
			{ existUser &&
				<div>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.center}>Nombre y Apellido</TableCell>
								<TableCell className={classes.center}>Correo</TableCell>
								<TableCell className={classes.center}>Teléfono</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow key='1'>
								<TableCell className={classes.center}>{user.name}</TableCell>
								<TableCell className={classes.center}>{user.email}</TableCell>
								<TableCell className={classes.center}>{user.phone}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<div className={classes.centered}>
						<button
							className={classes.createButton}
							onClick={(event) => {
								event.preventDefault(actionAssignTicket({
									id: purchase,
									user: user.id,
									updatedBy: userId,
								}));
							}}
						>
						Acreditar
						</button>
						<button
							className={classes.createButton}
							onClick={(event) => {
								event.preventDefault(actionCloseModal());
							}}
						>
						Cancelar
						</button>
					</div>
				</div>
			}
			{ searcherFailed &&
				<div>
					<h6>El DNI no se encuentra registrado. ¿Desea agreagarlo?</h6>
					<button
						className={classes.createButton}
						onClick={(event) => {
							event.preventDefault(actionShowUserForm(false, false, false, false));
						}}
					>
					Agregar
					</button>
				</div>
			}
		</Paper>
	</div>
);

ModalAssignTicket = reduxForm({
	form: 'SearchUserTicket',
})(ModalAssignTicket);

const selector = formValueSelector('SearchUserTicket');

ModalAssignTicket.propTypes = {
	user: PropTypes.object.isRequired,
	myValues: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	purchase: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	existUser: PropTypes.bool.isRequired,
	searcherFailed: PropTypes.bool.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionAssignTicket: PropTypes.func.isRequired,
	actionShowUserForm: PropTypes.func.isRequired,
	actionSearchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: {
		name: state.ReducerTicket.name,
		email: state.ReducerTicket.email,
		phone: state.ReducerTicket.phone,
		id: state.ReducerTicket.id,
	},
	existUser: state.ReducerTicket.existUser,
	purchase: state.ReducerTicket.purchase,
	searcherFailed: state.ReducerTicket.searcherFailed,
	userId: state.ReducerLogin.userId,
	myValues: selector(state, 'dni'),
});

const mapDispatchToProps = dispatch => ({
	actionSearchUser: id => dispatch(getUserByDNI(id)),
	actionCloseModal: () => dispatch(closeTicketModal()),
	actionAssignTicket: data => dispatch(assingTicket(data)),
	actionShowUserForm: (noModal, viewList, existUser, isOpen) =>
		dispatch(showUserForm(noModal, viewList, existUser, isOpen)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ModalAssignTicket);
