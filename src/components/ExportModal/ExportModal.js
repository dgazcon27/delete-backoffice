/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Backspace from '@material-ui/icons/Backspace';
import Payment from '@material-ui/icons/Payment';
import Visibility from '@material-ui/icons/Visibility';
import Delete from '@material-ui/icons/Delete';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import {
	compose,
	graphql,
	Query,
} from 'react-apollo';
import PropTypes from 'prop-types';
import {
	Modal,
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination,
	IconButton,
	Tooltip,
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import CsvDownloader from 'react-csv-downloader';
import { preSCV } from '../commonComponent';

import {
	openModal,
	closeModal,
	changePage,
	deletePurchaseReq,
	refundPurchaseReq,
} from '../../actions/PurchaseRequest/actionsCreators';
import { openTicketModal, setAlert } from '../../actions/Ticket/actionsCreators';
import {
	GET_ALL_PURCHASE_REQ,
} from '../../queries/purchaseRequest';
import NewUsersCreate from '../Users/newUsersCreate';
import Loading from '../Loading/loading';
import ModalsAssignTicket from '../Ticket/ModalAssignTicket';
import NotificationAlert from '../widget/NotificationAlert';
import styles from '../Shared/sharedStyles';

export const ExportModal2 = pass => {
	return(
	<Query query={pass.pass} variables={ pass.event} >
		{({ data }) => {
			console.log(data);
			let aux = [];

			if (data.incomeMovementQuery !== undefined) {
				aux = Object.assign([], data.incomeMovementQuery);
			}
			if (data.expensesMovementQuery !== undefined) {
				aux = Object.assign([], data.expensesMovementQuery);
			}
			if (aux.length > 0) {
				aux = preSCV(aux, false);
			}
			return (
				<CsvDownloader datas={aux} filename='export' >
					Exportar Como Excel
				</CsvDownloader>
			);
		}
		}
	</Query>
);}
ExportModal2.propTypes = {
	// classes: PropTypes.object.isRequired,
};

ExportModal2.defaultProps = {
	query: '',
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionDeletePurchase: (id, mutation) =>
		dispatch(deletePurchaseReq(id, mutation)),
	actionRefundPurchase: (id, mutation) =>
		dispatch(refundPurchaseReq(id, mutation)),
	actionCloseModal: () =>	dispatch(closeModal()),
	actionOpenModal: (type, item) => dispatch(openModal(type, item)),
	actionOpenTicketModal: (type, item) => dispatch(openTicketModal(type, item)),
	actionSetAlert: () => dispatch(setAlert(false)),
});

export { ExportModal2 as ExportModalTest };

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ExportModal2);
