import React from 'react';
import { connect } from 'react-redux';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import {
	closeAlert,
	setName,
	createPurchaseReq,
} from '../../actions/PurchaseRequest/actionsCreators';

import {
	Banks,
	Users,
	Access,
	Events,
	Status,
} from '../commonComponent';


import styles from './bankCss';
import './styles.css';

import { CREATE_PURCHASE_REQ } from '../../queries/purchaseRequest';

let PurchaseRequestCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreatePurchaseReq,
	createPurchaseReqMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h3 className={classes.formTitle}>Purchase Request</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Purchase Request</h6>
				<div className={classes.formStyle}>
					<Banks />
				</div>
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
					onClick={handleSubmit(() => actionCreatePurchaseReq(
						myValues,
						parseInt(userId, 10),
						parseInt(userId, 10),
						paginationPage,
						createPurchaseReqMutation,
					))
					}
					disabled={submitting}
				>
					Crear
				</button>
				<Link to='/purchase-request' href='/purchase-request' className={classes.returnButton} >
					Regresar
				</Link>
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
			message={<span id='message-id'>No puede generar una  peticion de pago sin {alertType}</span>}
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
				message={<span id='message-id'>La peticion de pago que intenta crear ya existe verifique he intente de nuevo.</span>}
			/>
		}
		{alertType === 'creado' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>La peticion de pago fue generada con exito </span>}
			/>
		}
	</div>
);

PurchaseRequestCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreatePurchaseReq: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createPurchaseReqMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

PurchaseRequestCreate = reduxForm({
	form: 'PurchaseRequestCreate',
})(PurchaseRequestCreate);

const selector = formValueSelector('PurchaseRequestCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerUserType.alertType,
	alertOpen: state.ReducerUserType.alertOpen,
	name: state.ReducerUserType.name,
	descripcion: state.ReducerUserType.descripcion,
	paginationPage: state.ReducerPurchaseRequest.paginationPagePreq,
	myValues: selector(state, 'user', 'access', 'event', 'status', 'comment'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	// actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreatePurchaseReq: (
		myValues,
		createdBy,
		updatedBy,
		paginationPage,
		createPurchaseReqMutation,
	) =>
		dispatch(createPurchaseReq(
			myValues,
			createdBy,
			updatedBy,
			paginationPage,
			createPurchaseReqMutation,
		)),
});

export default compose(
	graphql(CREATE_PURCHASE_REQ, { name: 'createPurchaseReqMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequestCreate);
