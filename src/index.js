"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = require("minimist");
var controllers_1 = require("./controllers");
//import "./pelis.json";
function parseaParams(argv) {
    var resultado = (0, minimist_1.default)(argv);
    return resultado;
}
function main() {
    var controlador = new controllers_1.PelisController();
    var params = parseaParams(process.argv.slice(2));
    console.log(params);
}
main();
