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

import { required, empty } from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { EDIT_PURCHASE_REQ } from '../../queries/purchaseRequest';
import {
	cleanState,
	closeAlert,
} from '../../actions/Bank/actionsCreators';

import { editPurchaseReq } from '../../actions/PurchaseRequest/actionsCreators';

let PurchaseRequestEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
}) => (
	<div>
		<h3 className={classes.formTitle}>Solicitud de Compra
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Solicitud de Compra</h6>

				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='lastName'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Apellido'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='phone'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Teléfono'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='email'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Correo'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='accessName'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Accesos'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='event'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Eventos'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Comentario'
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
				message={<span id='message-id'>La petición de pago fue editado con exito.</span>}
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
				message={<span id='message-id'>No pueden existir 2 o mas bancos con el mismo nombre verifique e intente de nuevo.</span>}
			/>
		}
	</div>
);

PurchaseRequestEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
};

PurchaseRequestEdit = reduxForm({
	form: 'PurchaseRequestEdit',
	enableReinitialize: true,
})(PurchaseRequestEdit);

const selector = formValueSelector('PurchaseRequestEdit');

const mapStateToProps = state => ({
	alertType: state.ReducerPurchaseRequest.alertType,
	alertOpen: state.ReducerPurchaseRequest.alertOpen,
	initialValues: state.ReducerPurchaseRequest,
	name: state.ReducerPurchaseRequest.name,
	currency: state.ReducerPurchaseRequest.currency,
	paginationPage: state.ReducerPurchaseRequest.paginationPagePreq,
	userId: state.ReducerLogin.userId,
	myValues: selector(state, 'id', 'user', 'access', 'event', 'status', 'comment'),
});
const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCleanState: () => dispatch(cleanState()),
	actionEditPurchaseReq: (
		purchase,
		paginationPage,
		updatedBy,
		editPurchaseReqMutation,
	) =>
		dispatch(editPurchaseReq(
			purchase,
			paginationPage,
			updatedBy,
			editPurchaseReqMutation,
		)),
});

export default compose(
	graphql(EDIT_PURCHASE_REQ, { name: 'editPurchaseReqMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequestEdit);
