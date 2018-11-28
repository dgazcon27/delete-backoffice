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
	updateHotel,
	getHotelById,
} from '../../actions/Hotel/actionsCreators';
import {
	Aevents,
	Providers,
} from '../commonComponent';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import styles from '../Shared/sharedStyles';
import './styles.css';
import { UPDATE_HOTEL } from '../../queries/hotels';

let EditHotel = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionUpdateHotel,
	myValues,
	submitting,
	handleSubmit,
	actionSetHotel,
	updateMutation,
	match,
}) => {
	actionSetHotel(parseInt(match.params.id, 10));
	return (
		<div>
			<Title title='Editar Hotel' />
			<Paper className={classes.createContainer}>
				<h6 className={classes.formTitle}>Hotel</h6>
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
							actionUpdateHotel(
								{
									...myValues,
									updatedBy: parseInt(userId, 10),
									createdBy: parseInt(userId, 10),
								},
								updateMutation,
							))
						}
						disabled={submitting}
					>
						Editar
					</button>
					<BackButton />
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
					message={<span id='message-id'>El hotel fue actualizado con exito </span>}
				/>
			}

		</div>
	);
};

EditHotel.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionSetHotel: PropTypes.func.isRequired,
	actionUpdateHotel: PropTypes.func.isRequired,
	updateMutation: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

EditHotel = reduxForm({
	form: 'EditHotel',
	enableReinitialize: true,
})(EditHotel);

const selector = formValueSelector('EditHotel');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerHotel.alertType,
	alertOpen: state.ReducerHotel.alertOpen,
	initialValues: state.ReducerHotel,
	myValues: selector(state, 'id', 'event', 'provider'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionUpdateHotel: (hotel, updateMutation) => dispatch(updateHotel(hotel, updateMutation)),
	actionSetHotel: id => dispatch(getHotelById(id)),
});

export default compose(
	graphql(UPDATE_HOTEL, { name: 'updateMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(EditHotel);
