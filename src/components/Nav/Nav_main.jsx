import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav.jsx';
import API from '../../api';

class Nav_main extends Nav{
	constructor(props){
		super(props);
	}
}

export default connect(
	store => {
		return{
			data: store.nav_main
		}
	},
	dispatch => {
		return{
			init: () => {
				axios(API.nav.getNavByType({ type: 'main'}))
					.then((res)=>{
						dispatch({
							type: 'INIT_NAV=Nav_main',
							data: res.data
						})
					})
					.catch((err)=> console.log(err))
			},

			activeItem: (id) => {
				dispatch({
					type: 'ACTIVE_ITEM=Nav_main',
					id: id
				})
			}
		}
	}
)(Nav_main);