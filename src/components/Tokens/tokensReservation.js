import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import {
	compose,
	Query,
} from 'react-apollo';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination,
} from '@material-ui/core';

import styles from '../Shared/sharedStyles';
import { changePage } from '../../actions/PurchaseRequest/actionsCreators';

import {
	sendTokensReservation,
	setAlert,
} from '../../actions/Tokens/actionsCreators';

import { GET_TOKENS_RESERVATION } from '../../queries/tokens';

import Loading from '../Loading/loading';

const TokensReservation = ({
	load,
	open,
	classes,
	currentPage,
	paginationPage,
	actionSendTokens,
	actionChangePage,
	actionClose,
}) => (
	<Query query={GET_TOKENS_RESERVATION} variables={{ paginationPage }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<div>
						<Loading />
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
					{load === 'sending' &&
					<div>
						<Loading />
					</div>
					}
					{load === 'list' &&
					<div>
						<h5 className={classes.title}>
								Envio de Localizadores de Paquetes
						</h5>
						<h5 className={classes.searchAlignRigth}>
							{data.paidReservationsList.total > 0 &&
								<Button
									variant='extendedFab'
									aria-label='Delete'
									className={classes.addNew}
									onClick={() => { actionSendTokens(); }}
								>
									<Send className={classes.marginIcon} />
									Enviar Localizadores
								</Button>

							}
						</h5>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className={classes.center}>Cliente</TableCell>
										<TableCell className={classes.center}>Documento de Identidad</TableCell>
										<TableCell className={classes.center}>Acceso</TableCell>
										<TableCell className={classes.center}>Evento</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data.paidReservationsList.data.map(item => (
											<TableRow key={item.id}>
												<TableCell className={classes.center}>{`${item.client.name}  ${item.client.lastName}`}</TableCell>
												<TableCell className={classes.center}>{item.client.dni}</TableCell>
												<TableCell className={classes.center}>
													{item.purchaseRequest.access.name}
												</TableCell>
												<TableCell className={classes.center}>
													{item.purchaseRequest.event.name}
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={data.paidReservationsList.total}
											rowsPerPage={10}
											page={paginationPage}
											rowsPerPageOptions={[10]}
											colSpan={6}
											onChangePage={(event, changuedPage) => {
												actionChangePage(currentPage, changuedPage);
											}}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper>
					</div>
					}
					{load === 'sent' &&
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						open={open}
						autoHideDuration={1000}
						onClose={actionClose}
						ContentProps={{ 'aria-describedby': 'message-id' }}
						message={<span id='message-id'>Las lista de tokens ha sido enviada</span>}
					/>
					}
				</div>
			);
		}}
	</Query>
);

TokensReservation.propTypes = {
	load: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionClose: PropTypes.func.isRequired,
	actionSendTokens: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	load: state.ReducerTokens.load,
	open: state.ReducerTokens.open,
	currentPage: state.ReducerTokens.currentPageTokens,
	paginationPage: state.ReducerTokens.paginationTokens,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionSendTokens: () => dispatch(sendTokensReservation()),
	actionClose: () => dispatch(setAlert(false)),
});

export { TokensReservation as TokensReservationTest };

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(TokensReservation);
