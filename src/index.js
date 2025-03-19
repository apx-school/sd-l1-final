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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const controllers_1 = require("./controllers");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = (0, minimist_1.default)(process.argv.slice(2));
        const controller = new controllers_1.PelisController();
        if (args._[0] === "add") {
            const peli = {
                id: Number(args.id),
                title: args.title,
                tags: Array.isArray(args.tags) ? args.tags : [args.tags],
            };
            controller.add(peli).then(succes => {
                console.log(succes ? "¡Peli agregada exitosamente!" : "No se pudo agregar la peli.");
            });
            return;
        }
        else if (args._[0] === "get") {
            const id = Number(args._[1]);
            if (isNaN(id)) {
                console.error("Error: Debes proporcionar un ID válido.");
                return;
            }
            console.log((yield controller.get({ id })) || "Película no encontrada.");
        }
        else if (args._[0] === "search") {
            console.log(JSON.stringify(yield controller.get({ search: { title: args.title, tag: args.tag } }), null, 2));
        }
        else {
            console.log(JSON.stringify(yield controller.get(), null, 2));
        }
    });
}
main();
