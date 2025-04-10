"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peli = exports.PelisCollection = void 0;
var jsonfile = require("jsonfile");
// El siguiente import no se usa pero es necesario
require("./pelis.json");
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
// no modificar estas propiedades, agregar todas las que quieras
var Peli = /** @class */ (function () {
    function Peli(id, title, tags) {
        this.id = id;
        this.title = title;
        this.tags = tags;
    }
    return Peli;
}());
exports.Peli = Peli;
var PelisCollection = /** @class */ (function () {
    function PelisCollection() {
    }
    PelisCollection.prototype.getAll = function () {
        return jsonfile.readFile("./src/pelis.json").then(function () {
            // la respuesta de la promesa
            return [];
        });
    };
    PelisCollection.prototype.add = function (peli) {
        return __awaiter(this, void 0, void 0, function () {
            var peliculas, existe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        peliculas = _a.sent();
                        existe = peliculas.some(function (p) { return p.id === peli.id; });
                        if (existe)
                            return [2 /*return*/, false];
                        peliculas.push(peli);
                        return [4 /*yield*/, jsonfile.writeFile("./src/pelis.json", peliculas)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    // Este fragmento de código define una función para agregar una película.
    // Primero verifica si la película ya existe en el sistema. 
    // Si no existe, crea un objeto con los datos de la película y lo guarda en un archivo JSON. 
    // Finalmente, devuelve una promesa que indica si la operación fue exitosa.
    PelisCollection.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var peliculas, encontradas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        peliculas = _a.sent();
                        console.log('Todas las películas:', peliculas); // Debug
                        encontradas = peliculas.find(function (peliculas) { return peliculas.id === id; });
                        console.log('Encontrada:', encontradas); // Debug
                        if (!encontradas) {
                            throw new Error("Peliculsa  con ID ".concat(id, " no encontrada"));
                        }
                        return [2 /*return*/, encontradas];
                }
            });
        });
    };
    PelisCollection.prototype.search = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var lista, listaFiltrada;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        lista = _a.sent();
                        listaFiltrada = lista.filter(function (p) {
                            var esteVa = false;
                            if (options.tags) {
                            }
                            if (options.title) {
                            }
                            return esteVa;
                        });
                        return [2 /*return*/, listaFiltrada];
                }
            });
        });
    };
    return PelisCollection;
}());
exports.PelisCollection = PelisCollection;
