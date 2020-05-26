import React from 'react';

export default class StatefulComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log("StatefulComponent - constructor");
		console.log(props);
		this.state = {
			seconds:0,
			timerId:0
		}
	}

	componentDidMount() {
		console.log("StatefulComponent- componentDidMount");
		let temp = setInterval(this.startTimer,1000);
		this.setState({
			timerId:temp
		})
	}
	
	componentWillUnmount() {
		console.log("StatefulComponent - ComponentWillUnmount")
		clearInterval(this.state.timerId);
	}
	
	componentDidUpdate() {
		console.log("StatefulComponent - ComponentDidUpdate");
	}
	
	static getDerivedStateFromProps(props,oldState) {
		console.log("StatefulComponent - getDerivedStateFromProps");
		console.log("Props:",props);
		console.log("State:",oldState);
		return null;
	}

	startTimer = () => {
		let temp = this.state.seconds;
		temp++;
		this.setState({
			seconds:temp
		})
	}
	
	render() {
		return(
			<h2>{this.state.seconds} seconds since page loaded</h2>
		)
	}
}