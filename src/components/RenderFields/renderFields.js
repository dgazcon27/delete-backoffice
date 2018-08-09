import React from 'react';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import PropTypes from 'prop-types';

export const renderTextField = ({ input, label, meta: { touched, error } }) => (
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

export const renderSelectField = field => (
	<Select
		fullWidth
		{...field.input}
	>
		{field.children}
	</Select>
);

renderTextField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object.isRequired,
};
