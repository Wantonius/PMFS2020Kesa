import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
  
  constructor(props) {
	  super(props);
	  this.state= {
		  list:[],
		  isLogged:false,
		  token:""
	  }
  }
  
  componentDidMount() {
	  if(this.state.isLogged) {
		this.getList();
	  }
  }
  
  getList = () => {
	  let request = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-type":"application/json",
					"token":this.state.token}
	  }
	  fetch("http://pm-harkka-backend.herokuapp.com/api/shopping",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				this.setState({
					list:data
				})
			}).catch(error => {
				console.log("Can't parse JSON")
			})
		} else {
			console.log("Server responded with status:",response.status)
		}
	  }).catch(error => {
		  console.log("Server responded with error:",error)
	  })
  }
  
  addToList = (item) => {
	let request = {
		method:"POST",
		mode:"cors",
		headers:{"Content-type":"application/json",
				"token":this.state.token},
		body:JSON.stringify(item)
	}
	fetch("http://pm-harkka-backend.herokuapp.com/api/shopping",request).then(response => {
		if(response.ok) {
			this.getList();
		} else {
			console.log("Server responded with status:",response.status);
		}
	}).catch(error => {
		console.log("Server responded with error:",error);
	});
  }
  
  removeFromList = (id) => {
	let request = {
		method:"DELETE",
		mode:"cors",
		headers:{"Content-type":"application/json",
				"token":this.state.token}
	}
	fetch("http://pm-harkka-backend.herokuapp.com/api/shopping/"+id,request).then(response => {
		if(response.ok) {
			this.getList();
		} else {
			console.log("Server responded with status:",response.status);
		}
	}).catch(error => {
		console.log("Server responded with error:",error);
	});
  }
  
  render() {
	  return (
		<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Shopping List">
			{props => <ShoppingList {...props} removeFromList={this.removeFromList}
			list={this.state.list}/>}
			</Stack.Screen>
			<Stack.Screen name="Add Item">
			{props => <ShoppingForm {...props} addToList={this.addToList}/>}
			</Stack.Screen>
		</Stack.Navigator>
		</NavigationContainer>
	  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
