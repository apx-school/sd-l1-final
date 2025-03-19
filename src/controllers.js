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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PelisController = void 0;
const models_1 = require("./models");
class PelisController {
    constructor() {
        this.model = new models_1.PelisCollection();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.getAll();
        });
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options === null || options === void 0 ? void 0 : options.id) {
                const peli = yield this.model.getById(options.id);
                return peli ? [peli] : [];
            }
            if (options === null || options === void 0 ? void 0 : options.search) {
                const peli = yield this.model.search(options.search);
            }
            return yield this.model.getAll();
        });
    }
    getOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pelis = yield this.get(options);
            return pelis[0];
        });
    }
    add(peli) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.add(peli);
        });
    }
}
exports.PelisController = PelisController;
