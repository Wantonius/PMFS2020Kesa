import React from 'react';
import {observer,inject} from 'mobx-react';

class ShoppingList extends React.Component {

	remove = (event) => {
		let tempId = parseInt(event.target.name,10);
		this.props.state.list = this.props.state.list.filter(item => item.id != tempId)
	}

	render() {
		let items = this.props.state.list.map(item => {
			return <tr key={item.id}>
						<td>{item.type}</td>
						<td>{item.count}</td>
						<td>{item.price}</td>
						<td><button onClick={this.remove} 
						name={item.id}>Remove</button></td>
					</tr>		
		})
		return (
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Count</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
				{items}
				</tbody>
			</table>
		
		)
	}
}

export default inject(store => ({
	state:store.state
}))(observer(ShoppingList))