import React from 'react';
const config= require('../../config/config.json');

class FormAddName extends React.Component{
	constructor(props){
		super(props);
	}

	submit(e){
		e.preventDefault();
		const { name, form }= this.refs;
		if(name.value){
			let formData= new FormData(form);
			this.props.submit(formData);
		} else {
			this.props.err(config.msg.noValid);
		}
	}

	render(){
		const { clsMod }= this.props;
		const { msg= '', alert= '' }= this.props.data;

		return(
			<form ref="form" className={ `FormAddName FormAddName_${ clsMod } Form Form_${ clsMod }` }>
				<div className="form-group">
					<label className="Form__label">Название</label>
					<input ref="name" className="Form__field form-control" type="text" name="name" required="required"/>
				</div>
				<div className={`Form__alert ${ alert ? 'alert alert-' + alert : 'd-none' }`}> { msg } </div>
				<button className="Form__btn btn btn-primary" type="submit" onClick={ this.submit.bind(this) }>Добавить</button>
			</form>
		)
	}
}

export default FormAddName;