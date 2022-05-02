const elev = require("./elev.js");

const elevi = [new elev("Halipov", "Ivan", 6, 0), new elev("Panu", "Artiom", 6, 1)];

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};

function getAllData() {
    return elevi;
};

function add(Position, newElev) {
    elevi.insert(Position - 1, newElev);
};

function clear() {
    while (elevi.length > 0) {
        elevi.pop();
    }
};

module.exports = {
    getAllData: getAllData,
    add: add,
    clear: clear
}
