import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import styles from './bankCss';
import { closeUserModal } from '../../actions/PurchaseRequest/actionsCreators';

const BackButton = ({ classes, actionCloseModal, newUserModal }) => (
	<div
		role='button'
		className={classes.returnButton}
		tabIndex={0}
		onClick={(event) => {
			if (newUserModal) {
				actionCloseModal();
			} else {
				event.preventDefault(window.history.back());
				actionCloseModal();
			}
		}
		}
		onKeyUp={() => { }}
	>
		Regresar
	</div>);

BackButton.propTypes = {
	classes: PropTypes.object.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	newUserModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	newUserModal: state.ReducerPurchaseRequest.newUserModal,
});

const mapDispatchToProps = dispatch => ({
	actionCloseModal: () => dispatch(closeUserModal()),
});
export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BackButton);
