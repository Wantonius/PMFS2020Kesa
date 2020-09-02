import React from 'react';
import {FlatList,View,ScrollView,Button,TouchableHighlight,Text,StyleSheet} from 'react-native';

export default class ShoppingList extends React.Component {

	removeFromList = (id) => {
		this.props.removeFromList(id);
	}
	
	render() {
		let styles = StyleSheet.create({
			textStyle:{
				fontSize:18,
				paddingRight:10
			},
			buttonStyle:{
				width:80,
				height:50,
				backgroundColor:"red",
				justifyContent:"center",
				alignItems:"center"
			},
			rowStyle: {
				flexDirection:"row",
				height:80
			}
		})
		return(
			<View style={{height:300}}>
				<Button onPress={() => this.props.navigation.navigate('Add Item')} title="Add Item"/>
					<FlatList 	data={this.props.list}
								renderItem={
									({item}) => {
										return (
											<View style={styles.rowStyle}>
												<Text style={styles.textStyle}>			
													Type:{item.type}
												</Text>
												<Text style={styles.textStyle}>	
													Count:{item.count}
												</Text>
												<Text style={styles.textStyle}>	
													Price:{item.price}
												</Text>	
												<TouchableHighlight style={styles.buttonStyle}
													onPress={() => this.removeFromList(item.id)}>
													<Text>Remove</Text>
												</TouchableHighlight>							
											</View>
										)
									}
								}
								keyExtractor={item => ""+item.id}/>
			</View>
		)
	}

}

