import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {removeContact,changeMode} from '../actions/contactActions';
import {withRouter} from 'react-router-dom';

class ContactList extends React.Component {

	changeMode = (contact) => {
		this.props.dispatch(changeMode("Edit",contact))
		this.props.history.push("/contact")
	}

	render() {
	
		let contactItems = this.props.list.map(contact => 
			<Table.Row key={contact._id}>
				<Table.Cell>{contact.title}</Table.Cell>
				<Table.Cell>{contact.firstname}</Table.Cell>
				<Table.Cell>{contact.lastname}</Table.Cell>
				<Table.Cell>{contact.nickname}</Table.Cell>
				<Table.Cell>{contact.phone[0]}</Table.Cell>
				<Table.Cell>{contact.mobile[0]}</Table.Cell>
				<Table.Cell>{contact.email[0]}</Table.Cell>
				<Table.Cell><Button name={contact._id} 
				onClick={() => this.props.dispatch(removeContact(this.props.token,contact._id))}>
				Remove</Button></Table.Cell>
				<Table.Cell><Button name={contact._id} 
				onClick={() => {this.changeMode(contact)}}>
				Edit</Button></Table.Cell>
			</Table.Row>
			)
		return (
			<Table celled>
				<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Firstname</Table.HeaderCell>					
					<Table.HeaderCell>Lastname</Table.HeaderCell>	
					<Table.HeaderCell>Nickname</Table.HeaderCell>	
					<Table.HeaderCell>Main Phone</Table.HeaderCell>	
					<Table.HeaderCell>Main Mobile</Table.HeaderCell>	
					<Table.HeaderCell>Email</Table.HeaderCell>	
					<Table.HeaderCell>Remove</Table.HeaderCell>	
					<Table.HeaderCell>Edit</Table.HeaderCell>	
				</Table.Row>
				</Table.Header>
				<Table.Body>
				{contactItems}
				</Table.Body>
			</Table>
		)
		
	}
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token,
		list:state.contact.list
	}
}

export default withRouter(connect(mapStateToProps)(ContactList));