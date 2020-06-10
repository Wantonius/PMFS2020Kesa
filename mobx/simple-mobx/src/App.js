import React from 'react';
import logo from './logo.svg';
import './App.css';
import {extendObservable} from 'mobx'
import {observer} from 'mobx-react'

class App extends React.Component {
	
	constructor(props) {
		super(props);
		
		extendObservable(this,{
			counter:0
		})
	}
	
	onIncrement = () => {
		this.counter++
	}
	
	onDecrement = () => {
		this.counter--
	}
	
	render() {
	  return (
		<div className="App">
			Counter:{this.counter}
			<button onClick={this.onIncrement}>Increment</button>
			<button onClick={this.onDecrement}>Decrement</button>
		</div>
	  );
	}
}

export default observer(App);
