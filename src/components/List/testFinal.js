import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import ContainerList from './containerList';
import Search from '../../components/Search/search';
import { openModal, setRol } from '../../actions/userType/actionsCreators';

import { GET_ROLES } from '../../queries/userType';
import { SEARCH_ROLES } from '../../queries/search';

/* import {
	openModal,
	closeModal,
	setRol,
} from '../../actions/userType/actionsCreators'; */

const TestFinal = ({
	isOpen,
	modalType,
	statusValue,
	actionSetRol,
	actionOpenModal,
}) => {
	const objectQuery = {
		queryComponent: GET_ROLES,
		querySearch: SEARCH_ROLES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'Add Algo',
		url: '/',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		}],
		arrayActive: [true, true, true, true],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'roles.data',
			totalPath: 'roles.total',
		},
		searchComponent: {
			dataPath: 'search.roles.data',
			totalPath: 'search.roles.total',
		},
	};

	const objectModal = {
		isOpen,
		modalType,
		statusValue,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Rol',
				msgStatus1: '¿Estas seguro que desea bloquear el rol ?',
				titleStatus2: 'Desbloquear Rol',
				msgStatus2: '¿Estas seguro que desea desbloquear el rol ?',
			},
			delete: {
				title: 'Eliminar Rol',
				msg: '¿Estas seguro que desea eliminar el rol ?',
			},
		},
	};

	const actions = {
		edit: actionSetRol,
		openModal: actionOpenModal,
	};

	return (
		<div>
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

TestFinal.propTypes = {
	actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	modalType: PropTypes.string.isRequired,
	statusValue: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	isOpen: state.ReducerUserType.isOpen,
	modalType: state.ReducerUserType.modalType,
	statusValue: state.ReducerUserType.statusValue,
});

const mapDispatchToProps = dispatch => ({
	actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(TestFinal);
