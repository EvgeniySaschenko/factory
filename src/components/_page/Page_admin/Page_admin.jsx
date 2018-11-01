import React from 'react';
import Nav_admin from '../../Nav/Nav_admin.jsx';

class Page_admin extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<div className="Page Page_admin container">
				<h1 className="Page__title">Администрирование</h1>
				<Nav_admin/>
			</div>
		)
	}
}

export default Page_admin;