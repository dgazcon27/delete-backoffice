import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
import styles from './userTypeCss';
import { required, empty } from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_ROL } from '../../queries/userType';
import {
	editRol,
	closeAlert,
} from '../../actions/userType/actionsCreators';
import BackButton from '../widget/BackButton';

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
	handleSubmit,
	submitting,
}) => (
	<div>
		<h3 className={classes.formTitle}>Roles</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Rol</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						label='Nombre'
						type='text'
						placeholder='Nombre'
						component={renderTextField}
						validate={[required, empty]}
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='rolDescription'
						label='Descripción'
						type='text'
						placeholder='Descripción'
						component={renderTextField}
						validate={[required, empty]}
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditRol(id, myValues.name, myValues.rolDescription, paginationPage, editRolMutation))} disabled={submitting} >
				Guardar
				</button>
				<BackButton />
			</form>
		</Paper>
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
);

UserTypeEdit.propTypes = {
	id: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditRol: PropTypes.func.isRequired,
	editRolMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

UserTypeEdit = reduxForm({
	form: 'UserTypeEdit',
	enableReinitialize: true,
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
	actionEditRol: (id, name, rolDescription, paginationPage, editRolMutation) =>
		dispatch(editRol(id, name, rolDescription, paginationPage, editRolMutation)),
});

export default compose(
	graphql(EDIT_ROL, { name: 'editRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserTypeEdit);
