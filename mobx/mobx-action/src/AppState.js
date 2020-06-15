import {observable,action} from 'mobx'

const appState = observable({
	list:[],
	fetchbackend:action('fetchbackend',function(url,request) {
		fetch(url,request).then(response => {
			if(response.ok) {
				if(request.method === "GET") {
					response.json().then(data => {
						this.list = data
					}).catch(error => {
						console.log(error)
					})
				} else {
					let request = {
						method:"GET",
						mode:"cors",
						headers:{"Content-type":"application/json"}
					}
					this.fetchbackend("/api/shopping",request);
				}
			} else {
				console.log("Server responded with status:"+response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	})
})

export default appState;