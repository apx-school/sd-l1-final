import { PelisCollection, Peli } from "./models";

class PelisController {
    movies: PelisCollection;
    constructor() {
        this.movies = new PelisCollection();
    }

    async get(options: any): Promise<any> {
        if (options.id) {
            return await this.movies.getById(options.id);
        } else if (options.search) {
            return await this.movies.search(options.search);
        } else {
            return await this.movies.getAll();
        }
    }
    async add(peli: Peli) {
        return this.movies.add(peli);
    }
}
export { PelisController };
