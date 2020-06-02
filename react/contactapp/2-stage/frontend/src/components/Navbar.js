import React from 'react'
import {Link} from 'react-router-dom'
import {List,Header} from 'semantic-ui-react';

export default class Navbar extends React.Component {

	render() {
		let style={
			height:80,
			backgroundColor:"lightblue"
	}	
	return (
		<div style={style}>
			<Header>Contact App</Header>
			<List>
				<List.Item><Link to="/list">Contacts</Link></List.Item>
				<List.Item><Link to="/contact">Add new contact</Link></List.Item>
			</List>
		</div>
	
	)
	}
}