import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			mode:"Add",
			contact:{},
			isLogged:false,
			token:""
		}
	}
	
	//helpers
	
	loadFromStorage = () => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state);
		}
	}
	
	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state));
	}
	
	componentDidMount() {
		this.loadFromStorage();
	}
	
	changeToEditMode = (contact) => {
		this.setState({
			contact:contact,
			mode:"Edit"
		})
		this.props.history.push("/contact");
	}
	
	//REST API
	
	getContactList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token}			
		}
		fetch("/api/contact",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					})
					this.saveToStorage();
				}).catch(error => {
					console.log("Failed to parse JSON data:",error)
				})
			} else {
				console.log("Server responded with status:",response.status) 
			}
		}).catch(error => {
			console.log("Server responded with an error:",error);
		})
	}
	
	addContact = (contact) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(contact)
		}
		fetch("/api/contact",request).then(response => {
			if(response.ok) {
				this.getContactList();
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	removeFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token}
		}
		fetch("/api/contact/"+id,request).then(response => {
			if(response.ok) {
				this.getContactList();
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}


	editContact = (contact) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(contact)
		}
		fetch("/api/contact/"+contact.id,request).then(response => {
			if(response.ok) {
				this.getContactList();
				this.setState({
					contact:{},
					mode:"Add"
				})
				this.props.history.push("/");
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}	
	
	// LOGIN API
	
	onRegister = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/register",request).then(response => {
			if(response.ok) {
				alert("Register success");
			} else {
				if(response.status === 409) {
					alert("Register failed. Is username already in use?");
				} else {
					console.log("Server responded with status:",response.status)
				}
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	onLogin = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						token:data.token,
						isLogged:true
					}, () => {
						this.getContactList();
						this.saveToStorage();
					}) 
				}).catch(error => {
					console.log(error)
				})
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	render() {
		return (
			<div className="App">
				<Navbar isLogged={this.state.isLogged}/>
				<Switch>
				<Route exact path="/" render={() =>(
					this.state.isLogged ?
					(<Redirect to="/list"/>):
					(<LoginForm onLogin={this.onLogin}
						onRegister={this.onRegister}/>)
				)}/>
				<Route path="/list" render={() => (
					this.state.isLogged ?
					(<ContactList removeFromList={this.removeFromList}
						list={this.state.list}
						editItem={this.changeToEditMode}/>):
					(<Redirect to="/"/>)
				)}/>
				<Route path="/contact" render={() =>( 
					this.state.isLogged ?
					(<ContactForm addContact={this.addContact} 
					mode={this.state.mode} contact={this.state.contact}
					editContact={this.editContact}/>):
					(<Redirect to="/"/>)
				)}/>
				<Route render={() => (
					this.state.isLogged ?
					(<Redirect to="/list"/>):
					(<Redirect to="/"/>)
				)}/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
