const elev = require("./elev.js");

function elevPresenter(module) {
    this.module = module;
}

elevPresenter.prototype.getAllData = function() {
    return this.module.getAllData();
}

elevPresenter.prototype.add = function(args) {
    const Elev = new elev(args[1], args[2], args[3]);
    return this.module.add(args[0], Elev);
}

elevPresenter.prototype.clear = function() {
    return this.module.clear();
}

module.exports = elevPresenter;
