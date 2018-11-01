import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from './../Preloader/Preloader.jsx';

class Nav extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.init()
	}

	activeItem(){
		let id= arguments[0];
		this.props.activeItem(id);
	}

	render(){
		let content;
		let { data= [] } = this.props;
		let templateNav= data.map( (e, i) => {
			return(
				<li className={ `Nav__list-item ${ !e.status ? '' : 'Nav__list-item_active' }`} key={ i }>
					<Link className="Nav__list-link"
						to={ e.link }
						onClick={ this.activeItem.bind(this, e.id) }>
						{ e.name }
					 </Link>
				</li>
			)
		});

		if(templateNav.length){
			content=
				<nav className={ `Nav Nav_${ this.props.clsMod }` }>
					<ul className="Nav__list">
						{ templateNav }
					</ul>
				</nav>;
		} else {
			content= <Preloader />
		}

		return( content )
	}
}

export default Nav;