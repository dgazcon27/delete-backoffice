import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	IconButton,
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
			<IconButton className={classes.createButton} type='submit' onClick={() => actionCreateRol(name, descripcion, createRolMutation)}>
				Crear
			</IconButton>
			<IconButton className={classes.createButton} type='submit' >
				Regresar
			</IconButton>
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
};

const mapStateToProps = state => ({
	name: state.ReducerUserType.name,
	descripcion: state.ReducerUserType.descripcion,
});
const mapDispatchToProps = dispatch => ({
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateRol: (name, descripcion, createRolMutation) =>
		dispatch(createRol(name, descripcion, createRolMutation)),
});
export default compose(
	graphql(CREATE_ROL, { name: 'createRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserTypeCreate);
