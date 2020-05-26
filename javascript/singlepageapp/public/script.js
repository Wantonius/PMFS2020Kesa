window.onload = function() {
	createForm();
	getShoppingList();
}

createForm = () => {
	const anchor = document.getElementById("anchor");
	let centeringDiv = document.createElement("div");
	let shoppingForm = document.createElement("form");
	centeringDiv.setAttribute("class","col-xs-1");
	centeringDiv.setAttribute("align","center");
	
	//item type input
	
	let typeinput = document.createElement("input");
	typeinput.setAttribute("type","text");
	typeinput.setAttribute("value","");
	typeinput.setAttribute("name","typeinput");
	typeinput.setAttribute("id","typeinput");
	let typeinputlabel = document.createElement("label");
	typeinputlabel.setAttribute("for","typeinput");
	let typeinputtext = document.createTextNode("Type:");
	typeinputlabel.appendChild(typeinputtext);
	
	//count input
	
	let countinput = document.createElement("input");
	countinput.setAttribute("type","number");
	countinput.setAttribute("value","");
	countinput.setAttribute("name","countinput");
	countinput.setAttribute("id","countinput");
	let countinputlabel = document.createElement("label");
	countinputlabel.setAttribute("for","countinput");
	let countinputtext = document.createTextNode("Count:");
	countinputlabel.appendChild(countinputtext);	
	
	//price input 
	
	let priceinput = document.createElement("input");
	priceinput.setAttribute("type","number");
	priceinput.setAttribute("value","");
	priceinput.setAttribute("name","priceinput");
	priceinput.setAttribute("id","priceinput");
	let priceinputlabel = document.createElement("label");
	priceinputlabel.setAttribute("for","priceinput");
	let priceinputtext = document.createTextNode("Price:");
	priceinputlabel.appendChild(priceinputtext);
	
	//submit button
	let submit = document.createElement("input");
	submit.setAttribute("type","submit");
	submit.setAttribute("value","Add");
	submit.setAttribute("class","btn btn-primary");
	
	let br = document.createElement("br");
	
	shoppingForm.appendChild(typeinputlabel);
	shoppingForm.appendChild(typeinput);
	shoppingForm.appendChild(br);
	
	shoppingForm.appendChild(countinputlabel);
	shoppingForm.appendChild(countinput);
	shoppingForm.appendChild(br.cloneNode());
	
	shoppingForm.appendChild(priceinputlabel);
	shoppingForm.appendChild(priceinput);
	shoppingForm.appendChild(br.cloneNode());
	
	shoppingForm.appendChild(submit);
	shoppingForm.addEventListener("submit",function(e) {
		e.preventDefault();
		addToList();
	})
	centeringDiv.appendChild(shoppingForm);
	anchor.appendChild(centeringDiv);
	let tableanchor = document.createElement("div");
	tableanchor.setAttribute("id","tableanchor");
	anchor.appendChild(tableanchor);
}

addToList = () => {
	let type = document.getElementById("typeinput").value;
	let count = document.getElementById("countinput").value;
	let price = document.getElementById("priceinput").value;
	
	let item = {
		type:type,
		count:count,
		price:price
	}
	
	let request = {
		method:"POST",
		mode:"cors",
		headers: {"Content-type":"application/json"},
		body:JSON.stringify(item)
	}
	fetch("/api/shopping",request).then(response => {
		if(response.ok) {
			getShoppingList();
			console.log("add to list success!");
		} else {
			console.log("Add to list failed. Reason:",response.status);
		}
	}).catch(error => {
		console.log(error);
	});
}

getShoppingList = () => {
	let request = {
		method:"GET",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	fetch("/api/shopping",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				populateTable(data)
			}).catch(error => {
				console.log(error)
			})
		}else {
			console.log("get list failed. Reason:",response.status)
		}
	}).catch(error => {
		console.log(error)
	})
}

removeFromList = (id) => {
	let request = {
		method:"DELETE",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	fetch("/api/shopping/"+id,request).then(response => {
		if(response.ok) {
			getShoppingList();
		} else {
			console.log("Remove from list failed. Reason:",response.status)
		}
	}).catch(error => {
		console.log(error)
	})	
}

populateTable = (data) => {
	let tableanchor = document.getElementById("tableanchor");
	let table = document.getElementById("table");
	if(table) {
		tableanchor.removeChild(table);
	}
	let newTable = document.createElement("table");
	newTable.setAttribute("id","table");
	newTable.setAttribute("class","table");
	
	//Header
	
	let header = document.createElement("thead");
	let headerRow = document.createElement("tr");
	
	let typeheader = document.createElement("th");
	let typeheadertext = document.createTextNode("Type");
	typeheader.appendChild(typeheadertext);

	let countheader = document.createElement("th");
	let countheadertext = document.createTextNode("Count");
	countheader.appendChild(countheadertext);

	let priceheader = document.createElement("th");
	let priceheadertext = document.createTextNode("Price");
	priceheader.appendChild(priceheadertext);

	let removeheader = document.createElement("th");
	let removeheadertext = document.createTextNode("Buy");
	removeheader.appendChild(removeheadertext);

	headerRow.appendChild(typeheader);
	headerRow.appendChild(countheader);
	headerRow.appendChild(priceheader);
	headerRow.appendChild(removeheader);
	
	header.appendChild(headerRow);
	newTable.appendChild(header);
	
	//body
	
	let body = document.createElement("tbody");
	for(let i=0;i<data.length;i++) {
		let tableRow = document.createElement("tr");
		for(x in data[i]) {
			if(x === "id") {
				continue;
			}
			let column = document.createElement("td");
			let info = document.createTextNode(data[i][x]);
			column.appendChild(info);
			tableRow.appendChild(column)
		}
		let removeColumn = document.createElement("td");
		let removeButton = document.createElement("button");
		let removeText = document.createTextNode("Remove");
		removeButton.appendChild(removeText);
		removeButton.setAttribute("name",data[i].id);
		removeButton.setAttribute("class","btn btn-danger");
		removeButton.addEventListener("click",function(e) {
			removeFromList(e.target.name)
		})
		removeColumn.appendChild(removeButton);
		tableRow.appendChild(removeColumn);
		body.appendChild(tableRow);
	}
	newTable.appendChild(body);
	tableanchor.appendChild(newTable);
}




