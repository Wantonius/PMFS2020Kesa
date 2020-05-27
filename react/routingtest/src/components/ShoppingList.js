import React from 'react';
import {Table} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	changeToRemoveMode = (id) => {
		let tempId = parseInt(id,10);
		for(let i=0;i<this.props.list.length;i++) {
			if(tempId === this.props.list[i].id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}

	changeToEditMode = (id) => {
		let tempId = parseInt(id,10);
		for(let i=0;i<this.props.list.length;i++) {
			if(tempId === this.props.list[i].id) {
				this.setState({
					editIndex:i,
					removeIndex:-1
				})
			}
		}
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}

	removeFromList = (id) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	editItem = (item) => {
		this.props.editItem(item);
		this.cancel();
	}

	render() {
		let items = this.props.list.map((item,index) => {
			if(this.state.editIndex === index) {
				return <EditRow key={item.id} item={item}
						cancel={this.cancel}
						editItem={this.editItem}/>
			}
			
			if(this.state.removeIndex === index) {
				return <RemoveRow key={item.id} item={item}
						cancel={this.cancel} 
						removeFromList={this.removeFromList}/>
			}
			return <Row key={item.id} item={item}
				changeToRemoveMode={this.changeToRemoveMode}
				changeToEditMode={this.changeToEditMode}/>
		})
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell>Count</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{items}
				</Table.Body>
			</Table>
		)
	}

}