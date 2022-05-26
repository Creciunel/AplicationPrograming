const ElevRepo = require('./ElevRepo') 
// testarea accesului la dependecies
test('Acces la baza de date', ()=>{
    expect(ElevRepo.conect()).toBeDefined();
});
// testarea de corectitudine a argumentelor
test("Verificarea datelor cu argumeti", () => {
	expect(ElevRepo.readOne(11)).toEqual(11);
});
// testarea de corectitudine a valorilor returnate