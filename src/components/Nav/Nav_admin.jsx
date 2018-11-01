import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav.jsx';
import API from '../../api';

class Nav_admin extends Nav{
	constructor(props){
		super(props);
	}
}

export default connect(
	store =>{
		return{
			data: store.nav_admin
		}
	},
	dispatch =>{
		return{
			init: () => {
				axios(API.nav.getNavByType({ type: 'admin'}))
					.then((res)=>{
						dispatch({
							type: 'INIT=Nav_admin',
							data: res.data
						})
					})
					.catch((err)=> console.log(err))
			},

			activeItem: (id) => {
				dispatch({
					type: 'ACTIVE_ITEM=Nav_admin',
					id: id
				})
			}
		}
	}
)(Nav_admin);