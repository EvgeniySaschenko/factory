import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../_proto/Nav/Nav.jsx';

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
			init: (data) => {
				data= require('../../data/nav.json');
				dispatch({
					type: 'INIT_NAV',
					data: data
				})
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