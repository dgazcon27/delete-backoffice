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
import BackButton from '../widget/BackButton';
import styles from '../Shared/sharedStyles';
import Title from '../Shared/title';

import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_ACCESS } from '../../queries/access';
import {
	closeAlert,
	editAccess,
} from '../../actions/Access/actionsCreators';

import {
	Location,
	Zone,
} from '../commonComponent';

let AccessEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditAccess,
	editAccessMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<Title title='Acceso' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Acceso</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='descriptionAccess'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Descripción'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='currency'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Moneda'
					/>
				</div>
				<div className={classes.formStyle}>
					<Location />
				</div>
				<div className={classes.formStyle}>
					<Zone />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditAccess(myValues, paginationPage, editAccessMutation))} disabled={submitting} >
					Guardar
				</button>
				<BackButton />
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
			message={<span id='message-id'>El Acceso que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Acceso {myValues.name} fue editado con éxito.</span>}
		/>
		}
	</div>
);

AccessEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditAccess: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editAccessMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

AccessEdit = reduxForm({
	form: 'AccessEdit',
	enableReinitialize: true,
})(AccessEdit);

const selector = formValueSelector('AccessEdit');

const mapStateToProps = state => ({
	id: state.ReducerAccess.id,
	initialValues: state.ReducerAccess,
	alertType: state.ReducerAccess.alertType,
	alertOpen: state.ReducerAccess.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'id', 'name', 'descriptionAccess', 'currency', 'location', 'zone', 'status'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditAccess: (
		access,
		paginationPage,
		editAccessMutation,
	) => dispatch(editAccess(
		access,
		paginationPage,
		editAccessMutation,
	)),
});

export default compose(
	graphql(EDIT_ACCESS, { name: 'editAccessMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEdit);
