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
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_CATEGORY } from '../../queries/category';

import {
	closeAlert,
	editCategory,
} from '../../actions/Category/actionsCreators';
import Title from '../Shared/title';

let CategoryEdit = ({
	classes,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	actionCloseAlert,
	actionEditCategory,
	editCategoryMutation,
	paginationPage,
	initialValues,
}) => (
	<div>
		<Title title='Categoría' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Categoría</h6>
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
						name='description'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Description'
					/>
				</div>
				<div className={classes.centered}>
					<button
						className={classes.createButton}
						type='submit'
						onClick={
							handleSubmit(() => actionEditCategory(
								initialValues.id,
								myValues.name,
								myValues.description,
								paginationPage,
								editCategoryMutation,
							))
						}
						disabled={submitting}
					>
					Guardar
					</button>
					<Link to='/category' href='/category' className={classes.returnButton} >
					Regresar
					</Link>
				</div>
			</form>
		</Paper>
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			autoHideDuration={1000}
			onClose={actionCloseAlert}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>La Categoría que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			autoHideDuration={1000}
			onClose={actionCloseAlert}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Categoría {myValues.name} fue creada con éxito.</span>}
		/>
		}
	</div>
);

CategoryEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditCategory: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editCategoryMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

CategoryEdit = reduxForm({
	form: 'CategoryEdit',
	enableReinitialize: true,
})(CategoryEdit);

const selector = formValueSelector('CategoryEdit');

const mapStateToProps = state => ({
	alertType: state.ReducerCategory.alertType,
	alertOpen: state.ReducerCategory.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerCategory,
	myValues: selector(
		state,
		'name',
		'description',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditCategory: (
		id,
		name,
		description,
		paginationPage,
		editCategoryMutation,
	) => dispatch(editCategory(
		id,
		name,
		description,
		paginationPage,
		editCategoryMutation,
	)),
});

export default compose(
	graphql(EDIT_CATEGORY, { name: 'editCategoryMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(CategoryEdit);
