import { PelisCollection } from "./models";

class PelisController {

    constructor() {

        this.peliculas = new PelisCollection();
        this.promise = this.peliculas.loadData();
    }

    peliculas: PelisCollection;
    promise: Promise<any>;

    get(options: any) {

        if(options.id) {

            return this.peliculas.getById(options.id);

        } else if (options.search) {

            if(options.search.title && options.search.tag) {

                return this.peliculas.search(options.search);

            } else if(options.search.title) {

                return this.peliculas.search(options.search);

            } else if(options.search.tag) {

                return this.peliculas.search(options.search);
            }

        } else {

            return this.peliculas.getAll();
        }
    }

    add(data: any) {

        return this.peliculas.add(data);
    }
}

export { PelisController };
