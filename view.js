const elev = require("./elev.js");
const elevRepo = require("./ElevRepo");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

function Running() {
	//Global variabile
	let Index = 3; // doi deja sunt introdusi
	//init
	const router = express.Router();
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(express.urlencoded());

	//get
	router.get("/", function (req, res) {
		const form = `<form action="/" method="POST">
        <table>
            <thead>
                <caption>
                    <h3>Elev data base</h3>
                </caption>
            </thead>
            <tbody>
                <tr>
                    <th><label for="1">Nume</label></th>
                    <th><input type="text" name="name" /></th>
                </tr>
                <tr>
                    <th><label for="2">Prenume </label></th>
                    <th><input type="text" name="lastaName" /></th>
                </tr>
                <tr>
                    <th><label for="2">Nota</label></th>
                    <th><input type="text" name="nota" /></th>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th><input id="btn" type="submit" value="submit" /></th>
                </tr>
            </tfoot>
        </table>
    </form>
    <p id="descript">Pagina este craeata de <b>Creciunel Catain<b> in scopul satisfacerii lucrarilor de laborator la disciplina Programarea avansata.</p>
    <style>
    table {
        margin: 30% auto 5%;
    }</style>`;

		res.render("elevi", { form: form });
		//res.sendFile(path.join(__dirname + "/index.html"));
	});

	app.get("/list", (req, res) => {
		let eLement = "";
		for (let e of elevRepo.getAllData()) {
			eLement +=
				`<table><caption><h3>Input data</h3></caption>  <tbody><tr><th> Nume:</th> <th><a href="/list` +
				e["id"] +
				`">` +
				e["nume"] +
				`</th></tr>` +
				`<tr> <th>Prenume: </th> <th>` +
				e["prenume"] +
				`</th></tr><tr><th> Nota: </th><th>` +
				e["nota"] +
				`</th></tr> </tbody></table>`;
		}
		eLement += `<a href="/">Home</a>`;
        eLement += `<style> table {
            margin: 3% auto 5%;
        } </style> `;
		res.render("elevi", { form: eLement });
	});

	app.get("/list:id", (req, res) => {
		let idLoc = parseInt(req.params.id);
		let eLement = "";
		for (let e of elevRepo.getAllData()) {
			if (e["id"] === idLoc) {
				eLement +=
					`<table><caption><h3>Input data</h3></caption>  <tbody><tr><th> Nume:</th> <th><a href="/list` +
					e["id"] +
					`">` +
					e["nume"] +
					`</th></tr>` +
					`<tr> <th>Prenume: </th> <th>` +
					e["prenume"] +
					`</th></tr><tr><th> Nota: </th><th>` +
					e["nota"] +
					`</th></tr> </tbody></table>`;
			}
		}
		eLement += `<a href="/">Home</a> <style>
        table {
            margin: 30% auto 5%;
        }</style>`;
		res.render("elevi", { form: eLement });
	});

	//post
	app.post("/", (req, res) => {
		let Elev = new elev(
			req.body.name,
			req.body.lastaName,
			parseInt(req.body.nota),
			Index - 1
		);

		const resp =
			`<table><caption><h3>Input data</h3></caption>  <tbody><tr><th> Nume:</th> <th>` +
			req.body.name +
			`</th></tr>` +
			`<tr> <th>Prenume: </th> <th>` +
			req.body.lastaName +
			`</th></tr><tr><th> Nota: </th><th>` +
			req.body.nota +
			`</th></tr> </tbody></table> <a href="/">Home</a><br><a href="/list">List</a> <style>
            table {
                margin: 30% auto 5%;
            }</style>`;

		res.render("elevi", { form: resp });
		elevRepo.add(Index, Elev);
		Index += 1;
		console.log(elevRepo.getAllData());
		console.log("Nume " + Elev.nume);
	});

	app.use("/", router);
	app.listen(process.env.port || 3000);

	console.log("Running at Port 3000");
}

module.exports = Running;
