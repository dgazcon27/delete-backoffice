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

import styles from './userTypeCss';

const ModalsOptions = ({
	isOpen,
	classes,
	modalType,
	statusValue,
	messages,
}) => (
	<Modal
		open={isOpen}
		className={classes.modalOpenStyle}
		hideBackdrop
		disableAutoFocus={false}
	>
		<div>
			{ 	modalType === 'edit' &&
				<Paper>
					<h1>
						{ messages.edit.title }
					</h1>
					<button >
						cerrar
					</button>
				</Paper>
			}

			{	modalType === 'block' &&
				<Paper className={classes.paperOnModal}>
					{statusValue === 1 && <h6> { messages.block.titleStatus1 } </h6>}
					{statusValue === 2 && <h6> { messages.block.titleStatus2 } </h6>}
					{
						statusValue === 1 &&
						<p>
							{ messages.block.msgStatus1 }
						</p>
					}
					{
						statusValue === 2 &&
						<p>
							{ messages.block.msgStatus2 }
						</p>
					}

					<span>
						<IconButton>
						Si
						</IconButton>
						&nbsp;
						&nbsp;
						<IconButton >
						No
						</IconButton>
					</span>
				</Paper>
			}
			{	modalType === 'delete' &&
				<Paper className={classes.paperOnModal}>
					<h6>
						{ messages.delete.title }
					</h6>
					<p>
						{ messages.delete.msg }
					</p>

					<span>
						<IconButton >
						Si
						</IconButton>
						&nbsp;
						&nbsp;
						<IconButton >
						No
						</IconButton>
					</span>
				</Paper>
			}
		</div>
	</Modal>
);

ModalsOptions.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	modalType: PropTypes.string.isRequired,
	statusValue: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	messages: PropTypes.shape({
		edit: PropTypes.shape({
			title: PropTypes.string,
		}),
		block: PropTypes.shape({
			titleStatus1: PropTypes.string,
			msgStatus1: PropTypes.string,
			titleStatus2: PropTypes.string,
			msgStatus2: PropTypes.string,
		}),
		delete: PropTypes.shape({
			title: PropTypes.string,
			msg: PropTypes.string,
		}),
	}).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	isOpen: ownProps.isOpen,
	modalType: ownProps.modalType,
	statusValue: ownProps.statusValue,
	messages: ownProps.messages,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(ModalsOptions);
