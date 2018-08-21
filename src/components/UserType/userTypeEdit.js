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
import styles from './userTypeCss';
import { required, empty } from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_ROL } from '../../queries/userType';
import {
	editRol,
	cleanState,
	closeAlert,
} from '../../actions/userType/actionsCreators';

let UserTypeEdit = ({
	id,
	classes,
	myValues,
	alertOpen,
	alertType,
	actionEditRol,
	actionCloseAlert,
	paginationPage,
	editRolMutation,
	actionCleanState,
	handleSubmit,
	submitting,
}) => (
	<div>
		<h4>Editar Rol</h4>
		<div className={classes.createContainer}>
			<form>
				<Field
					name='name'
					label='Name'
					type='text'
					placeholder='Nombre'
					component={renderTextField}
					validate={[required, empty]}
				/>
				<Field
					name='rolDescription'
					type='text'
					label='rolDescription'
					placeholder='Descripcion'
					component={renderTextField}
					validate={[required, empty]}
				/>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditRol(id, myValues.name, myValues.rolDescription, paginationPage, editRolMutation))} disabled={submitting} >
				Confirmar
				</button>
				<Link to='/user-type' href='/user-type' className={classes.createButton} onClick={() => actionCleanState()}>
				Regresar
				</Link>
			</form>
			{alertType === 'edit' &&
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{ 'aria-describedby': 'message-id' }}
					message={<span id='message-id'>El rol {myValues.name} fue editado con exito.</span>}
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
					message={<span id='message-id'>No pueden existir 2 o mas roles con el mismo nombre verifique e intente de nuevo.</span>}
				/>
			}
		</div>
	</div>
);

UserTypeEdit.propTypes = {
	id: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditRol: PropTypes.func.isRequired,
	actionCleanState: PropTypes.func.isRequired,
	editRolMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

UserTypeEdit = reduxForm({
	form: 'UserTypeEdit',
})(UserTypeEdit);

const selector = formValueSelector('UserTypeEdit');

const mapStateToProps = state => ({
	alertType: state.ReducerUserType.alertType,
	alertOpen: state.ReducerUserType.alertOpen,
	initialValues: state.ReducerUserType,
	id: state.ReducerUserType.id,
	name: state.ReducerUserType.name,
	rolDescription: state.ReducerUserType.rolDescription,
	paginationPage: state.ReducerUserType.paginationPage,
	myValues: selector(state, 'name', 'rolDescription'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCleanState: () => dispatch(cleanState()),
	actionEditRol: (id, name, rolDescription, paginationPage, editRolMutation) =>
		dispatch(editRol(id, name, rolDescription, paginationPage, editRolMutation)),
});

export default compose(
	graphql(EDIT_ROL, { name: 'editRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserTypeEdit);
