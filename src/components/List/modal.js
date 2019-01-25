import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import {
	Modal,
	Paper,
	IconButton,
} from '@material-ui/core';

import ModalPassword from '../Users/modalPassword';
import PurchaseRequestPay from '../PurchaseRequest/PurchaseRequestPay';
import ModalsAssignTicket from '../Ticket/ModalAssignTicket';
import styles from './userTypeCss';

const ModalsOptions = ({
	modal,
	actions,
	classes,
}) => (
	<Modal
		open={modal.componentState.isOpen}
		className={classes.modalOpenStyle}
		onBackdropClick={() => actions.closeModal()}
		disableAutoFocus={false}
	>
		<div>
			{ 	modal.componentState.modalType === 'edit' &&
				<Paper>
					<h1>
						{ modal.messages.edit.title }
					</h1>
					<button >
						cerrar
					</button>
				</Paper>
			}

			{	modal.componentState.modalType === 'block' &&
				<Paper className={classes.paperOnModal}>
					{modal.componentState.statusValue &&
					<h6> { modal.messages.block.titleStatus1 } </h6>}
					{!modal.componentState.statusValue &&
					<h6> { modal.messages.block.titleStatus2 } </h6>}
					{
						modal.componentState.statusValue &&
						<p>
							{ modal.messages.block.msgStatus1 }
						</p>
					}
					{
						!modal.componentState.statusValue &&
						<p>
							{ modal.messages.block.msgStatus2 }
						</p>
					}

					<span>
						<IconButton onClick={() => actions.block(modal.componentState, actions.queryblock)}>
						Si
						</IconButton>
						&nbsp;
						&nbsp;
						<IconButton onClick={() => actions.closeModal()}>
						No
						</IconButton>
					</span>
				</Paper>
			}
			{	modal.componentState.modalType === 'delete' &&
				<Paper className={classes.paperOnModal}>
					<h6>
						{ modal.messages.delete.title }
					</h6>
					<p>
						{ modal.messages.delete.msg }
					</p>

					<span>
						<IconButton
							onClick={() =>
								actions.delete(modal.componentState, modal.paginationPage, actions.queryDelete)
							}
						>
							Si
						</IconButton>
						&nbsp;
						&nbsp;
						<IconButton onClick={() => actions.closeModal()}>
						No
						</IconButton>
					</span>
				</Paper>
			}
			{modal.componentState.modalType === 'password' &&
				<ModalPassword />
			}

			{modal.componentState.modalType === 'pagos' &&
				<PurchaseRequestPay />
			}
			{modal.componentState.modalType === 'assign_ticket' &&
				<ModalsAssignTicket id={modal.componentState.id} />
			}
		</div>
	</Modal>
);

ModalsOptions.propTypes = {
	classes: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	modal: ownProps.componentState,
	actions: ownProps.actions,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(ModalsOptions);
