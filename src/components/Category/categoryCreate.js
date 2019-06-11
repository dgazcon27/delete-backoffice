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
import { CREATE_CATEGORY } from '../../queries/category';

import {
	closeAlert,
	createCategory,
} from '../../actions/Category/actionsCreators';
import Title from '../Shared/title';

let CategoryCreate = ({
	classes,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	actionCloseAlert,
	actionCreateCategory,
	createCategoryMutation,
	paginationPage,
}) => (
	<div>
		<Title title='Categoría' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nueva Categoría</h6>
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
							handleSubmit(() => actionCreateCategory(
								myValues.name,
								myValues.description,
								paginationPage,
								createCategoryMutation,
							))
						}
						disabled={submitting}
					>
					Crear
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

CategoryCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateCategory: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createCategoryMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

CategoryCreate = reduxForm({
	form: 'CategoryCreate',
})(CategoryCreate);

const selector = formValueSelector('CategoryCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerCategory.alertType,
	alertOpen: state.ReducerCategory.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(
		state,
		'name',
		'description',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateCategory: (
		name,
		description,
		paginationPage,
		createCategoryMutation,
	) => dispatch(createCategory(
		name,
		description,
		paginationPage,
		createCategoryMutation,
	)),
});

export default compose(
	graphql(CREATE_CATEGORY, { name: 'createCategoryMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(CategoryCreate);
