import React from 'react'
import Decorator from './Decorator';
class FirstButton extends React.Component {

	render() {
		let buttonStyle={backgroundColor:this.props.color}
		return (
			<button style={buttonStyle}
				onClick={() => this.props.sendMessage("You pressed first button")}>
				Send message</button>
		)
	}
}

export default Decorator(FirstButton);