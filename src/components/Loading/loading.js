import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './css/loadingCss';
import loadingDelete from './img/loading-delete.gif';

const Loading = ({ classes }) => (
	<div className={classes.root}>
		<img className={classes.centerLoading} src={loadingDelete} alt='Loading Delete' />
	</div>
);

Loading.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
