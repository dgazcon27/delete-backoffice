import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

const renderTextField = ({ input, label, meta: { touched, error } }) => (
	<TextField
		fullWidth
		multiline
		label={label}
		placeholder={label}
		{...input}
		error={(touched && error)}
		helperText={(touched && error) && <span>Este campo es oblogatorio</span>}
	/>
);

renderTextField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.object.isRequired,
	meta: PropTypes.object.isRequired,
};

export default renderTextField;
