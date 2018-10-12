import React from 'react';
import LogoHeader from '../LogoHeader/LogoHeader.jsx';
import NavHeader from '../NavHeader/NavHeader.jsx';

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<header className="Header">
				<LogoHeader clsMod={'header'} />
				<NavHeader clsMod={'header'} />
			</header>
		)
	}
}

export default Header;