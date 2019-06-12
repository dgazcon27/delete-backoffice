import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	blockProduct,
	deleteProduct,
} from '../../actions/Product/actionsCreators';
import Title from '../Shared/title';

import {
	GET_PRODUCTS,
	BLOCK_PRODUCT,
	DELETE_PRODUCT,
} from '../../queries/product';

const Product = ({
	objectStateProduct,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockProductMutation,
	deleteProductMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_PRODUCTS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/product-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		},
		{
			id: 2,
			columName: 'Descripción',
			jsonPath: 'description',
		}],
		arrayActive: [false, false, false, true, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/Product-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'productPagination.data',
			totalPath: 'productPagination.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateProduct),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Producto',
				msgStatus1: '¿Estas seguro que desea bloquear el producto?',
				titleStatus2: 'Desbloquear producto',
				msgStatus2: '¿Estas seguro que desea desbloquear el producto?',
			},
			delete: {
				title: 'Eliminar Producto',
				msg: '¿Estas seguro que desea eliminar el producto?',
			},
		},
	};

	const actions = {
		// edit: actionSetRol,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockProductMutation,
		delete: actionDelete,
		queryDelete: deleteProductMutation,
	};

	return (
		<div>
			<Title title='Productos' />
			<Search
				showButton={objectSearch.showButton}
				showSearch={objectSearch.showSearch}
				titleButton={objectSearch.titleButton}
				url={objectSearch.url}
			/>
			<ContainerList
				queries={objectQuery}
				propsSearchComponent={objectSearch}
				propsListComponent={objectList}
				propsModalComponent={objectModal}
				objectPath={objectPath}
				actions={actions}
			/>
		</div>
	);
};

Product.propTypes = {
	// actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStateProduct: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockProductMutation: PropTypes.func.isRequired,
	deleteProductMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateProduct: state.ReducerProduct,
});

const mapDispatchToProps = dispatch => ({
	// actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockProductMutation) =>
		dispatch(blockProduct(componentState, blockProductMutation)),
	actionDelete: (componentState, paginationPage, deleteProductMutation) =>
		dispatch(deleteProduct(componentState, paginationPage, deleteProductMutation)),
});

export default compose(
	graphql(DELETE_PRODUCT, { name: 'deleteProductMutation' }),
	graphql(BLOCK_PRODUCT, { name: 'blockProductMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Product);
