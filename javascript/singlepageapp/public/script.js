window.onload = function() {
	createForm();
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
			console.log("add to list success!");
		} else {
			console.log("Add to list failed. Reason:",response.status);
		}
	}).catch(error => {
		console.log(error);
	});
}


