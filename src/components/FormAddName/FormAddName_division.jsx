import { connect } from 'react-redux';
import axios from 'axios';
import FormAddName from './FormAddName.jsx';
import API from '../../api';

class FormAddName_division extends FormAddName{
	constructor(props){
		super(props);
	}
}

export default connect(
	store=> {
		return{
			data: store.FormAddName_division
		}
	},

	dispatch => {
		return{
			submit: (data) => {
				axios({
						method: 'POST',
						headers: { 'Content-Type': 'multipart/form-data' },
						url: API.division.addDivision(),
						data: data
					})
					.then((res)=>{
						dispatch({
							type: 'SUBMIT=FormAddName_division',
							data: res.data
						})
					})
					.catch((err)=> console.log(err))
			},
			err: (data) => {
				dispatch({
					type: 'ERR=FormAddName_division',
					data: data
				})
			}
		}
	}

)(FormAddName_division);