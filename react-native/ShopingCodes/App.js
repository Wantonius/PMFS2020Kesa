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
		  id:100
	  }
  }
  
  addToList = (item) => {
	  item.id = this.state.id;
	  let tempList = this.state.list.concat(item);
	  this.setState({
		  id:item.id+1,
		  list:tempList
	  })
  }
  
  removeFromList = (id) => {
	  let tempId = parseInt(id,10);
	  let tempList = this.state.list.filter(item => item.id !== tempId);
	  this.setState({
		  list:tempList
	  })
  }
  
  render() {
	  return (
		<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="list">
			{props => <ShoppingList {...props} removeFromList={this.removeFromList}
			list={this.state.list}/>}
			</Stack.Screen>
			<Stack.Screen name="add">
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
