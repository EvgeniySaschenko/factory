import React from 'react';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';


class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="App">
				<Header />
				<Footer />
			</div>
		)
	}
}

export default App;