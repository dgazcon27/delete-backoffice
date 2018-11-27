import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { Field } from 'redux-form';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
} from '../RenderFields/renderFields';
import styles from '../Shared/sharedStyles';
import { BankAccount, Categories, Events } from '../commonComponent';


const FormMovement = ({
	options,
	disable,
	classes,
}) => (
	<div>
		<div className={classes.formStyle}>
			{ options === 'create' &&
				<Events />
			}
			{ options === 'visibility' &&
				<Field
					name='eventName'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='Evento'
					disabled={disable}
				/>
			}
		</div>
		<div className={classes.formStyle}>
			<Field
				name='amount'
				type='text'
				component={renderNumberField}
				validate={[required, empty]}
				label='Monto'
				className='yourclass'
				disabled={disable}
			/>
		</div>
		{ options === 'create' &&
		<div className={classes.formStyle}>
			<BankAccount />
		</div>

		}

		{ options === 'visibility' &&
		<div className={classes.formStyle}>
			<Field
				name='bankAccountName'
				type='text'
				component={renderTextField}
				validate={[required, empty]}
				label='Cuenta bancaria'
				className='yourclass'
				disabled={disable}
			/>
		</div>
		}
		<div className={classes.formStyle}>
			<Field
				name='reference'
				type='text'
				component={renderTextField}
				validate={[required, empty]}
				label='Referencia'
				disabled={disable}
			/>
		</div>
		<div className={classes.formStyle}>
			<Field
				name='comment'
				type='text'
				component={renderTextField}
				validate={[required, empty]}
				label='Observación'
				disabled={disable}
			/>
		</div>
		<div className={classes.hidden}>
			<Field
				name='movementsType'
				type='text'
				component={renderTextField}
				label='movimiento'
			/>
		</div>
		{ options === 'create' &&
			<div className={classes.formStyle}>
				<Categories />
			</div>
		}
		{ options === 'visibility' &&
			<div className={classes.formStyle}>
				<Field
					name='type'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='Categoría'
					disabled={disable}
				/>
			</div>
		}
		<div className={classes.hidden}>
			<Field
				name='createdBy'
				type='text'
				component={renderTextField}
				label='movimiento'
			/>
		</div>
		<div className={classes.hidden}>
			<Field
				name='updatedBy'
				type='text'
				component={renderTextField}
				label='movimiento'
			/>
		</div>
	</div>
);

FormMovement.propTypes = {
	classes: PropTypes.object.isRequired,
	disable: PropTypes.bool.isRequired,
	options: PropTypes.string.isRequired,
};

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(null, null),
)(FormMovement);
