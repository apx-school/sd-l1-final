import { PelisCollection, Peli } from "./models";

class PelisController {

    constructor() {

        this.peliculas = new PelisCollection();
    }

    peliculas: PelisCollection;

    async get(options: any) {

        if(options.id) {

            return await this.peliculas.getById(options.id);

        } else if (options.search) {

            if(options.search.title && options.search.tag) {

                return await this.peliculas.search(options.search);

            } else if(options.search.title) {

                return await this.peliculas.search(options.search);

            } else if(options.search.tag) {

                console.log("ENTRO A CONTROLLER OPTIONSS.SEARCH.TAG", options.search.tag);

                return await this.peliculas.search(options.search);
            }

        } else {

            return await this.peliculas.getAll();
        }
    }

    async add(pelicula: any) {

        return await this.peliculas.add(pelicula);
    }
}

export { PelisController };
