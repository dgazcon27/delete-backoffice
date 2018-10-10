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
import { EDIT_PURCHASE_REQ } from '../../queries/purchaseRequest';
import {
	cleanState,
	closeAlert,
} from '../../actions/Bank/actionsCreators';
import BackButton from '../widget/BackButton';

import { editPurchaseReq } from '../../actions/PurchaseRequest/actionsCreators';
import {
	Users,
	Access,
	Events,
	Status,
} from '../commonComponent';

let PurchaseRequestEdit = ({
	userId,
	classes,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	paginationPage,
	actionCloseAlert,
	actionEditPurchaseReq,
	editPurchaseReqMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Solicitud de Compra</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Solicitud de Compra</h6>

				<div className={classes.formStyle}>
					<Users />
				</div>
				<div className={classes.formStyle}>
					<Access />
				</div>
				<div className={classes.formStyle}>
					<Events />
				</div>
				<div className={classes.formStyle}>
					<Status />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='comment'
					/>
				</div>

				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionEditPurchaseReq(
						myValues,
						userId,
						paginationPage,
						editPurchaseReqMutation,
					))}
					disabled={submitting}
				>
				Confirmar
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
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	actionEditPurchaseReq: PropTypes.func.isRequired,
	editPurchaseReqMutation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
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
