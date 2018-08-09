import React from 'react';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import PropTypes from 'prop-types';
import '../../components/UserType/styles.css';

export const renderTextField = field => (
	<TextField
		fullWidth
		multiline
		label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
		placeholder={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
		{...field.input}
		error={(field.meta.touched && field.meta.error)}
		helperText={(field.meta.touched && field.meta.error) && <span>Este campo es oblogatorio</span>}
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

export const renderDateField = field => (
	<TextField
		fullWidth
		multiline={false}
		label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
		placeholder={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
		type='date'
		{...field.input}
		className={field.className}
		error={(field.meta.touched && field.meta.error)}
		helperText={(field.meta.touched && field.meta.error) && <span>Este campo es oblogatorio</span>}
	/>
);

export const renderNumberField = field => (
	<TextField
		fullWidth
		multiline={false}
		inputProps={{ min: '0', step: '1' }}
		label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
		placeholder={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
		type='number'
		{...field.input}
		className={field.className}
		error={(field.meta.touched && field.meta.error)}
		helperText={(field.meta.touched && field.meta.error) && <span>Este campo es oblogatorio</span>}
	/>
);

renderTextField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object.isRequired,
};
