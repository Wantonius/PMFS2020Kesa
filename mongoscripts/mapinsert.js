var data = [];
var customers = ["Matti","Jaska","Tiina","Erno","Seija"];
for(let i=0;i<5000;i++) {
	var tempId = Math.floor(Math.random()*5);
	var tempPrice = Math.floor(Math.random()*100)+1;
	data[i] = {"custID":customers[tempId], "price":tempPrice}
}

var conn = new Mongo();
var db = conn.getDB("pmfskesamapreducedata");

db.data.insert(data);