import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import styles from '../Shared/userTypeCss';
import { required, empty } from '../validations/validations';
import { renderTextField, renderDateField } from '../RenderFields/renderFields';
import {
	editEvent,
	closeAlert,
	cleanState,
	setCountriesStates,
} from '../../actions/Event/actionsCreators';
import { EDIT_EVENT } from '../../queries/event';
import { SelectStatus, SelectState, SelectCountry } from './eventCreate';

let EventEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditEvent,
	editEventMutation,
	actionCleanState,
	myValues,
	submitting,
	handleSubmit,
	userId,
	states,
	actionSelectCountry,
}) => (
	<div>
		<h3 className={classes.formTitle}>Eventos</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Evento</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre de Evento'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='description'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Descripción'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<SelectCountry actionSelectCountry={actionSelectCountry} />
				</div>
				<div className={classes.formStyle}>
					<SelectState states={states} />
				</div>
				<div className={classes.formStyle}>
					<SelectStatus />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleClosure'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventClosure'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass container'
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					disabled={submitting}
					onClick={handleSubmit(() => actionEditEvent(myValues, userId, editEventMutation))}
				>
					Editar
				</button>
				<Link to='/events' href='/events' className={classes.returnButton} onClick={() => actionCleanState()}>
					Regresar
				</Link>
			</form>
		</Paper>
		{alertType === 'edit' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El evento {myValues.name} fue editado con exito.</span>}
			/>
		}
	</div>
);

EventEdit.propTypes = {
	submitting: PropTypes.bool.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	userId: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionEditEvent: PropTypes.func.isRequired,
	editEventMutation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionCleanState: PropTypes.func.isRequired,
	actionSelectCountry: PropTypes.func.isRequired,
	myValues: PropTypes.object.isRequired,
	states: PropTypes.array.isRequired,
};

EventEdit = reduxForm({
	form: 'EventEdit',
})(EventEdit);

const selector = formValueSelector('EventEdit');


const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
	alertType: state.ReducerEvent.alertType,
	alertOpen: state.ReducerEvent.alertOpen,
	initialValues: state.ReducerEvent,
	userId: state.ReducerLogin.userId,
	states: state.ReducerEvent.states,
	name: state.ReducerEvent.name,
	myValues: selector(
		state,
		'id',
		'name',
		'description',
		'presaleStart',
		'presaleClosure',
		'eventStart',
		'eventClosure',
		'status',
		'state',
		'country',

	),
});


const mapDispatchToProps = dispatch => ({
	actionSelectCountry: (event, id) => dispatch(setCountriesStates(event, id)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCleanState: () => dispatch(cleanState()),
	actionEditEvent: (event, updatedBy, editEventMutation) =>
		dispatch(editEvent(event, updatedBy, editEventMutation)),
});

export default compose(
	graphql(EDIT_EVENT, { name: 'editEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(EventEdit);
