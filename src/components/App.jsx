import React from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Page_admin from './_page/Page_admin/Page_admin.jsx';
import FormAddName_division from './FormAddName/FormAddName_division.jsx';


class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="App">
				<Header />
				<main className="Main">
					<FormAddName_division />
					<Page_admin />
				</main>
				<Footer />
			</div>
		)
	}
}

export default App;