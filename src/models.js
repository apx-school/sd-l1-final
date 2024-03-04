"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peli = exports.PelisCollection = void 0;
var jsonfile = require("jsonfile");
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
require("./pelis.json");
// no modificar estas propiedades, agregar todas las que quieras
var Peli = /** @class */ (function () {
    function Peli() {
    }
    return Peli;
}());
exports.Peli = Peli;
var PelisCollection = /** @class */ (function () {
    function PelisCollection() {
        this.datoss = [];
    }
    PelisCollection.prototype.getAll = function () {
        return jsonfile.readFile("./pelis.json").then(function (data) {
            var pelis = data.map(function (item) { return ({
                id: item.id,
                title: item.title,
                tags: item.tags,
            }); });
            // Retorna el array de películas
            return pelis;
        });
    };
    PelisCollection.prototype.getById = function (id) {
        return this.getAll().then(function (data) {
            return data.find(function (item) {
                return item.id == id;
            });
        });
    };
    PelisCollection.prototype.add = function (peli) {
        var _this = this;
        var promesaUno = this.getById(peli.id).then(function (peliExistente) {
            if (peliExistente) {
                console.log("La pelicula ya existe");
                return false;
            }
            else {
                return _this.getAll().then(function (data) {
                    data.push(peli); // Agrega la nueva película al arreglo
                    return jsonfile.writeFile("./pelis.json", data).then(function () {
                        console.log("Película agregada con éxito.");
                        return true;
                    });
                });
            }
        });
        return promesaUno;
    };
    PelisCollection.prototype.search = function (options) {
        return this.getAll().then(function (data) {
            if (options.title) {
                // Filtrar por título
                var res = data.filter(function (peli) { return peli.title.includes(options.title); });
                return res;
            }
            else if (options.tag) {
                // Filtrar por etiqueta
                var res = data.filter(function (peli) { return peli.tags.includes(options.tag); });
                return res;
            }
            else {
                // Si no se proporciona ni título ni etiqueta, devolver todas las películas
                return data;
            }
        });
    };
    return PelisCollection;
}());
exports.PelisCollection = PelisCollection;
