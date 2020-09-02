import React from 'react';
import {View,
		Button,
		Text,
		TextInput,
		StyleSheet} from 'react-native';
		
export default class LoginPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	register = () => {
		let user = {
			username:this.state.username,
			password:this.state.password,
		}
		this.props.register(user);
	}
	
	login = () => {
		let user = {
			username:this.state.username,
			password:this.state.password,
		}
		this.props.login(user);
	}	
	render() {
		return(
			<View>
				<View>
					<Text>Username:</Text>
					<TextInput onChangeText={(text) =>  this.setState({
						username:text
					})}	value={this.state.username} placeholder="Username"/> 
				</View>
				<View>
					<Text>Password:</Text>
					<TextInput onChangeText={(text) =>  this.setState({
						password:text
					})}	value={this.state.password} 
						placeholder="Password"
						secureTextEntry={true}/> 
				</View>

				<Button onPress={this.register} title="Register"/>
				<Button onPress={this.login} title="Login"/>
			</View>
		)
	}
}