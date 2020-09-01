import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';

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
		<View style={styles.container}>
			<ShoppingForm addToList={this.addToList}/>
			<ShoppingList removeFromList={this.removeFromList}
						list={this.state.list}/>
		</View>
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
