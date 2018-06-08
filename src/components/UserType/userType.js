import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import styles from './userTypeCss';

import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import TablePagination from '@material-ui/core/TablePagination';
import gql from 'graphql-tag';
import GET_ROLES from  '../../queries/userType';

import { Query,
		 Mutation
} from 'react-apollo';

import {
	editUserType, 
	blockUserType, 
	deleteUserType,
	actionOpenModal,
	actionCloseModal,
} from '../../actions/userType/actionsCreators';
 
import PropTypes from 'prop-types';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Query } from 'react-apollo';

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


const UserType = ({
	editUserType,
	blockUserType,
	deleteUserType,
	actionOpenModal,
	actionCloseModal,
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
													<IconButton onClick={()=>{actionOpenModal('edit')}}>
														<Edit />
													</IconButton>
													<IconButton onClick={()=>{actionOpenModal('delete')}}>
														<Delete />
													</IconButton>
													<IconButton onClick={()=>{actionOpenModal('block')}}>
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
		
					<Modal open = {openModal} className={classNames(classes.modalOpenStyle)} hideBackdrop={true} disableAutoFocus={false}>	
						<div>
							{	
								modalType === 'edit' ? 	
									<Paper>
										<h1>
											contenido edit modal
										</h1>
										<button onClick={actionCloseModal}>
											cerrar
										</button>
									</Paper>	:

								modalType === 'block' ?
									<Paper className={classNames(classes.paperOnModal)}>
										<h6> Bloquear Rol </h6>
										<p> 
											¿Estas seguro que desea bloquear el rol "elemento"?
										</p>
										<span>
											<a onClick={actionCloseModal} className={classNames(classes.a)}>
												Si	
											</a>
											&nbsp;
											&nbsp;
											<a onClick={actionCloseModal} className={classNames(classes.a)}>
												No
											</a>
										</span>
									</Paper>	:
								
								modalType === 'delete' &&
								 	<Paper className={classNames(classes.paperOnModal)}>
								 		<h6>
											Eliminar Rol
										</h6>
										
										<p>
											¿Estas seguro que desea bloquear este "Elemento" ?
										</p>
										<span>
											<a onClick={actionCloseModal} className={classNames(classes.a)}>
												Si	
											</a>
											&nbsp;
											&nbsp;
											<a onClick={actionCloseModal} className={classNames(classes.a)}>
												No
											</a>
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

UserType.propTypes = {
	actionOpenModal:  PropTypes.func.isRequired,
	actionCloseModal:  PropTypes.func.isRequired,
	actionEditUserType: PropTypes.func.isRequired,
	actionBlockUserType: PropTypes.func.isRequired,
	actionDeleteUserType: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	openModal:state.ReducerUserType.openModal,	
	modalType:state.ReducerUserType.modalType,	
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: modalType => dispatch(actionOpenModal(modalType)),
	actionCloseModal:()=> dispatch(actionCloseModal()),
	actionEditUserType: () => dispatch(editUserType()),
	actionBlockUserType: () => dispatch(blockUserType()),
	actionDeleteUserType: () => dispatch(deleteUserType()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserType);

