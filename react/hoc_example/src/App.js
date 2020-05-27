import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstButton from './components/FirstButton';
import SecondButton from './components/SecondButton';

class App extends React.Component {
  
	constructor(props) {
		super(props);
		this.state = {
			message:"No message yet"
		}
	}
	
	
	sendMessage = (message) => {
		this.setState({
			message:message
		})
	}
  
  render() {
	  return (
		<div className="App">
			<h2>The button says:{this.state.message}</h2>
			<FirstButton sendMessage={this.sendMessage}/>
			<br/>
			<SecondButton sendMessage={this.sendMessage}/>
		</div>
	  );
  }
}

export default App;
