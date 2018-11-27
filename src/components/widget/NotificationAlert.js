import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';

const NotificationAlert = props => (
	<Snackbar
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={props.open}
		autoHideDuration={1000}
		onClose={props.close}
		ContentProps={{ 'aria-describedby': 'message-id' }}
		message={<span id='message-id'>{props.message}</span>}
	/>
);

NotificationAlert.propTypes = {
	open: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	close: PropTypes.func.isRequired,
};

export default compose()(NotificationAlert);
