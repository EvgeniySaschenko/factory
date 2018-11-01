import React from 'react';

class Preloader extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<span className="Preloader"> Обработка данных </span>
		)
	}
}

export default Preloader;