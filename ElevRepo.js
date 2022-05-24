const elev = require("./elev.js");

const elevi = [
	new elev("Halipov", "Ivan", 6, 0),
	new elev("Panu", "Artiom", 6, 1),
];

Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);
};

function getAllData() {
	return elevi;
}

function add(Position, newElev) {
	elevi.insert(Position - 1, newElev);
}

function clear() {
	while (elevi.length > 0) {
		elevi.pop();
	}
}

//Data Base

const mysql = require("mysql");

var connection = mysql.createConnection({
	host: "45.86.86.252",
	user: "catalin_usr",
	password: "GkggBKOtGdbbuvO5",
	database: "catalin",
});

connection.connect(function (err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}

	console.log("connected as id " + connection.threadId);
});

//scrierea unui element
function readOne(elev) {
	let query =
		"INSERT INTO `elev`(`nume`, `prenume`, `nota`) VALUES ('" +
		elev.nume +
		"','" +
		elev.prenume +
		"','" +
		elev.nota +
		"')";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log("The solution is: ", results);
		return results;
	});
}

//citirea unui element
function writeAll(id) {
	let query = "SELECT * FROM `elev` WHERE id = " + id + ";";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log("The solution is: ", results);
		return results;
	});
}

//citirea mai multor elemente
function writeAll() {
	let query = "SELECT * FROM elev";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log("The solution is: ", results);
		return results;
	});
}
// reinnoirea unui element
function update(id, elev) {
	let query =
		"UPDATE `elev` SET nume='" + elev.nume + "', WHERE id='" + id + "';";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log("The solution is: ", results);
		return results;
	});
}

//stergera unui element
function deleteOne(id) {
	let query = "DELETE FROM `elev` WHERE id =" + id;

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log("The solution is: ", results);
		return results;
	});
}

//stergerea de toate elemente
function deleteAll(id) {
	let query = "DELETE FROM `elev` WHERE id >=0";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log("The solution is: ", results);
		return results;
	});
}

//exit dataBase
function exit() {
	connection.end();
}

module.exports = {
	getAllData: getAllData,
	add: add,
	clear: clear,
	readOne: readOne,
	writeAll: writeAll,
	update: update,
    deleteOne: deleteOne,
    deleteAll: deleteAll,
};
