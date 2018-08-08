/* eslint no-extra-boolean-cast: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
	Field,
	reduxForm,
	formValueSelector 
} from 'redux-form';
import {
	changePage,
	blockUserType,
	deleteUserType,
	openModal,
	closeModal,
	setRol,
} from '../../actions/products/actionsCreators';

let Products = (props) => (
	const { handleSubmit, myValues, submitForm, pristine, reset, submitting } = props;
	<div>
		<form>
			<Field name='name' type='text' component='input'/>
			<Field name='age' type='text' component='input'/>
			<input type="text" name="name" />
			<button type='button' onClick={() => submitForm(myValues)}></button>
		</form>
	</div>
)

Products = reduxForm({
	'form': 'formCreateProduct'
})(Products);

const selector = formValueSelector('formCreateProduct');

const mapStateToProps = state => ({
	'myValues': selector(state, 'name', 'age') 
});

const mapDispatchToProps = dispatch => ({
	submitForm: (dispatch) => dispatch(actionCreateProduct(myValues))
});

Products = connect(mapStateToProps, mapDispatchToProps)(Products);

export default Products;