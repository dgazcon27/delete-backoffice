import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import styles from './bankCss';

const BackButton = ({ classes }) => (
	<div
		role='button'
		className={classes.returnButton}
		tabIndex={0}
		onClick={(event) => {	event.preventDefault(window.history.back());	}
		}
		onKeyUp={() => { }}
	>
	Regresar
	</div>);

BackButton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }))(BackButton);
