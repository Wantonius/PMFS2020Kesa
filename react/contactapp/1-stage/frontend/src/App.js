import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<ContactForm />

			</div>
		);
	}
}

export default App;
