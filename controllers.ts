import { PelisCollection, Peli } from "./models";

class PelisController {
    listaDePelis: PelisCollection;
    constructor() {
        this.listaDePelis = new PelisCollection();
    }
    async get(options) {
        if (options.id) {
            return await this.listaDePelis.getById(options.id);
        } else if (options.search) {
            return await this.listaDePelis.search(options.search);
        } else {
            return await this.listaDePelis.getAll();
        }
    }
    add(films: Peli) {
        return this.listaDePelis.add(films);
    }
}
export { PelisController };
