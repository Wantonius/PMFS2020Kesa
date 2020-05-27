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
	
	removeFromList = (id) => {
		let tempId = parseInt(id,10);
		let tempList = this.state.list.filter(item => item.id !== tempId)
		this.setState({
			list:tempList
		})
	}
	
	editItem = (item) => {
		let tempList = [];
		for(let i=0;i<this.state.list.length;i++) {
			if(this.state.list[i].id !== item.id) {
				tempList.push(this.state.list[i]);
			} else {
				tempList.push(item);
			}
		}
		this.setState({
			list:tempList
		})
	}
	
	render() {
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
				<ShoppingList list={this.state.list} 
							  removeFromList={this.removeFromList}
							  editItem={this.editItem}/>
			</div>
		);
	}
}

export default App;
