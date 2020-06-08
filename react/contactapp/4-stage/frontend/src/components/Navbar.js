import React from 'react'
import {Link} from 'react-router-dom'
import {List,Header} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {onLogout} from '../actions/loginActions';

class Navbar extends React.Component {

	render() {
		let header = <Header>Contact App</Header>
		if(this.props.loading) {
			header = <Header>Contact App ...Loading</Header>
		}
		if(this.props.error) {
			header = <Header>{this.props.error}</Header>
		}
		let style={
			height:110,
			backgroundColor:"lightblue"
		}
		if(this.props.isLogged) {
			return (
				<div style={style}>
					<Header>{header}</Header>
					<List>
						<List.Item><Link to="/list">Contacts</Link></List.Item>
						<List.Item><Link to="/contact">Add new contact</Link></List.Item>
						<List.Item><Link to="/" 
						onClick={() => this.props.dispatch(onLogout(this.props.token))}>
						Logout</Link></List.Item>
					</List>
				</div>
				)
		} else {
			return (<div style={style}>
					<Header>{header}</Header>
					</div>)
		}
	
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token,
		loading:state.loading,
		error:state.error
	}
}

export default connect(mapStateToProps)(Navbar)