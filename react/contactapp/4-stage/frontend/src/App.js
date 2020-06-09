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
					(<LoginForm />)
				)}/>
				<Route path="/list" render={() => (
					this.props.isLogged ?
					(<ContactList />):
					(<Redirect to="/"/>)
				)}/>
				<Route path="/contact" render={() =>( 
					this.props.isLogged ?
					(<ContactForm />):
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
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
