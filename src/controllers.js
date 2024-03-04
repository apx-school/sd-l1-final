"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PelisController = void 0;
var models_1 = require("./models");
require("./pelis.json");
var PelisController = /** @class */ (function () {
    function PelisController() {
        this.mod = new models_1.PelisCollection();
    }
    PelisController.prototype.get = function (options) {
        if ((options === null || options === void 0 ? void 0 : options.id) !== undefined) {
            return this.mod.getById(options === null || options === void 0 ? void 0 : options.id);
        }
        else if ((options === null || options === void 0 ? void 0 : options.search) !== undefined) {
            return this.mod.search(options === null || options === void 0 ? void 0 : options.search);
        }
        else if (Object.keys(options).length === 0) {
            return this.mod.search({});
        }
    };
    PelisController.prototype.add = function (peli) {
        this.mod.add(peli);
    };
    return PelisController;
}());
exports.PelisController = PelisController;
/*
// Crear una instancia de PelisCollection (puedes utilizar tus propios datos o mocks)
//const pelisCollection = new PelisCollection();
const pelisCollection = new PelisCollection();
// Crear una instancia de PelisController pasando la instancia de PelisCollection como argumento

// Llamar al método get con diferentes opciones y manejar la promesa resultante
// Aquí hay algunos ejemplos:
const pelisController = new PelisController();
// Obtener una película por ID
pelisController
  .get({ id: 3, search: { title: "", tag: "" } })
  .then((result) => {
    console.log("Película encontrada por ID:", result);
  })
  .catch((error) => {
    console.error("Error al buscar película por ID:", error);
  });

// Buscar películas por título
pelisController
  .get({ search: { title: "Volver" } })
  .then((result) => {
    console.log("Películas encontradas por título:", result);
  })
  .catch((error) => {
    console.error("Error al buscar películas por título:", error);
  });

// Buscar películas por tag
pelisController
  .get({ search: { tag: "terror" } })
  .then((result) => {
    console.log("Películas encontradas por tag:", result);
  })
  .catch((error) => {
    console.error("Error al buscar películas por tag:", error);
  });

// Buscar películas por título y tag
pelisController
  .get({ search: { title: "v", tag: "accion" } })
  .then((result) => {
    console.log("Películas encontradas por título y tag:", result);
  })
  .catch((error) => {
    console.error("Error al buscar películas por título y tag:", error);
  });

// Obtener todas las películas

pelisController
  .get({})
  .then((result) => {
    console.log("Todas las películas:", result);
  })
  .catch((error) => {
    console.error("Error al obtener todas las películas:", error);
  });*/
