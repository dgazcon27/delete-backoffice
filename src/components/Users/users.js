import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
// import TablePagination from '@material-ui/core/TablePagination';
// import gql from 'graphql-tag';
import GET_USERS from  '../../queries/users';
import {
	actionEditUser, 
	actionBlockUser, 
	actionDeleteUser,
} from '../../actions/users/actionsCreators';

import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';


const Users = ({ 
	actionEditUser,
	actionBlockUser,
	actionDeleteUser,
}) => (
	<Query query={GET_USERS}>
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
									data.users.map((user, index) => 	
										<TableRow key={index} >
											<TableCell >{user.name}</TableCell>
											<TableCell>
												<IconButton
												onClick={actionEditUser}
													>	
													<Edit/>
												</IconButton>
												<IconButton
												onClick={actionDeleteUser}
												>	
													<Delete/>	
												</IconButton>
												<IconButton
												onClick={actionBlockUser}	
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
				</div>			
			);
		}}
	</Query>
);


const mapStateToProps = state => ({
	
});

const mapDispatchToProps = dispatch => ({
	actionEditUser: () => dispatch(actionEditUser()),
	actionBlockUser: () => dispatch(actionBlockUser()),
	actionDeleteUser: () => dispatch(actionDeleteUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
