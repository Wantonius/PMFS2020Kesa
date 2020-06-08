import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			mode:"Add",
			contact:{}
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
	
	setLoadingState = (loading) => {
		this.setState({
			loading:loading
		})
	}
	
	//REST API
	
	getContactList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token}			
		}
		this.setLoadingState(true);
		fetch("/api/contact",request).then(response => {
			this.setLoadingState(false);
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
				if(response.status === 403) {
					this.setState({
						token:"",
						isLogged:false,
						list:[],
						mode:"Add",
						contact:{},
						loading:false
					})
					sessionStorage.removeItem("state");					
				}
				console.log("Server responded with status:",response.status) 
			}
		}).catch(error => {
			this.setLoadingState(false);
			console.log("Server responded with an error:",error);
		})
	}
	
	addContact = (contact) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token},
			body:JSON.stringify(contact)
		}
		this.setLoadingState(true);
		fetch("/api/contact",request).then(response => {
			if(response.ok) {
				this.getContactList();
			} else {
				this.setLoadingState(false);
				if(response.status === 403) {
					this.setState({
						token:"",
						isLogged:false,
						list:[],
						mode:"Add",
						contact:{}
					})
					sessionStorage.removeItem("state");					
				}
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			this.setLoadingState(false);
			console.log(error);
		})
	}
	
	removeFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token}
		}
		this.setLoadingState(true);
		fetch("/api/contact/"+id,request).then(response => {
			if(response.ok) {
				this.getContactList();
			} else {
				this.setLoadingState(false);
				if(response.status === 403) {
					this.setState({
						token:"",
						isLogged:false,
						list:[],
						mode:"Add",
						contact:{},
						loading:false
					})
					sessionStorage.removeItem("state");					
				}
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			this.setLoadingState(false);
			console.log(error);
		})
	}


	editContact = (contact) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token},
			body:JSON.stringify(contact)
		}
		this.setLoadingState(true);
		fetch("/api/contact/"+contact._id,request).then(response => {
			if(response.ok) {
				this.getContactList();
				this.setState({
					contact:{},
					mode:"Add"
				})
				this.props.history.push("/");
			} else {
				this.setLoadingState(false);
				if(response.status === 403) {
					this.setState({
						token:"",
						isLogged:false,
						list:[],
						mode:"Add",
						contact:{}
					})
					sessionStorage.removeItem("state");					
				}
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			this.setLoadingState(false);
			console.log(error);
		})
	}	
	
	// LOGIN API
	


	
	render() {
		return (
			<div className="App">
				<Navbar/>
				<Switch>
				<Route exact path="/" render={() =>(
					this.props.isLogged ?
					(<Redirect to="/list"/>):
					(<LoginForm onLogin={this.onLogin}
						onRegister={this.onRegister}/>)
				)}/>
				<Route path="/list" render={() => (
					this.props.isLogged ?
					(<ContactList removeFromList={this.removeFromList}
						list={this.state.list}
						editItem={this.changeToEditMode}/>):
					(<Redirect to="/"/>)
				)}/>
				<Route path="/contact" render={() =>( 
					this.props.isLogged ?
					(<ContactForm addContact={this.addContact} 
					mode={this.state.mode} contact={this.state.contact}
					editContact={this.editContact}/>):
					(<Redirect to="/"/>)
				)}/>
				<Route render={() => (
					this.props.isLogged ?
					(<Redirect to="/list"/>):
					(<Redirect to="/"/>)
				)}/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
