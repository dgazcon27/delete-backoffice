import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
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
import { closeAlert } from '../../actions/Reservation/actionsCreators';


let ReservationEdit = ({
	classes,
	alertOpen,
	alertType,
	purchaseRequest,
	actionCloseAlert,
}) => (
	<div>
		<h3 className={classes.formTitle}>Editar Paquete
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Paquete</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						label='Nombre'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='lastName'
						type='text'
						component={renderTextField}
						label='Nombre'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='purchaseRequest'
						type='text'
						component={renderTextField}
						label='Compra'
						className='yourclass'
						valor={purchaseRequest}
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
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='days'
						type='text'
						component={renderNumberField}
						validate={[required]}
						label='Días'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='quantity'
						type='text'
						component={renderNumberField}
						validate={[required]}
						label='Cantidad'
						className='yourclass'
						valor
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='hotel'
						type='text'
						component={renderTextField}
						label='Nombre de Hotel'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='room'
						type='text'
						component={renderTextField}
						label='Nombre de Habitación'
						className='yourclass'
						disabled
					/>
				</div>
				<Link to='/reservation' href='/reservation' className={classes.returnButton} >
					Regresar
				</Link>
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
			message={<span id='message-id'>La Reservación que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Reservación fue editada con éxito.</span>}
		/>
		}
	</div>
);

ReservationEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	alertType: PropTypes.string.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	purchaseRequest: PropTypes.number.isRequired,
};

ReservationEdit = reduxForm({
	form: 'ReservationEdit',
	enableReinitialize: true,
})(ReservationEdit);

const selector = formValueSelector('ReservationEdit');

const mapStateToProps = state => ({
	hotel: state.ReducerReservation.hotel,
	initialValues: state.ReducerReservation,
	alertType: state.ReducerReservation.alertType,
	alertOpen: state.ReducerReservation.alertOpen,
	purchaseRequest: state.ReducerReservation.purchaseRequest,
	myValues: selector(state, 'client', 'purchaseRequest', 'comment', 'days', 'quantity', 'room', 'lastName'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ReservationEdit);
