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
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { Currencys } from '../commonComponent';
import { renderTextField } from '../RenderFields/renderFields';
import {
	closeAlert,
	setName,
	setDescription,
} from '../../actions/userType/actionsCreators';

import { editRate } from '../../actions/exchangeRate/actionsCreator';
import { UPDATE_RATE } from '../../queries/exchangeRate';

import BackButton from '../widget/BackButton';
import Title from '../Shared/title';

let UpdateExchangeRate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditRate,
	editRateMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	rate,
}) => (
	<div>
		<Title title='Tasa de cambio' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Actualizar tasa de cambio</h6>
				<div className={classes.formStyle}> <Currencys /> </div>
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
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditRate(rate, myValues, paginationPage, editRateMutation))} disabled={submitting} >
					Guardar
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
				message={<span id='message-id'>La moneda {myValues.currency} fue editada con exito.</span>}
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

UpdateExchangeRate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionEditRate: PropTypes.func.isRequired,
	editRateMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	rate: PropTypes.object.isRequired,

};

UpdateExchangeRate = reduxForm({
	form: 'UpdateExchangeRate',
})(UpdateExchangeRate);

const selector = formValueSelector('UpdateExchangeRate');

const mapStateToProps = state => ({
	alertType: state.ReducerExchangeRate.alertType,
	alertOpen: state.ReducerExchangeRate.alertOpen,
	name: state.ReducerExchangeRate.name,
	descripcion: state.ReducerExchangeRate.descripcion,
	id: state.ReducerExchangeRate.id,
	value: state.ReducerExchangeRate.value,
	active: state.ReducerExchangeRate.active,
	rate: state.ReducerExchangeRate,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerExchangeRate,
	myValues: selector(state, 'currency', 'value'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionEditRate: (rate, myValues, paginationPage, editRateMutation) =>
		dispatch(editRate(rate, myValues, paginationPage, editRateMutation)),
});

export default compose(
	graphql(UPDATE_RATE, { name: 'editRateMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UpdateExchangeRate);
