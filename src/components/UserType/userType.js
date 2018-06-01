import React from 'react';
import { connect } from 'react-redux';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Query } from 'react-apollo';
import TablePagination from '@material-ui/core/TablePagination';
import Modal from '@material-ui/core/Modal';
import gql from 'graphql-tag';
import GET_ROLES from  '../../queries/userType';
import {
	actionEditUserType, 
	actionBlockUserType, 
	actionDeleteUserType,
	actionOpenModal,
	actionCloseModal,
} from '../../actions/userType/actionsCreators';


import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';

const UserType = ({ 
	openModal,
	modalType, 
	actionEditUserType,
	actionBlockUserType,
	actionDeleteUserType,
	actionOpenModal,
	actionCloseModal
}) => (
	<Query query={GET_ROLES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<div>
						<h1>Loading ...</h1>
					</div>
				)
			}

			if (error) {
				return (
					<div>
						Error :( 
					</div>	
				)
			}
			return(

				<div>
					<div>
						<h3>
							Roles
						</h3>
						<h5>
							Agregar Nuevo
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
									data.roles.map((rol, index) => 	
										<TableRow key={index} >
											<TableCell >{rol.name}</TableCell>
											<TableCell>
												<IconButton
												onClick={()=>{actionOpenModal('edit')}}
												>	
												<Edit/>
													</IconButton>
												<IconButton
												onClick={()=>{actionOpenModal('delete')}}
												>	
												<Delete/>	
													</IconButton>
												<IconButton
												onClick={()=>{actionOpenModal('block')}}
												>		
												<Block/>
													</IconButton>									
											</TableCell>
										</TableRow>
									)
								}
								</TableBody>
							
							</Table>
						</Paper>
					</div>		
				
					<Modal
					open={openModal}
					>	
						{	
							modalType === 'edit' ? 	<Paper>
													<h1>
														contenido edit modal	
													</h1>
													<button onClick={actionCloseModal}>
														cerrar		
													</button>		
											  	</Paper> 
										 	:
							modalType === 'block'? 	
											 	<Paper>
													<h1>
														contenido block modal	
													</h1>
													<button onClick={actionCloseModal}>
														cerrar		
													</button>		
											  	</Paper>
											:
							modalType === 'delete'&&
											 	<Paper>
													<h1>
														contenido delete modal	
													</h1>
													<button onClick={actionCloseModal}>
														cerrar		
													</button>		
											  	</Paper>
						}
				
					</Modal>

	

				</div>
			);
		}}
	</Query>
);


const mapStateToProps = state => ({
	openModal:state.ReducerUserType.openModal,	
	modalType:state.ReducerUserType.modalType,	

});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: modalType => dispatch(actionOpenModal(modalType)),
	actionCloseModal:()=> dispatch(actionCloseModal()),
	actionEditUserType: () => dispatch(actionEditUserType()),
	actionBlockUserType: () => dispatch(actionBlockUserType()),
	actionDeleteUserType: () => dispatch(actionDeleteUserType())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserType);
