import React from 'react';
import {observer,inject} from 'mobx-react';

class ShoppingList extends React.Component {


	componentDidMount() {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		this.props.state.fetchbackend("/api/shopping",request);
	}
	
	remove = (event) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		this.props.state.fetchbackend("/api/shopping/"+event.target.name,request);		
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