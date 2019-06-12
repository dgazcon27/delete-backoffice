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
import Paper from '@material-ui/core/Paper';
import styles from './userTypeCss';
import './styles.css';
import { renderTextField } from '../RenderFields/renderFields';
import { CREATE_BUDGET_EVENT } from '../../queries/event';
import {
	getRooms,
	closeAlert,
	setWithRooms,
	setWithTickets,
	createBudgetEvent,
	setNotification,
} from '../../actions/Event/Access/actionsCreators';

import Title from '../Shared/title';
import NotificationAlert from '../widget/NotificationAlert';

import { Currencys } from '../commonComponent';

const Add = props => (
	<button
		className={props.classes.createButton}
		type='submit'
		onClick={props.handleSubmit(() =>
			props.action(props.parameters, props.paginationPage, props.mutation, props.userId))
		}
		disabled={props.submitting}
	>
			Agregar
	</button>
);

Add.propTypes = {
	userId: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	mutation: PropTypes.func.isRequired,
	action: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	parameters: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};


let a = class BudgetEventCreate extends React.Component {
	render() {
		const { userId } = this.props;
		const { id } = this.props.match.params;
		const event = parseInt(id, 10);
		const { classes } = this.props;
		const { myValues } = this.props;
		const { submitting } = this.props;
		const { handleSubmit } = this.props;
		const { paginationPage } = this.props;
		const { actionCreateBudgetEvent } = this.props;
		const { isAlert } = this.props;
		const { actionSetNotification } = this.props;
		const { createMutation } = this.props;
		const message = 'Cotización creada exitósamente';

		return (
			<div>
				<Title title='Cotización' />
				<Paper className={classes.createContainer}>
					<form>
						<h6 className={classes.formTitle}>Nueva</h6>
						<div className={classes.formStyle}>
							<Currencys />
						</div>

						<div className={classes.formStyle}>
							<Field
								name='comment'
								type='text'
								component={renderTextField}
								label='Comentario'
								className='yourclass'
							/>
						</div>
						<Add
							userId={userId}
							classes={classes}
							submitting={submitting}
							handleSubmit={handleSubmit}
							paginationPage={paginationPage}
							action={actionCreateBudgetEvent}
							parameters={{
								...myValues,
								event,
								userId,
							}}
							mutation={createMutation}
						/>
						<Link to={`/event-budget/${event}`} className={classes.returnButton}>
							Regresar
						</Link>
					</form>
					<NotificationAlert
						message={message}
						open={isAlert}
						close={actionSetNotification}
					/>
				</Paper>

			</div>
		);
	}
};


a.propTypes = {
	classes: PropTypes.object.isRequired,
	userId: PropTypes.number.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	isAlert: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionSetNotification: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCreateBudgetEvent: PropTypes.func.isRequired,
	createMutation: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};


a = reduxForm({
	form: 'BudgetEventCreate',
})(a);

const selector = formValueSelector('BudgetEventCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	isAlert: state.ReducerEventAccess.isAlert,
	hotel: state.ReducerEventAccess.hotel,
	withRoom: state.ReducerEventAccess.withRoom,
	alertType: state.ReducerEventAccess.alertType,
	alertOpen: state.ReducerEventAccess.alertOpen,
	withTickets: state.ReducerEventAccess.withTickets,
	paginationPage: state.ReducerEventAccess.paginationPage,
	myValues: selector(state, 'currency', 'comment', state.ReducerLogin.userId),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetNotification: () => dispatch(setNotification(false)),
	actionGetRoom: value => dispatch(getRooms(value.target.value)),
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value, dispatch)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value, dispatch)),
	actionCreateBudgetEvent: (data, paginationPage, create) =>
		dispatch(createBudgetEvent(data, paginationPage, create)),
});

export default compose(
	graphql(CREATE_BUDGET_EVENT, { name: 'createMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(a);
