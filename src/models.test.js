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
exports.getRandomId = void 0;
const ava_1 = __importDefault(require("ava"));
const models_1 = require("./models");
const getRandomId = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    return 129856 + randomNumber;
};
exports.getRandomId = getRandomId;
const SESSION_ID = (0, exports.getRandomId)();
const test = ava_1.default;
const TEST_ID = (0, exports.getRandomId)();
const TEST_TITLE = "title " + SESSION_ID + TEST_ID;
const SECOND_TEST_ID = (0, exports.getRandomId)();
const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;
// # IMPORTANTE #
// apenas te clones este repo
// todos los test a continuación van a fallar
// comentalos y descomentá uno a uno a medida
// que vas avanzando en cada test
test.serial("Corre ava", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.is("si", "si");
}));
test.serial("Testeo el método getById", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = new models_1.PelisCollection();
    yield collection.add({
        id: TEST_ID,
        title: TEST_TITLE,
        tags: ["tt", "rr"],
    });
    const all = yield collection.getAll();
    const a = all[0];
    const b = yield collection.getById(a.id);
    t.is(a.title, b.title);
}));
test.serial("Testeo el método search", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = new models_1.PelisCollection();
    yield collection.add({
        id: TEST_ID,
        title: TEST_TITLE,
        tags: ["tt", "rr"],
    });
    yield collection.add({
        id: SECOND_TEST_ID,
        title: SECOND_TEST_TITLE,
        tags: ["yy", "uu"],
    });
    const all = yield collection.getAll();
    const a = all[0];
    // El search debe encontrar ambas pelis creadas a partir de la session
    const b = yield collection.search({ title: SESSION_ID.toString() });
    const ids = b.map((b) => b.id);
    t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
    // El search debe encontrar solo la peli con el title (session) y el tag (yy)
    const c = yield collection.search({
        title: SECOND_TEST_ID.toString(),
        tag: "yy",
    });
    t.deepEqual(c[0].id, SECOND_TEST_ID);
}));
