import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
} from '@material-ui/core';
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	empty,
	required,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { closeAlert } from '../../actions/Provider/actionsCreators';

import BackButton from '../widget/BackButton';

let BudgetDetails = ({
	classes,
	products,
}) => (
	<div>
		<h3 className={classes.formTitle}>Proveedor
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Detalles Proveedor</h6>
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

			<Table >
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
		</Paper>
	</div>
);

BudgetDetails.propTypes = {
	products: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

BudgetDetails = reduxForm({
	form: 'BudgetDetails',
	enableReinitialize: true,
})(BudgetDetails);

const selector = formValueSelector('BudgetDetails');

const mapStateToProps = state => ({
	id: state.ReducerProvider.id,
	userId: state.ReducerLogin.userId,
	products: state.ReducerEvent.products,
	totalPaid: state.ReducerEvent.totalPaid,
	totalPrice: state.ReducerEvent.totalPrice,
	pendingPayment:	state.ReducerEvent.pendingPayment,
	comment:	state.ReducerEvent.comment,
	currency:	state.ReducerEvent.currency,
	alertType: state.ReducerProvider.alertType,
	alertOpen: state.ReducerProvider.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerEvent,
	myValues: selector(state, 'userId', 'totalPaid', 'totalPrice', 'pendingPayment', 'products', 'comment', 'currency'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BudgetDetails);
