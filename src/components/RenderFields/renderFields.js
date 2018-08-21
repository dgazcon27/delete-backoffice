import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import '../../components/Location/styles.css';

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
	<FormControl className={field.className}>
		<InputLabel htmlFor='age-simple'>{field.label.charAt(0).toUpperCase() + field.label.slice(1)}</InputLabel>
		<Select
			fullWidth
			{...field.input}
			error={(field.meta.touched && field.meta.error)}
		>
			{field.children}
		</Select>
		{(field.meta.touched && field.meta.error) && <span className='errorSelect'>Este campo es oblogatorio</span>}
	</FormControl>
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
