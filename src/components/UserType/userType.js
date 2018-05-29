import React from 'react';
import { connect } from 'react-redux';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import {
	actionEditUserType, 
	actionBlockUserType, 
	actionDeleteUserType,
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

const GET_USER = gql`
 	query {
 		user(id: 1) {
			name
			birthDate
 			dni
 			email
 		}
 	}
`;

const UserType = ({ 
	actionEditUserType,
	actionBlockUserType,
	actionDeleteUserType,
}) => (
	<Query query={GET_USER}>
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
							Tipo de Usuario graphql
							<p>{data.user.name}</p>
						</h3>
						<h5>
							Agregar Nuevo
						</h5>

						<Paper >
							<Table >
								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>Opciones</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>
											<IconButton
											onClick={actionEditUserType}
												>	
												<Edit/>
											</IconButton>
											<IconButton
											onClick={actionDeleteUserType}
											>	
												<Cancel/>	
											</IconButton>
											<IconButton
											onClick={actionBlockUserType}	
											>		
												<Block/>
											</IconButton>									
										</TableCell>
									</TableRow>
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
	actionEditUserType: () => dispatch(actionEditUserType()),
	actionBlockUserType: () => dispatch(actionBlockUserType()),
	actionDeleteUserType: () => dispatch(actionDeleteUserType())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserType);
