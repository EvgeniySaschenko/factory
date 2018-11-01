import React from 'react';
import { Link } from 'react-router-dom';

class Logo extends React.Component{
	constructor(props){
		super(props);
		this.props= this.state;
	}

	render(){
		return(
			<Link to="/" className={ `Logo Logo_${ this.props.clsMod }` }>
				<img className="Logo__img" src={ require('./logo.png') } alt="logo" />
			</Link>
		)
	}
}

export default Logo;