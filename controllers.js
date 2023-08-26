import { PelisCollection } from './models';
class PelisController {
    pelisCollections;
    constructor() {
        this.pelisCollections = new PelisCollection();
    }
    async get(options) {
        if (options.id) {
            return await this.pelisCollections.getById(options.id);
        }
        if (options.search)
            return await this.pelisCollections.search({ ...options.search });
    }
    async add(peli) {
        return await this.pelisCollections.add(peli);
    }
}
export { PelisController };
