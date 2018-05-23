import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header/header';
import SideBar from './components/sideBar/sideBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './components/Header/headerCss';
// import { Hola1, Dashboard, Presale, BoxOffice } from './components/hola';
import Main from './components/Main/main';

const App = ({ classes }) => (
	<div className={classes.root}>
		<Header />
		<SideBar />
		<Main _class={classes}/>
		</div>
);

/*const user = gql`
	query {
		user(id: 1) {
			name
			email
		}
	}
`*/

export default withStyles(styles, { withTheme: true })(App);
//export default graphql(user)(App);
