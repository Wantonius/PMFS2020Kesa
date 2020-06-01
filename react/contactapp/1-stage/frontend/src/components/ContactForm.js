import React from 'react';
import {Form,Button,Label,Header} from 'semantic-ui-react'

export default class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		if(props.mode === "Add") {
			this.state = {
				firstname:"",
				lastname:"",
				nickname:"",
				title:"",
				phone:[],
				addphone:"",
				mobile:[],
				addmobile:"",
				email:[],
				addemail:"",
				street:"",
				city:"",
				postcode:"",
				country:""
			} 
		} else {
			this.state = {
				firstname:props.contact.firstname,
				lastname:props.contact.lastname,
				nickname:props.contact.nickname,
				title:props.contact.title,
				phone:props.contact.phone,
				addphone:"",
				mobile:props.contact.mobile,
				addmobile:"",
				email:props.contact.email,
				addemail:"",
				street:props.contact.street,
				city:props.contact.city,
				postcode:props.contact.postcode,
				country:props.contact.country			
			}
		}
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		if(this.state.firstname.length === 0 || this.state.lastname.length ===0) {
			alert("First and last name required");
			return
		}
		let contact = {
			firstname:this.state.firstname,
			lastname:this.state.lastname,
			nickname:this.state.nickname,
			title:this.state.title,
			phone:this.state.phone,
			mobile:this.state.mobile,
			email:this.state.email,
			street:this.state.street,
			city:this.state.city,
			postcode:this.state.postcode,
			country:this.state.country
		}
		if(this.props.mode === "Add") {
			this.props.addContact(contact);
		} else {
			contact.id = this.props.contact.id;
			this.props.editContact(contact);
		}
		this.setState({
			firstname:"",
			lastname:"",
			nickname:"",
			title:"",
			phone:[],
			addphone:"",
			mobile:[],
			addmobile:"",
			email:[],
			addemail:"",
			street:"",
			city:"",
			postcode:"",
			country:""
		})		
	}
	
	handleKeyPress = (event) => {
		if(event.key === 'Enter') {
			if(event.target.name === "addphone") {
				let phones = this.state.phone.concat(event.target.value);
				this.setState({
					phone:phones,
					addphone:""
				})
			}
			if(event.target.name === "addmobile") {
				let mobiles = this.state.mobile.concat(event.target.value);
				this.setState({
					mobile:mobiles,
					addmobile:""
				})
			}
			if(event.target.name === "addemail") {
				let emails = this.state.email.concat(event.target.value);
				this.setState({
					email:emails,
					addemail:""
				})
			}
		}
	}
	
	removeFromList = (event) => {
		let tempArray = [];
		if(event.target.id === "phonelabel") {
			for(let i=0;i<this.state.phone.length;i++) {
					if(event.target.innerHTML === this.state.phone[i]) {
						tempArray = this.state.phone;
						tempArray.splice(i,1);
						this.setState({
							phone:tempArray
						})
					}
					return; 
				}
		}
		if(event.target.id === "mobilelabel") {
			for(let i=0;i<this.state.mobile.length;i++) {
					if(event.target.innerHTML === this.state.mobile[i]) {
						tempArray = this.state.mobile;
						tempArray.splice(i,1);
						this.setState({
							mobile:tempArray
						})
					}
					return; 
				}
		}
		if(event.target.id === "emaillabel") {
			for(let i=0;i<this.state.email.length;i++) {
					if(event.target.innerHTML === this.state.email[i]) {
						tempArray = this.state.email;
						tempArray.splice(i,1);
						this.setState({
							email:tempArray
						})
					}
					return; 
				}
		}
	}
	
	submit = (event) => {
		event.preventDefault();
	}
	
	render() {
		let phonelabels = <div></div>
		if(this.state.phone.length > 0) {
			phonelabels = this.state.phone.map((phone,index) => {
				return <Label key={index}  id="phonelabel" 
				onClick={this.removeFromList}>{phone}</Label>
			})
		}
		let mobilelabels = <div></div>
		if(this.state.mobile.length > 0) {
			mobilelabels = this.state.mobile.map((mobile,index) => {
				return <Label key={index}  id="mobilelabel" 
				onClick={this.removeFromList}>{mobile}</Label>
			})
		}
		let emaillabels = <div></div>
		if(this.state.email.length > 0) {
			emaillabels = this.state.email.map((email,index) => {
				return <Label key={index}  id="emaillabel" 
				onClick={this.removeFromList}>{email}</Label>
			})
		}		
		return(
		<div>
			<Form onSubmit={this.submit}>
				<Header as='h2'>Add Contact</Header>
				<Form.Field>
					<label htmlFor="title">Title</label>
					<input type="text"
							onChange={this.onChange}
							name="title"
							value={this.state.title}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="firstname">Firstname</label>
					<input type="text"
							onChange={this.onChange}
							name="firstname"
							value={this.state.firstname}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="lastname">Lastname</label>
					<input type="text"
							onChange={this.onChange}
							name="lastname"
							value={this.state.lastname}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="nickname">Nickname</label>
					<input type="text"
							onChange={this.onChange}
							name="nickname"
							value={this.state.nickname}/>				
				</Form.Field>
				{phonelabels}
				<Form.Field>
					<label htmlFor="addphone">Phone</label>
					<input type="text"
							onChange={this.onChange}
							name="addphone"
							onKeyPress={this.handleKeyPress}
							value={this.state.addphone}/>				
				</Form.Field>
				{mobilelabels}
				<Form.Field>
					<label htmlFor="addmobile">Mobile</label>
					<input type="text"
							onChange={this.onChange}
							name="addmobile"
							onKeyPress={this.handleKeyPress}
							value={this.state.addmobile}/>				
				</Form.Field>
				{emaillabels}
				<Form.Field>
					<label htmlFor="addemail">Email</label>
					<input type="email"
							onChange={this.onChange}
							name="addemail"
							onKeyPress={this.handleKeyPress}
							value={this.state.addemail}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="street">Street</label>
					<input type="text"
							onChange={this.onChange}
							name="street"
							value={this.state.street}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="postcode">Postcode</label>
					<input type="text"
							onChange={this.onChange}
							name="postcode"
							value={this.state.postcode}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="city">City</label>
					<input type="text"
							onChange={this.onChange}
							name="city"
							value={this.state.city}/>				
				</Form.Field>
				<Form.Field>
					<label htmlFor="country">Country</label>
					<input type="text"
							onChange={this.onChange}
							name="country"
							value={this.state.country}/>				
				</Form.Field>				
			</Form>
			<Button onClick={this.onSubmit}>{this.props.mode}</Button>
		</div>
		)
	}

}