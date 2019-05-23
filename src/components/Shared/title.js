import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import BackButton from '../widget/BackButton';
import styles from './sharedStyles';
// import { connect } from 'react-redux';

const Title = ({ classes, title }) =>
	(
		<div>
			<h4 > {title} </h4>
			<div className={classes.right}>
				<BackButton />
			</div>
		</div>
	);

Title.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
};
export default compose(withStyles(styles, { withTheme: true }))(Title);
