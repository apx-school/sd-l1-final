"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PelisCollection = void 0;
const jsonfile = __importStar(require("jsonfile"));
class PelisCollection {
    // Obtener todas las películas
    getAll() {
        return jsonfile.readFile("./src/pelis.json").then((data) => {
            return data;
        });
    }
    // Obtener una película por ID
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pelis = yield this.getAll();
                return pelis.find((peli) => peli.id === id) || null;
            }
            catch (error) {
                console.error("Error al obtener la película por ID:", error);
                return null;
            }
        });
    }
    // Agregar una nueva película
    add(peli) {
        return this.getById(peli.id).then((peliExistente) => {
            if (peliExistente) {
                console.log("Error: Ya existe una película con el ID", peli.id);
                return false;
            }
            else {
                return this.getAll().then((pelis) => {
                    const data = [...pelis, peli];
                    return jsonfile.writeFile("./src/pelis.json", data).
                        then(() => true)
                        .catch(() => false);
                });
            }
        }).catch(() => false);
    }
    search(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield this.getAll();
            const listaFiltrada = lista.filter((p) => {
                let esteVa = false;
                if (options.tag && p.tags.includes(options.tag)) {
                    esteVa = true;
                }
                if (options.title && p.title.includes(options.title)) {
                    esteVa = true;
                }
                if (options.tag && options.title) {
                    esteVa = p.tags.includes(options.tag) && p.title.includes(options.title);
                }
                return esteVa;
            });
            return listaFiltrada;
        });
    }
}
exports.PelisCollection = PelisCollection;
