import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
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
} from '@material-ui/core';

import GET_USERS from '../../queries/users';

import {
	editUser,
	blockUser,
	deleteUser,
} from '../../actions/users/actionsCreators';

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
						<h5>
							Agregar Nuevo
						</h5>

						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>Opciones</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										data.users.map(user => (
											<TableRow key={user.id}>
												<TableCell >{user.name}</TableCell>
												<TableCell>
													<IconButton onClick={actionEditUser}>
														<Edit />
													</IconButton>

													<IconButton onClick={actionDeleteUser}>
														<Delete />
													</IconButton>

													<IconButton onClick={actionBlockUser}>
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

Users.propTypes = {
	actionEditUser: PropTypes.func.isRequired,
	actionBlockUser: PropTypes.func.isRequired,
	actionDeleteUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actionEditUser: () => dispatch(editUser()),
	actionBlockUser: () => dispatch(blockUser()),
	actionDeleteUser: () => dispatch(deleteUser()),
});

export default connect(null, mapDispatchToProps)(Users);
