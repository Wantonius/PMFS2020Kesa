import React from 'react'
import {observer,inject} from 'mobx-react'

class ShoppingForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type:"",
			count:0,
			price:0
		}
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			id:this.props.state.id,
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		this.props.state.id++;
		this.props.state.list.push(item);
	}
	
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="type">Type:</label>
				<input type="text"
						name="type"
						value={this.state.type}
						onChange={this.onChange}/>
				<br/>
				<label htmlFor="count">Count:</label>
				<input type="number"
						name="count"
						value={this.state.count}
						onChange={this.onChange}/>
				<br/>
				<label htmlFor="price">Price:</label>
				<input type="number"
						name="price"
						value={this.state.price}
						onChange={this.onChange}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		)
	}
}

export default inject(store =>({
	state:store.state
}))(observer(ShoppingForm))