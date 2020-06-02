import React from 'react'
import {Link} from 'react-router-dom'
import {List,Header} from 'semantic-ui-react';

export default class Navbar extends React.Component {

	render() {
		let header = <Header>Contact App</Header>
		if(this.props.loading) {
			header = <Header>Contact App ...Loading</Header>
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
						<List.Item><Link to="/" onClick={() => this.props.onLogout()}>
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