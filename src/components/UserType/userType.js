import React from 'react';
import { connect } from 'react-redux';
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
} from '@material-ui/core';

import GET_ROLES from '../../queries/userType';

import {
	editUserType,
	blockUserType,
	deleteUserType,
} from '../../actions/userType/actionsCreators';

const UserType = ({
	actionEditUserType,
	actionBlockUserType,
	actionDeleteUserType,
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
							Tipo de Usuario graphql
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
										data.roles.map((rol) => (
											<TableRow key={rol.id}>
												<TableCell >{rol.name}</TableCell>
												<TableCell>
													<IconButton onClick={actionEditUserType}>
														<Edit />
													</IconButton>
													<IconButton onClick={actionDeleteUserType}>
														<Delete />
													</IconButton>
													<IconButton onClick={actionBlockUserType}>
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
				</div>
			);
		}}
	</Query>
);

UserType.propTypes = {
	actionEditUserType: PropTypes.func.isRequired,
	actionBlockUserType: PropTypes.func.isRequired,
	actionDeleteUserType: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actionEditUserType: () => dispatch(editUserType()),
	actionBlockUserType: () => dispatch(blockUserType()),
	actionDeleteUserType: () => dispatch(deleteUserType()),
});

export default connect(null, mapDispatchToProps)(UserType);
