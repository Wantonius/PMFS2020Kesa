import React from 'react';
import {Form,Button} from 'semantic-ui-react';

export default class LoginForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onLogin = () => {
		if(this.state.username.length < 4 || this.state.password.length < 8) {
			alert("Username must be atleast 4 characters and password 8 characters long");
			return;
		}
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		this.props.onLogin(user);
	}

	onRegister = () => {
		if(this.state.username.length < 4 || this.state.password.length < 8) {
			alert("Username must be atleast 4 characters and password 8 characters long");
			return;
		}
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		this.props.onRegister(user);
	}
	
	render() {
		return(
			<Form>
				<Form.Field>
					<label htmlFor="username">Username</label>
					<input type="text"
							name="username"
							value={this.state.username}
							onChange={this.onChange}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Password</label>
					<input type="password"
							name="password"
							value={this.state.password}
							onChange={this.onChange}/>
				</Form.Field>
				<Button onClick={this.onRegister}>Register</Button>
				<Button onClick={this.onLogin}>Login</Button>
			</Form>
		)
	}

}