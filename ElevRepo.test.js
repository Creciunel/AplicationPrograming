const ElevRepo = require("./ElevRepo");
// testarea accesului la dependecies
test("Acces la baza de date", () => {
	expect(ElevRepo.conect()).toBeTruthy();
});
// testarea de corectitudine a argumentelor
test("Verificarea datelor cu argumeti", () => {
	expect(ElevRepo.readOne(12)).toBeDefined();
});
// testarea de corectitudine a valorilor returnate
test("Verificarea valorilor", () => {
	expect(ElevRepo.readAll(12)).toBeDefined();
});
