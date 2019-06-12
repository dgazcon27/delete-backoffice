import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	graphql,
	compose,
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
	empty,
	required,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
} from '../RenderFields/renderFields';
import { EDIT_PRODUCT } from '../../queries/product';
import {
	closeAlert,
	editProduct,
} from '../../actions/Product/actionsCreators';
import { Providerss } from '../commonComponent';

import BackButton from '../widget/BackButton';


let ProductEdit = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditProduct,
	editProductMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	initialValues,
}) => (
	<div>
		<h3 className={classes.formTitle}>Producto
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Producto</h6>
				<div className='row'>
					<div className='input-field col s6'>
						<Field
							name='name'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Nombre'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s6' >
						<Field
							name='description'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Descripción'
						/>
					</div>
					<div className='col s6 l6'>
						<Field
							name='stockInicial'
							type='number'
							component={renderNumberField}
							validate={required}
							label='Stock Inicial'
							className='yourclass container date-label'
						/>
					</div>
					<div className='input-field col s6 l6'>
						<Field
							name='stock'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Stock'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s6'>
						<Providerss />
					</div>
				</div>
				<div className={classes.centered}>
					<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditProduct(initialValues.id, myValues.name, myValues.description, myValues.stockInicial, myValues.stock, myValues.provider, Number(userId), editProductMutation, paginationPage))} disabled={submitting} >
					Guardar
					</button>
					<BackButton />
				</div>
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
			message={<span id='message-id'>No puede crear un Proveedor sin {alertType}</span>}
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
			message={<span id='message-id'>El Proveedor que intenta editar ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'rolDescription' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>No puede editar un Proveedor sin {alertType}</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Proveedor fue editado con éxito.</span>}
		/>
		}
	</div>
);

ProductEdit.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditProduct: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editProductMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

ProductEdit = reduxForm({
	form: 'ProductEdit',
	enableReinitialize: true,
})(ProductEdit);

const selector = formValueSelector('ProductEdit');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerProduct.alertType,
	alertOpen: state.ReducerProduct.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerProduct,
	myValues: selector(state, 'name', 'description', 'stockInicial', 'stock', 'provider'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditProduct: (
		id,
		name,
		description,
		stockInicial,
		stock,
		provider,
		updatedBy,
		editProductMutation,
		paginationPage,
	) => dispatch(editProduct(
		id,
		name,
		description,
		stockInicial,
		stock,
		provider,
		updatedBy,
		editProductMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(EDIT_PRODUCT, { name: 'editProductMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ProductEdit);
