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
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import styles from '../Shared/sharedStyles';

import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
} from '../RenderFields/renderFields';
import { EDIT_PAYMENT } from '../../queries/payment';
import {
	closeAlert,
	editPayment,
} from '../../actions/Payment/actionsCreators';

let PaymentEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	initialValues,
}) => (
	<div>
		<Title title='Pagos' />

		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Pago</h6>
				<div className={classes.formStyle}>
					<Field
						name='amount'
						type='number'
						component={renderNumberField}
						validate={[required, empty]}
						label='cantidad'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='type'
						type='text'
						component={renderTextField}
						validate={required}
						label='Tipo'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='reference'
						type='text'
						component={renderTextField}
						validate={required}
						label='Referencia'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='bankName'
						type='text'
						component={renderTextField}
						validate={required}
						label='Nombre del banco'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={required}
						label='Comentario/Observaciones'
						className='yourclass'
						disabled
					/>
				</div>
				<BackButton />
			</form>
		</Paper>
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Pago {initialValues.id} fue editado con éxito.</span>}
		/>
		}
	</div>
);

PaymentEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

PaymentEdit = reduxForm({
	form: 'PaymentEdit',
	enableReinitialize: true,
})(PaymentEdit);

const selector = formValueSelector('PaymentEdit');

const mapStateToProps = state => ({
	initialValues: state.ReducerPayment,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerPayment.alertType,
	alertOpen: state.ReducerPayment.alertOpen,
	bankName: state.ReducerPayment.bankName,
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'id', 'purchaseRequest', 'amount', 'reference', 'comment', 'type', 'bankAccount'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditPayment: (
		id,
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		updatedBy,
		paginationPage,
		editPaymentMutation,
	) => dispatch(editPayment(
		id,
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
		updatedBy,
		paginationPage,
		editPaymentMutation,
	)),
});

export default compose(
	graphql(EDIT_PAYMENT, { name: 'editPaymentMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PaymentEdit);
