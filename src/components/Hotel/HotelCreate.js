import React from 'react';
import { connect } from 'react-redux';
import {
	reduxForm,
	formValueSelector,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	closeAlert,
	createHotel,
} from '../../actions/Hotel/actionsCreators';
import BackButton from '../widget/BackButton';
import {
	Aevents,
	Providers,
} from '../commonComponent';
import styles from '../Shared/sharedStyles';
import './styles.css';

import { CREATE_HOTEL } from '../../queries/hotels';

let HotelCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateHotel,
	createHotelMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h3 className={classes.formTitle}>Registrar Hotel
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<h6 className={classes.formTitle}>Nuevo Hotel</h6>
			<form>
				<div className={classes.formStyle}>
					<Aevents />
				</div>
				<div className={classes.formStyle}>
					<Providers />
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() =>
						actionCreateHotel(
							myValues.event,
							myValues.provider,
							parseInt(userId, 10),
							parseInt(userId, 10),
							paginationPage,
							createHotelMutation,
						))
					}
					disabled={submitting}
				>
					Crear
				</button>
				<BackButton />
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
				message={<span id='message-id'>El hotel que intenta crear ya existe verifique he intente de nuevo.</span>}
			/>
		}
		{
			alertType === 'creado' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El hotel fue regristrado con exito </span>}
			/>
		}

	</div>
);

HotelCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionCreateHotel: PropTypes.func.isRequired,
	createHotelMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

HotelCreate = reduxForm({
	form: 'HotelCreate',
})(HotelCreate);

const selector = formValueSelector('HotelCreate');

const mapStateToProps = state => ({
	newUserModal: state.ReducerHotel.newUserModal,
	id: state.ReducerHotel.id,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerHotel.alertType,
	alertOpen: state.ReducerHotel.alertOpen,
	name: state.ReducerHotel.name,
	descripcion: state.ReducerHotel.descripcion,
	paginationPage: state.ReducerHotel.paginationPageHotel,
	myValues: selector(state, 'event', 'provider'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateHotel: (
		event,
		provider,
		createdBy,
		updatedBy,
		paginationPage,
		createHotelMutation,
	) =>
		dispatch(createHotel(
			event,
			provider,
			createdBy,
			updatedBy,
			paginationPage,
			createHotelMutation,
		)),
});

export default compose(
	graphql(CREATE_HOTEL, { name: 'createHotelMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(HotelCreate);
