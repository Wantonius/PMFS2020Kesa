var mapFunction = function() {
	emit(this.custID, this.price)
}

var reduceFunction = function(keyCustId,valuesPrice) {
	return Array.sum(valuesPrice)
}

var conn = new Mongo();
var db = conn.getDB("pmfskesamapreducedata");

db.data.mapReduce(mapFunction, reduceFunction, {out:"results"})