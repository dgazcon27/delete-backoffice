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
import styles from '../Shared/sharedStyles';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import NotificationAlert from '../widget/NotificationAlert';
import '../Shared/styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField } from '../RenderFields/renderFields';
import { CREATE_RATE } from '../../queries/exchangeRate';
import { Currencys } from '../commonComponent';
import { create, closeAlert } from '../../actions/exchangeRate/actionsCreator';

let ExchageRateCreate = ({
	classes,
	handleSubmit,
	submitting,
	actionCreate,
	alertType,
	userId,
	createMutation,
	myValues,
	alertOpen,
	actionCloseAlert,
}) => (
	<div>
		<Title title='Tasa de cambio' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Actualizar tasa de cambio</h6>
				<div className={classes.formStyle}>
					<Currencys />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='value'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Valor'
						className='yourclass'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={handleSubmit(() => actionCreate(
						{
							...myValues,
							createdBy: userId,
							updatedBy: userId,
						},
						createMutation,
					))}
					disabled={submitting}
				>
					Crear
				</button>
				<BackButton />
			</form>
			{ alertType === 'create' &&
				<NotificationAlert
					message='La tasa de cambio ha sido creada exitosamente'
					open={alertOpen}
					close={actionCloseAlert}
				/>
			}
		</Paper>
	</div>
);


ExchageRateCreate.propTypes = {
	classes: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	actionCreate: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
	createMutation: PropTypes.func.isRequired,
	myValues: PropTypes.object.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	alertType: PropTypes.string.isRequired,
};

ExchageRateCreate = reduxForm({
	form: 'ExchageRateCreate',
})(ExchageRateCreate);
const selector = formValueSelector('ExchageRateCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertOpen: state.ReducerExchangeRate.alertOpen,
	alertType: state.ReducerExchangeRate.alertType,
	myValues: selector(
		state,
		'value',
		'currency',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCreate: (data, createMutation) =>
		dispatch(create(data, createMutation)),
	actionCloseAlert: () =>
		dispatch(closeAlert()),
});

export default compose(
	graphql(CREATE_RATE, { name: 'createMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ExchageRateCreate);
