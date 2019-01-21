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
import Title from '../Shared/title';

import {
	sendTokens,
	setAlert,
	changePage,
} from '../../actions/Tokens/actionsCreators';

import { GET_TOKENS } from '../../queries/tokens';

import Loading from '../Loading/loading';

const Tokens = ({
	load,
	open,
	classes,
	paginationPage,
	actionSendTokens,
	actionChangePage,
	actionClose,
	currentPage,
}) => (
	<Query query={GET_TOKENS} variables={{ paginationPage }}>
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
						<Title title='Envio de Localizadores' />
						<h5 className={classes.searchAlignRigth}>
							{data.paidSalesList.total > 0 &&
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
										data.paidSalesList.data.map(item => (
											<TableRow key={item.id}>
												<TableCell className={classes.center}>{`${item.purchaser.name}  ${item.purchaser.lastName}`}</TableCell>
												<TableCell className={classes.center}>{item.purchaser.dni}</TableCell>
												<TableCell className={classes.center}>
													{item.access.name}
												</TableCell>
												<TableCell className={classes.center}>{`${item.event.name} ${currentPage}`}</TableCell>
											</TableRow>
										))
									}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={data.paidSalesList.total}
											rowsPerPage={10}
											page={paginationPage}
											rowsPerPageOptions={[10]}
											colSpan={6}
											onChangePage={(ev, changuedPage) => {
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

Tokens.propTypes = {
	load: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionClose: PropTypes.func.isRequired,
	actionSendTokens: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	load: state.ReducerTokens.load,
	open: state.ReducerTokens.open,
	paginationPage: state.ReducerTokens.paginationPage,
	currentPage: state.ReducerTokens.currentPage,
});

const mapDispatchToProps = dispatch => ({
	actionSendTokens: () => dispatch(sendTokens()),
	actionClose: () => dispatch(setAlert(false)),
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),

});

export { Tokens as TokensTest };

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Tokens);
