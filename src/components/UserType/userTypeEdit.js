/* eslint no-unused-vars: "off" */

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
	IconButton,
	Input,
} from '@material-ui/core';
import styles from './userTypeCss';
import { EDIT_ROL } from '../../queries/userType';
import {
	setRol,
	setName,
	setDescription,
	editRol,
} from '../../actions/userType/actionsCreators';

const UserTypeEdit = ({
	name,
	classes,
	descripcion,
	actionSetName,
	actionEditRol,
	editRolMutation,
	actionSetDescription,
	paginationPage,
}) => (
	<div>
		<h4>Editar Rol</h4>
		<div className={classes.createContainer}>
			<Input
				type='text'
				placeholder='Nombre'
				defaultValue={name}
				onChange={actionSetName}
				fullWidth
				disableUnderline
			/>
			<Input
				rows={5}
				multiline
				fullWidth
				disableUnderline
				placeholder='Descripcion'
				defaultValue={descripcion}
				onChange={actionSetDescription}
			/>
			<Link to='/user-type' href='/user-type' className={classes.createButton} type='submit' onClick={() => actionEditRol(name, descripcion, paginationPage, editRolMutation)}>
				Confirmar
			</Link>
			<Link to='/user-type' href='/user-type' className={classes.createButton} >
				Regresar
			</Link>
		</div>
	</div>
);

UserTypeEdit.propTypes = {
	name: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	descripcion: PropTypes.string.isRequired,
	actionSetName: PropTypes.func.isRequired,
	actionEditRol: PropTypes.func.isRequired,
	editRolMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionSetDescription: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	name: state.ReducerUserType.name,
	descripcion: state.ReducerUserType.descripcion,
	paginationPage: state.ReducerUserType.paginationPage,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionEditRol: (id, name, descripcion, paginationPage, editRolMutation) =>
		dispatch(editRol(id, name, descripcion, editRolMutation)),
});

export default compose(
	graphql(EDIT_ROL, { name: 'editRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserTypeEdit);
