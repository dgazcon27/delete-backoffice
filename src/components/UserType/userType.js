import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
	graphql,
	Query,
} from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Modal,
} from '@material-ui/core';

import styles from './userTypeCss';
import {
	editUserType,
	blockUserType,
	deleteUserType,
	openModal,
	closeModal,
} from '../../actions/userType/actionsCreators';

import GET_ROLES from '../../queries/userType';

const UserType = ({
	id,
	statusValue,
	name,
	classes,
	isOpen,
	modalType,
	actionOpenModal,
	actionCloseModal,
	actionBlockUserType,
	blockRolMutation,
}) => (
	<Query query={GET_ROLES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<div>
						<h1>Loading ...</h1>
					</div>
				);
			}

			if (error) {
				return (
					<div> Error :( </div>
				);
			}
			return (
				<div>
					<div>
						<h3>
							Roles
						</h3>
						<h5>
							<a>
								Agregar Nuevo
							</a>
						</h5>

						<Paper>
							<Table >

								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>Opciones</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										data.roles.map(rol => (
											<TableRow key={rol.id}>
												<TableCell >{rol.name}</TableCell>
												<TableCell>
													<IconButton onClick={() => { actionOpenModal('edit', rol); }}>
														<Edit />
													</IconButton>
													<IconButton onClick={() => { actionOpenModal('delete', rol); }}>
														<Delete />
													</IconButton>
													<IconButton onClick={() => { actionOpenModal('block', rol); }}>
														<Block />
													</IconButton>
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						</Paper>
					</div>

					<Modal
						open={isOpen}
						className={classNames(classes.modalOpenStyle)}
						hideBackdrop
						disableAutoFocus={false}
					>
						<div>
							{modalType === 'edit' &&
								<Paper>
									<h1>
										contenido edit modal
									</h1>
									<button onClick={actionCloseModal}>
										cerrar
									</button>
								</Paper>
							}

							{modalType === 'block' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6> Bloquear Rol </h6>
									<p>
										¿Estas seguro que desea bloquear el rol {name}?
									</p>
									<span>
										<IconButton
											onClick={() => { actionBlockUserType(id, statusValue, blockRolMutation); }}
										>
										Si
										</IconButton>
										&nbsp;
										&nbsp;
										<IconButton onClick={actionCloseModal} >
										No
										</IconButton>
									</span>
								</Paper>
							}
							{modalType === 'delete' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar Rol
									</h6>
									<p>
										¿Estas seguro que desea eliminar el rol {name} ?
									</p>
									<span>
										<IconButton onClick={actionCloseModal}>
											Si
										</IconButton>
										&nbsp;
										&nbsp;
										<IconButton onClick={actionCloseModal}>
											No
										</IconButton>
									</span>
								</Paper>
							}
						</div>
					</Modal>

				</div>
			);
		}}
	</Query>
);


const BLOCK_ROL = gql`
mutation blockRol($id:Int!, $status:Int!){
blockedRole(id:$id,status:$status) {
    name
    id
    status {
      name
      id
    }
	}
}
`;

UserType.propTypes = {
	isOpen: PropTypes.bool,
	statusValue: PropTypes.number,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionBlockUserType: PropTypes.func.isRequired,
	blockRolMutation: PropTypes.func.isRequired,

};

UserType.defaultProps = {
	modalType: '',
	isOpen: false,
	statusValue: 0,
	name: '',
};

const mapStateToProps = state => ({
	isOpen: state.ReducerUserType.isOpen,
	modalType: state.ReducerUserType.modalType,
	statusValue: state.ReducerUserType.statusValue,
	name: state.ReducerUserType.name,
	id: state.ReducerUserType.id,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, _rol) => dispatch(openModal(modalType, _rol)),
	actionBlockUserType: (id, statusValue, blockRolMutation) =>
		dispatch(blockUserType(id, statusValue, blockRolMutation)),
	actionDeleteUserType: () => dispatch(deleteUserType()),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditUserType: () => dispatch(editUserType()),
});

export default compose(
	graphql(BLOCK_ROL, { name: 'blockRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserType);
