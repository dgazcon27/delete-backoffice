import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography';
import { Switch, Route } from 'react-router-dom'
import { Hola1, Dashboard, Presale, BoxOffice } from '../hola';
import UserType from '../UserType/userType';


const Main = (props) => ( 
	<main className={props._class.content}>
		<div className={props._class.toolbar} />
		<Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
		<Switch>
			<Route exact path='/' component={Hola1}/>
			<Route path='/dashboard' component={Dashboard}/>
			<Route path='/pre-sale' component={Presale}/>
			<Route path='/box-office' component={BoxOffice}/>
			<Route path='/user-type' component={UserType}/>
		</Switch>
	</main>
)

export default Main 