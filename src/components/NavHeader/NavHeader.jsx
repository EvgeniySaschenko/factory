import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './../_proto/Nav/Nav.jsx';
import API from './../../api';

class NavHeader extends Nav{
	constructor(props){
		super(props);
	}
}

export default connect(
	store => {
		return{
			data: store
		}
	},
	dispatch => {
		return{
			init: () => {
				axios(API.user.getUserById( {id : 1} ))
				.then((res)=>{
					console.log( res.data )
				})

				axios('http://localhost:3000/nav')
					.then((res)=>{
						dispatch({
							type: 'INIT_NAV',
							data: res.data
						})
					})
					.catch((err)=> console.log(err))
			},

			activeItem: (id) => {
				dispatch({
					type: 'ACTIVE_ITEM_NAV',
					id: id
				})
			}
		}
	}
)(NavHeader);