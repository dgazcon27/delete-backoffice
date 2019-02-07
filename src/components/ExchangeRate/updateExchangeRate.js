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
import { CREATE_ROL } from '../../queries/userType';
import {
	closeAlert,
	setName,
	setDescription,
	createRol,
} from '../../actions/userType/actionsCreators';
import BackButton from '../widget/BackButton';
import Title from '../Shared/title';

let UpdateExchangeRate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateRol,
	createRolMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<Title title='Tasa de cambio' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Actualizar tasa de cambio</h6>
				<div className={classes.formStyle}> <Currencys /> </div>
				<div className={classes.formStyle}>
					<Field
						name='rolDescription'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Valor'
						className='yourclass'
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateRol(myValues.name, myValues.rolDescription, paginationPage, createRolMutation))} disabled={submitting} >
					Crear
				</button>
				<BackButton />
			</form>
			{alertType === 'nombre' &&
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id='message-id'>No puede crear un rol sin {alertType}</span>}
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
					message={<span id='message-id'>El Rol que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
				/>
			}
			{alertType === 'rolDescription' &&
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id='message-id'>No puede crear un rol sin {alertType}</span>}
				/>
			}
			{alertType === 'creado' &&
				<Snackbar
					className={classes.alertS}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{ 'aria-describedby': 'message-id' }}
					message={<span id='message-id'>El rol {myValues.name} fue creado con exito .</span>}
				/>
			}
		</Paper>
	</div>
);

UpdateExchangeRate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateRol: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createRolMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
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
	paginationPage: state.ReducerPagination.paginationPage,
	myValues: selector(state, 'name', 'rolDescription'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateRol: (name, descripcion, paginationPage, createRolMutation) =>
		dispatch(createRol(name, descripcion, paginationPage, createRolMutation)),
});

export default compose(
	graphql(CREATE_ROL, { name: 'createRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UpdateExchangeRate);
