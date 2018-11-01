import React from 'react';
import Logo from '../Logo/Logo.jsx';
import Nav_main from '../Nav/Nav_main.jsx';

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<header className="Header">
				<div className="container">
					<div className="Header__row row">
						<div className="Header__col col-12 col-lg-3">
							<Logo clsMod={'header'} />
						</div>
						<div className="Header__col col-12 col-lg-9">
							<Nav_main clsMod={'main'} />
						</div>
					</div>
				</div>
			</header>
		)
	}
}

export default Header;