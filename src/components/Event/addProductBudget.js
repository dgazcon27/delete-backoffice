import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	Field,
	reduxForm,
	formValueSelector,
	reset,
} from 'redux-form';
import {
	compose,
	graphql,
}
	from 'react-apollo';
import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	IconButton,
} from '@material-ui/core';
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	empty,
	required,
} from '../validations/validations';
import { closeAlert } from '../../actions/Provider/actionsCreators';
import { addProduct, updateBudget } from '../../actions/Event/actionsCreators';
import BackButton from '../widget/BackButton';
import { Products } from '../commonComponent';
import { renderNumberField, renderTextField } from '../RenderFields/renderFields';
import { UPDATE_BUDGET } from '../../queries/event';

function pushP(arr, argument, action) {
	const pass = argument;
	if (argument.product !== ' ' &&
		argument.product !== undefined &&
		argument.price !== ' ' &&
 		argument.price !== undefined &&
 		argument.quantity !== ' ' &&
 		argument.quantity !== undefined) {
		pass.id = arr.length + 1;
		action(arr, reset);
		arr.push(pass);
	}
}
function removeItem(array, id) {
	const I = array.map(a => (a.id)).indexOf(id);
	console.log('I', I);
	console.log('pre', array);
	array.splice(I, 1);
	console.log('post', array);
}

let AddProductBudget = ({
	id,
	userId,
	myValues,
	classes,
	products,
	alfa,
	reset,
	actionAddProduct,
	actionUpdateBudget,
	updateBudgetMutation,
}) => {
	const aux = window.location.pathname.split('/', 3);
	const budgetId = parseInt(aux[2], 10);
	return (
		<div>

			<h3 className={classes.formTitle}>Cotizacion
				<div className={classes.backbuttonCreation}>
					<BackButton />
				</div>
			</h3>
			<Paper className={classes.addProd} >
				<form>
					<h6 className={classes.formTitle}>Detalles de cotizacion</h6>
					<div className='row'>
						<div className='input-field col s4'>
							<Field
								name='totalPaid'
								type='text'
								component={renderTextField}
								validate={[required, empty]}
								label='Total Pagado'
								className='yourclass'
								disabled
							/>
						</div>
						<div className='input-field col s4'>
							<Field
								name='pendingPayment'
								type='text'
								component={renderTextField}
								validate={[required, empty]}
								label='Pendiente por pagar'
								className='yourclass'
								disabled
							/>
						</div>
						<div className='input-field col s4'>
							<Field
								name='totalPrice'
								type='text'
								component={renderTextField}
								validate={[required, empty]}
								label='precio total'
								className='yourclass'
								disabled
							/>
						</div>

						<div className='input-field col s6'>
							<Field
								name='comment'
								type='text'
								component={renderTextField}
								validate={[required, empty]}
								label='Comentario'
								className='yourclass'
								disabled
							/>
						</div>
						<div className='input-field col s6'>
							<Field
								name='currency'
								type='text'
								component={renderTextField}
								validate={[required, empty]}
								label='Moneda'
								className='yourclass'
								disabled
							/>
						</div>
					</div>
				</form>

				<Table className={classes.addProdBlock1}>
					<TableHead>
						<TableRow >
							<TableCell className={classes.center}>Nombre de producto</TableCell>
							<TableCell className={classes.center}>Cantidad</TableCell>
							<TableCell className={classes.center}>Precio</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							products.map(item => (
								<TableRow key={item.id}>
									<TableCell className={classes.center}>
										{ item.product.name }
									</TableCell>
									<TableCell className={classes.center}>
										{ item.quantity }
									</TableCell>
									<TableCell className={classes.center}>
										{ item.price }
									</TableCell>

								</TableRow>
							))
						}
					</TableBody>
				</Table>

				<form className={classes.addProdBlock2} >
					<div >
						<h6 className={classes.formTitle} >Productos para adicionar  </h6>

						<div>
							<div className={classes.buttLeft}>
								<IconButton onClick={() => {
									pushP(alfa, { price: myValues.price, quantity: myValues.quant, product: myValues.prod }, actionAddProduct);
									reset(AddProductBudget);
								}
								}
								>
						Agregar Producto
								</IconButton>
							</div>
						</div>
						<div className={classes.buttRight}>
							<IconButton onClick={() => {
								actionUpdateBudget(
									budgetId,
									alfa,
									userId,
									updateBudgetMutation,
								);
							}}
							>
							actualizar cotizacion
							</IconButton>
						</div>
					</div>


				</form>
				<div className={classes.formStyle}>
					<Products />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='price'
						type='number'
						component={renderNumberField}
						validate={[required, empty]}
						label='Precio'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='quant'
						type='number'
						component={renderNumberField}
						validate={[required, empty]}
						label='Cantidad'
					/>
				</div>
				<Table >
					<TableHead>
						<TableRow >
							<TableCell className={classes.center}>ID de producto</TableCell>
							<TableCell className={classes.center}>Cantidad</TableCell>
							<TableCell className={classes.center}>Precio</TableCell>
							<TableCell className={classes.center}>Opciones</TableCell>

						</TableRow>
					</TableHead>

					<TableBody>
						{alfa.map(item => (
							<TableRow key={item.id}>
								<TableCell className={classes.center}>
									{ item.product }
								</TableCell>
								<TableCell className={classes.center}>
									{ item.quantity }
								</TableCell>
								<TableCell className={classes.center}>
									{ item.price }
								</TableCell>
								<TableCell className={classes.center}>
									<IconButton onClick={() => {
										console.log('pre borrar', item);
										removeItem(alfa, item.id);
										reset(AddProductBudget);
									}
									}
									>
									X
									</IconButton>
								</TableCell>
							</TableRow>
						))
						}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

AddProductBudget.propTypes = {
	id: PropTypes.number.isRequired,
	actionAddProduct: PropTypes.func.isRequired,
	actionUpdateBudget: PropTypes.func.isRequired,
	updateBudgetMutation: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
	alfa: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,

};

AddProductBudget = reduxForm({
	form: 'AddProductBudget',
	enableReinitialize: true,
})(AddProductBudget);

const selector = formValueSelector('AddProductBudget');

const mapStateToProps = state => ({
	id: state.ReducerProvider.id,
	userId: state.ReducerLogin.userId,
	products: state.ReducerEvent.products,
	alfa: state.ReducerEvent.alfa,
	totalPaid: state.ReducerEvent.totalPaid,
	totalPrice: state.ReducerEvent.totalPrice,
	pendingPayment:	state.ReducerEvent.pendingPayment,
	comment:	state.ReducerEvent.comment,
	currency:	state.ReducerEvent.currency,
	alertType: state.ReducerProvider.alertType,
	alertOpen: state.ReducerProvider.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerEvent,
	myValues: selector(
		state,
		'userId',
		'totalPaid',
		'totalPrice',
		'pendingPayment',
		'products',
		'comment',
		'currency',
		'prod',
		'price',
		'quant',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionAddProduct: productsNew => dispatch(addProduct(productsNew)),
	actionUpdateBudget: (
		budgetId,
		alfa,
		userId,
		updateBudgetMutation,
	) => dispatch(updateBudget(
		budgetId,
		alfa,
		userId,
		updateBudgetMutation,
	)),
});

export default compose(
	graphql(UPDATE_BUDGET, { name: 'updateBudgetMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AddProductBudget);
