import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page_admin from '../../_page/Page_admin/Page_admin.jsx';

class Main extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		<Switch>
			<Route path='/admin' component={ Page_admin }/>
		</Switch>
	}
}