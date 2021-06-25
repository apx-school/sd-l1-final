import { PelisCollection, Peli } from "./models";

class PelisController {
    peliculas: PelisCollection;
    constructor() {
        this.peliculas = new PelisCollection();
    }
    get(option) {
        if (option.id) {
            return this.peliculas.getById(option.id);
        } else if (option.search) {
            return this.peliculas.search(option.search);
        } else if (option === true) {
            return this.peliculas.getAll();
        }
    }
    add(peli: Peli) {
        return this.peliculas.add(peli).then((res) => {
            return res;
        });
    }
}
export { PelisController };
