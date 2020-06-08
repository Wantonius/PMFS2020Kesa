import React from 'react';
import {Table,Button} from 'semantic-ui-react';


class ContactList extends React.Component {

	

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
				onClick={() => this.props.removeFromList(contact._id)}>
				Remove</Button></Table.Cell>
				<Table.Cell><Button name={contact._id} 
				onClick={() => this.props.editItem(contact)}>
				Edit</Button></Table.Cell>
			</Table.Row>
			)
		return (
			<Table celled>
				<Table.Header>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Firstname</Table.HeaderCell>					
					<Table.HeaderCell>Lastname</Table.HeaderCell>	
					<Table.HeaderCell>Nickname</Table.HeaderCell>	
					<Table.HeaderCell>Main Phone</Table.HeaderCell>	
					<Table.HeaderCell>Main Mobile</Table.HeaderCell>	
					<Table.HeaderCell>Email</Table.HeaderCell>	
					<Table.HeaderCell>Remove</Table.HeaderCell>	
					<Table.HeaderCell>Edit</Table.HeaderCell>	
				</Table.Header>
				<Table.Body>
				{contactItems}
				</Table.Body>
			</Table>
		)
		
	}
}

export default ContactList;