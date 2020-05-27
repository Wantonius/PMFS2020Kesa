import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm'
import ShoppingList from './components/ShoppingList'
import Navbar from './components/Navbar'
import {Switch,Route,withRouter} from 'react-router-dom'

class App extends React.Component {
	
	constructor(props) {
		super(props)
		console.log(props)
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
		this.props.history.push("/")
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
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={
						() => <ShoppingList list={this.state.list} 
							  removeFromList={this.removeFromList}
							  editItem={this.editItem}/>
					}/>
					<Route path="/form" render={
					() => <ShoppingForm addToList={this.addToList}/>
					}/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
