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
