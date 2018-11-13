import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import { Modal } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import UsersCreate from '../Users/usersCreate';
import styles from './bankCss';
import { getUserByDNI } from '../../actions/PurchaseRequest/actionsCreators';

import { renderNumberField } from '../RenderFields/renderFields';
import {
	required,
	empty,
} from '../validations/validations';

let DniFill = ({
	myValues,
	classes,
	newUserModal,
	actionUserByDNI,
	nameUser,
	lastName,
	phone,
	email,
}) => (
	<div>
		<div className={classes.createContainer}>
			<form>
				<div className={classes.formStyle}>
					<Field
						name='dni'
						type='number'
						component={renderNumberField}
						validate={[required, empty]}
						label='dni'
					/>
					<IconButton className={classes.formStyle}>
						<Search onClick={(event) => { event.preventDefault(actionUserByDNI(myValues)); }} />
					</IconButton>
				</div>
			</form>
			<div className={classes.formStyle}>
					Nombre:{nameUser}
					Apellido:{lastName}
				<br />
					Telefono:{phone}
					Correo:{email}
			</div>
		</div>
		<Modal
			open={newUserModal}
			disableAutoFocus={false}
		>
			<div>
				<UsersCreate />
			</div>
		</Modal>
	</div>
);

DniFill.propTypes = {
	classes: PropTypes.object.isRequired,
	actionUserByDNI: PropTypes.func.isRequired,
	newUserModal: PropTypes.bool.isRequired,
	myValues: PropTypes.object.isRequired,
	nameUser: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
};
DniFill = reduxForm({
	form: 'DniFill',
})(DniFill);


const selector = formValueSelector('DniFill');

const mapStateToProps = state => ({
	newUserModal: state.ReducerPurchaseRequest.newUserModal,
	myValues: selector(state, 'dni'),
	dni: state.ReducerPurchaseRequest.dni,
	phone: state.ReducerPurchaseRequest.phone,
	nameUser: state.ReducerPurchaseRequest.nameUser,
	lastName: state.ReducerPurchaseRequest.lastName,
	email: state.ReducerPurchaseRequest.email,
});

const mapDispatchToProps = dispatch => ({
	actionUserByDNI: dni => dispatch(getUserByDNI(dni)),
});
export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(DniFill);

