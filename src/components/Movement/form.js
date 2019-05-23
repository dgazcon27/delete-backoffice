import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { Field } from 'redux-form';
import MenuItem from 'material-ui/Menu/MenuItem';

import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
	renderSelectField,
} from '../RenderFields/renderFields';
import styles from '../Shared/sharedStyles';
import { Categories } from '../commonComponent';
import { Currencys, BankAccounts, Events } from '../PurchaseRequest/PayCreate';
import { getAccountsByCurrency } from '../../actions/Payment/actionsCreators';


BankAccounts.propTypes = {
	currency: PropTypes.number.isRequired,
};

const FormMovement = ({
	options,
	disable,
	classes,
	event,
	currency,
	actionGetAccounts,
}) => (
	<div>
		<div className={classes.formStyle} >
			<Currencys actionGetAccounts={actionGetAccounts} />
		</div>

		<div className={classes.formStyle}>
			{ options === 'create' && !event &&
				<Events currency={currency} />
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
			{ (event && options !== 'visibility') &&
				<Field
					name='eventName'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='Evento'
					disabled
				/>
			}
		</div>
		{ options === 'create' &&
		<div className={classes.formStyle} >
			<BankAccounts currency={currency} />
		</div>

		}
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
				label='Observación'
				disabled={disable}
			/>
		</div>
		<div className={classes.formStyle}>
			<Field
				name='type'
				type='select'
				label='Tipo'
				component={renderSelectField}
				validate={required}
				className='container'
			>
				<MenuItem key='1' value='Efectivo' >Efectivo</MenuItem>
				<MenuItem key='2' value='Transferencia Dolares' >Transferencia Dólares</MenuItem>
				<MenuItem key='3' value='Transferencia Bolivares' >Transferencia Bolívares</MenuItem>
				<MenuItem key='4' value='Intercambio'> Intercambio </MenuItem>
				<MenuItem key='5' value='Otro' > Otro</MenuItem>
			</Field>
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


const mapStateToProps = state => ({
	currency: state.ReducerPayment.bankAccountId,
	event: state.ReducerMovement.event,
});

FormMovement.propTypes = {
	currency: PropTypes.number.isRequired,
	actionGetAccounts: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	disable: PropTypes.bool.isRequired,
	options: PropTypes.string.isRequired,
	event: PropTypes.number.isRequired,
};


const mapDispatchToProps = dispatch => ({
	actionGetAccounts: value => dispatch(getAccountsByCurrency(value.target.value)),
});


export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(FormMovement);
