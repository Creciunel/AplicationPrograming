const elev = require("./elev.js");
const elevRepo = require("./ElevRepo");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname , "static")))

function Running() {
	//Global variabile
	let Index = 3; // doi deja sunt introdusi
	//init
	const router = express.Router();
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(express.urlencoded());

	//get
	router.get("/", function (req, res) {
		res.render('index');
		elevRepo.writeAll();
	});

	app.get("/list", (req, res) => {
		res.render("list", { list: elevRepo.getAllData() });
	});

	app.get("/list:id", (req, res) => {
		let idLoc = parseInt(req.params.id);
		console.log(idLoc);
		
		for(let e of elevRepo.getAllData()){
			if(e.id == idLoc){
				res.render("elev", { list: e });
			}
		}
	});

	//post
	app.post("/", (req, res) => {
		let Elev = new elev(
			req.body.name,
			req.body.lastaName,
			parseInt(req.body.nota),
			Index - 1
		);
		elevRepo.writeOne(Elev);
		elevRepo.add(Index, Elev);
		Index += 1;
		//console.log(elevRepo.getAllData());
		//console.log("Nume " + Elev.nume);
		res.render("list", { list: elevRepo.getAllData() });
	});

	app.use("/", router);
	app.listen(process.env.port || 3000);

	console.log("Running at Port 3000");
}

module.exports = Running;
