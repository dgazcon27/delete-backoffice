import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
		actionEditUserType, 
		actionBlockUserType, 
		actionDeleteUserType,
	}from '../../actions/userType/actionsCreators';

import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';


// const UserType = ({ data: { loading, user } }) => (
			// {!loading &&
					// {user.name}
const UserType = ({
	actionEditUserType,
	actionBlockUserType,
	actionDeleteUserType,
}) => (
	<div>
			{
				<div>
				<h3>
					Tipo de Usuario graphql
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
		}
	</div>
);


const mapStateToProps = state => ({
//estados mapeables
});

const mapDispatchToProps = dispatch => ({
	actionEditUserType: () => dispatch(actionEditUserType()),
	actionBlockUserType: () => dispatch(actionBlockUserType()),
	actionDeleteUserType: () => dispatch(actionDeleteUserType())
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(UserType);


// UserType.protype = {
// 	data: PropTypes.object.isRequired,
// };

// const user = gql`
// 	query {
// 		user(id: 1) {
// 			name
// 			birthDate
// 			dni
// 			email
// 		}
// 	}
// `;
// export default graphql(user)(UserType);