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
let global = 0;

var connection = mysql.createConnection({
	host: "45.86.86.252",
	user: "catalin_usr",
	password: "GkggBKOtGdbbuvO5",
	database: "catalin",
});

// connection.connect(function (err) {
// 	if (err) {
// 		console.error("error connecting: " + err.stack);
// 		return;
// 	}

// 	console.log("connected as id " + connection.threadId);
// 	return connection.threadId;
// });

async function conect() {
	connection.connect(function (err) {
		if (err) {
			return err;
		}
		return connection.threadId;
	});
}

//scrierea unui element
function writeOne(elev) {
	let query =
		"INSERT INTO elev(`nume`, `prenume`, `nota`) VALUES ('" +
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
async function readOne(id) {
	let query = {
		sql: "SELECT * FROM `elev` WHERE id = " + id + ";",
		nestTables: "_",
	}; ;

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		// console.log("The solution is: ", results);
		var string = JSON.stringify(results);
		var json = JSON.parse(string);
		//console.log(json[0].elev_id);
		return json[0].elev_id;
	});
}

//citirea mai multor elemente
async function readAll() {
	let query = { sql: "SELECT * FROM elev", nestTables: "_" };

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		// console.log('>> results.len: ', results.length );
		var string = JSON.stringify(results);
		var json = JSON.parse(string);

		let nume;
		let prenume;
		let nota;
		let id;

		if (global === 0) {
			for (let i of json) {
				nume = i.elev_nume;
				prenume = i.elev_prenume;
				nota = parseInt(i.elev_nota);
				id = parseInt(i.elev_id);
				let student = new elev(nume, prenume, nota, id);

				elevi.push(student);
			}
			global = 1;
		}

		// console.log(json);
		// console.log("Data Base", elevi);
		return elevi;
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
	conect: conect,
	readOne: readOne,
	readAll: readAll,
	writeOne: writeOne,
	update: update,
	deleteOne: deleteOne,
	deleteAll: deleteAll,
	exit: exit,
};
