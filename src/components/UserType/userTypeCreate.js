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
	// IconButton,
	Input,
} from '@material-ui/core';
import styles from './userTypeCss';
import { CREATE_ROL } from '../../queries/userType';
import {
	setName,
	setDescription,
	createRol,
} from '../../actions/userType/actionsCreators';

const UserTypeCreate = ({
	name,
	classes,
	descripcion,
	actionSetName,
	actionCreateRol,
	createRolMutation,
	actionSetDescription,
	paginationPage,
}) => (
	<div>
		<h4>Nuevo Rol</h4>
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
			<Link to='/user-type' href='/user-type' className={classes.createButton} type='submit' onClick={() => actionCreateRol(name, descripcion, paginationPage, createRolMutation)}>
				Crear
			</Link>
			<Link to='/user-type' href='/user-type' className={classes.createButton} >
				Regresar
			</Link>
		</div>
	</div>
);


UserTypeCreate.propTypes = {
	name: PropTypes.string.isRequired,
	descripcion: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	actionSetName: PropTypes.func.isRequired,
	actionCreateRol: PropTypes.func.isRequired,
	createRolMutation: PropTypes.func.isRequired,
	actionSetDescription: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	name: state.ReducerUserType.name,
	descripcion: state.ReducerUserType.descripcion,
	paginationPage: state.ReducerUserType.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateRol: (name, descripcion, paginationPage, createRolMutation) =>
		dispatch(createRol(name, descripcion, paginationPage, createRolMutation)),
});

export default compose(
	graphql(CREATE_ROL, { name: 'createRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserTypeCreate);
