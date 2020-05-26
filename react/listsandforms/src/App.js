import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm'
import ShoppingList from './components/ShoppingList'

class App extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			list:[],
			id:100
		}
	}
	
	addToList = (item) => {
		item.id = this.state.id;
		let tempList = this.state.list.concat(item);
		let tempId = this.state.id+1;
		this.setState({
			list:tempList,
			id:tempId
		})
	}
	
	render() {
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
				<ShoppingList list={this.state.list} />
			</div>
		);
	}
}

export default App;
