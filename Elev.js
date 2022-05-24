function elev(nume, prenume, nota, id) {
	this.nume = nume;
	this.prenume = prenume;
	this.nota = nota;
	this.id = id;
}

elev.prototype.notaStandart = function () {
	return 10;
};

////////////////////////////////////////////////////////////////////
module.exports = elev;
