import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteCategory,
} from '../../actions/Category/actionsCreators';

import 	{
	GET_CATEGORIES,
	DELETE_CATEGORY,
} from '../../queries/category';
import Title from '../Shared/title';

const Category = ({
	objectStateBank,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteCategoryMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_CATEGORIES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/category-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 0,
			columName: '',
			jsonPath: '',
		},
		{
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
			edit: '/category-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'categoryPagination.data',
			totalPath: 'categoryPagination.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateBank),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: '',
				msgStatus1: '',
				titleStatus2: '',
				msgStatus2: '',
			},
			delete: {
				title: 'Eliminar Categoría',
				msg: '¿Estas seguro que desea eliminar este Categoría?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteCategoryMutation,
	};

	return (
		<div>
			<Title title='Categorías' />
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

Category.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateBank: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteCategoryMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateBank: state.ReducerCategory,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteCategoryMutation) =>
		dispatch(deleteCategory(componentState, paginationPage, deleteCategoryMutation)),
});

export default compose(
	graphql(DELETE_CATEGORY, { name: 'deleteCategoryMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Category);
